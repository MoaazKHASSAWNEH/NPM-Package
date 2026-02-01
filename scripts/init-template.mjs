/**
 * NPM Package Template - Initialization Script
 *
 * This script initializes the template for a new npm package by:
 * 1. Prompting the user for package details (name, description, author, etc.)
 * 2. Validating inputs (npm package name format, GitHub URL format)
 * 3. Replacing placeholder values across all relevant files
 * 4. Providing clear feedback and next steps
 *
 * Run with: pnpm run init:template
 *
 * @requires Node.js >= 20
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";

// ==============================================================================
// CONSTANTS
// ==============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

/** Marker file created after successful initialization to prevent re-runs */
const INIT_MARKER = ".template-initialized";

/** Default placeholder values used in the template */
const PLACEHOLDERS = {
  PACKAGE_NAME: "pkg_name",
  DESCRIPTION: "pkg_name - description",
  AUTHOR: "pkg_name_author",
  GITHUB_OWNER: "MoaazKHASSAWNEH",
  GITHUB_REPO: "NPM-Package",
};

/** Directories to skip during file traversal */
const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
  "docs/.vitepress/cache",
  "docs/.vitepress/dist",
  "coverage",
]);

/** File extensions considered as text files for replacement */
const TEXT_EXTENSIONS = new Set([
  ".md",
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".jsonc",
  ".yml",
  ".yaml",
  ".txt",
  ".gitignore",
  ".eslintignore",
  ".prettierignore",
  ".editorconfig",
]);

// ==============================================================================
// VALIDATION HELPERS
// ==============================================================================

/**
 * Validates an npm package name according to npm naming rules.
 * @see https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name
 *
 * Rules:
 * - Must be lowercase
 * - Can contain letters, numbers, hyphens, underscores, dots
 * - Cannot start with a dot or underscore
 * - Cannot contain spaces or special characters
 * - Scoped packages: @scope/name format allowed
 *
 * @param {string} name - The package name to validate
 * @returns {{ valid: boolean, error?: string }}
 */
function validatePackageName(name) {
  if (!name || typeof name !== "string") {
    return { valid: false, error: "Package name is required" };
  }

  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Package name cannot be empty" };
  }

  if (trimmed.length > 214) {
    return { valid: false, error: "Package name cannot exceed 214 characters" };
  }

  // Check for scoped package format
  const scopedMatch = trimmed.match(/^@([^/]+)\/(.+)$/);
  if (scopedMatch) {
    const [, scope, packageName] = scopedMatch;
    const scopeResult = validateNamePart(scope, "Scope");
    if (!scopeResult.valid) return scopeResult;
    const nameResult = validateNamePart(packageName, "Package name");
    if (!nameResult.valid) return nameResult;
    return { valid: true };
  }

  return validateNamePart(trimmed, "Package name");
}

/**
 * Validates a single part of a package name (either scope or name).
 * @param {string} part - The name part to validate
 * @param {string} label - Label for error messages
 * @returns {{ valid: boolean, error?: string }}
 */
function validateNamePart(part, label) {
  if (part !== part.toLowerCase()) {
    return { valid: false, error: `${label} must be lowercase` };
  }

  if (part.startsWith(".") || part.startsWith("_")) {
    return { valid: false, error: `${label} cannot start with a dot or underscore` };
  }

  // Only allow: lowercase letters, numbers, hyphens, underscores, dots
  const validPattern = /^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$|^[a-z0-9]$/;
  if (!validPattern.test(part)) {
    return {
      valid: false,
      error: `${label} can only contain lowercase letters, numbers, hyphens, underscores, and dots`,
    };
  }

  return { valid: true };
}

/**
 * Validates a GitHub repository URL.
 * Accepts formats:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - git+https://github.com/owner/repo.git
 * - github:owner/repo
 * - owner/repo (shorthand)
 *
 * @param {string} input - The URL or shorthand to validate
 * @returns {{ valid: boolean, owner?: string, repo?: string, error?: string }}
 */
function parseGitHubRepo(input) {
  if (!input || typeof input !== "string") {
    return { valid: false, error: "GitHub repository is required" };
  }

  const trimmed = input.trim();

  // Pattern 1: Full URL (https://github.com/owner/repo or git+https://...)
  const urlMatch = trimmed.match(
    /^(?:git\+)?https?:\/\/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git)?$/
  );
  if (urlMatch) {
    return { valid: true, owner: urlMatch[1], repo: urlMatch[2] };
  }

  // Pattern 2: github:owner/repo
  const githubMatch = trimmed.match(/^github:([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
  if (githubMatch) {
    return { valid: true, owner: githubMatch[1], repo: githubMatch[2] };
  }

  // Pattern 3: owner/repo shorthand
  const shortMatch = trimmed.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
  if (shortMatch) {
    return { valid: true, owner: shortMatch[1], repo: shortMatch[2] };
  }

  return {
    valid: false,
    error: "Invalid GitHub repository format. Use: owner/repo or https://github.com/owner/repo",
  };
}

// ==============================================================================
// FILE SYSTEM HELPERS
// ==============================================================================

/**
 * Checks if a path should be skipped during file traversal.
 * @param {string} fullPath - Absolute path to check
 * @returns {boolean}
 */
function shouldSkip(fullPath) {
  const rel = path.relative(ROOT, fullPath).replaceAll("\\", "/");
  for (const d of SKIP_DIRS) {
    if (rel === d || rel.startsWith(d + "/")) return true;
  }
  return false;
}

/**
 * Recursively walks a directory and returns all file paths.
 * @param {string} dir - Directory to walk
 * @returns {string[]} - Array of absolute file paths
 */
function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out; // Skip directories we can't read
  }

  for (const item of entries) {
    const full = path.join(dir, item.name);
    if (shouldSkip(full)) continue;
    if (item.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

/**
 * Determines if a file is a text file based on extension.
 * @param {string} file - File path
 * @returns {boolean}
 */
function isTextFile(file) {
  const ext = path.extname(file).toLowerCase();
  const basename = path.basename(file);

  // Check known text extensions
  if (TEXT_EXTENSIONS.has(ext)) return true;

  // Check dotfiles without extension (e.g., .gitignore, .prettierrc)
  if (basename.startsWith(".") && !ext) return true;

  // LICENSE file has no extension
  if (basename === "LICENSE") return true;

  return false;
}

/**
 * Performs string replacements in a file.
 * @param {string} file - File path
 * @param {Record<string, string>} replacements - Map of old -> new strings
 * @returns {boolean} - True if file was modified
 */
function replaceInFile(file, replacements) {
  if (!isTextFile(file)) return false;

  let raw;
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch {
    return false; // Skip files we can't read
  }

  let next = raw;
  for (const [from, to] of Object.entries(replacements)) {
    // Skip empty replacements
    if (!from) continue;
    next = next.split(from).join(to);
  }

  if (next !== raw) {
    fs.writeFileSync(file, next, "utf8");
    return true;
  }
  return false;
}

// ==============================================================================
// USER INTERACTION
// ==============================================================================

/**
 * Creates a readline interface for terminal input.
 * @returns {readline.Interface}
 */
function createReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Prompts the user for input with an optional default value.
 * @param {readline.Interface} rl - Readline interface
 * @param {string} question - Question to display
 * @param {string} [defaultValue] - Default value if user presses Enter
 * @returns {Promise<string>}
 */
async function ask(rl, question, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  return answer || defaultValue || "";
}

/**
 * Prompts for a value with validation, retrying on failure.
 * @param {readline.Interface} rl - Readline interface
 * @param {string} question - Question to display
 * @param {string} defaultValue - Default value
 * @param {(value: string) => { valid: boolean, error?: string }} validator - Validation function
 * @param {number} [maxAttempts=3] - Maximum retry attempts
 * @returns {Promise<string>}
 */
async function askWithValidation(rl, question, defaultValue, validator, maxAttempts = 3) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const answer = await ask(rl, question, defaultValue);
    const result = validator(answer);

    if (result.valid) {
      return answer;
    }

    attempts++;
    console.error(`  ❌ ${result.error}`);

    if (attempts < maxAttempts) {
      console.log(`  Please try again (${maxAttempts - attempts} attempts remaining)`);
    }
  }

  throw new Error(`Validation failed after ${maxAttempts} attempts`);
}

// ==============================================================================
// LOGGING
// ==============================================================================

/**
 * Prints a styled header message.
 * @param {string} message
 */
function logHeader(message) {
  console.log("\n" + "=".repeat(60));
  console.log(`  ${message}`);
  console.log("=".repeat(60) + "\n");
}

/**
 * Prints a step message.
 * @param {string} message
 */
function logStep(message) {
  console.log(`→ ${message}`);
}

/**
 * Prints a success message.
 * @param {string} message
 */
function logSuccess(message) {
  console.log(`✅ ${message}`);
}

/**
 * Prints a warning message.
 * @param {string} message
 */
function logWarning(message) {
  console.log(`⚠️  ${message}`);
}

/**
 * Prints an error message.
 * @param {string} message
 */
function logError(message) {
  console.error(`❌ ${message}`);
}

// ==============================================================================
// MAIN INITIALIZATION LOGIC
// ==============================================================================

/**
 * Checks if the template has already been initialized.
 * @returns {boolean}
 */
function isAlreadyInitialized() {
  const markerPath = path.join(ROOT, INIT_MARKER);
  return fs.existsSync(markerPath);
}

/**
 * Creates the initialization marker file.
 */
function createInitMarker() {
  const markerPath = path.join(ROOT, INIT_MARKER);
  const content = `# Template initialized on ${new Date().toISOString()}\n# Do not delete this file manually.\n`;
  fs.writeFileSync(markerPath, content, "utf8");
}

/**
 * Checks if package.json still has default placeholder values.
 * @returns {boolean}
 */
function hasDefaultPlaceholders() {
  const pkgPath = path.join(ROOT, "package.json");
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    return pkg.name === PLACEHOLDERS.PACKAGE_NAME || pkg.author === PLACEHOLDERS.AUTHOR;
  } catch {
    return false;
  }
}

/**
 * Main initialization function.
 */
async function main() {
  logHeader("NPM Package Template Initialization");

  // ============================================================================
  // IDEMPOTENCY CHECK
  // ============================================================================

  if (isAlreadyInitialized()) {
    logWarning("This template has already been initialized.");
    console.log(`\nIf you need to re-initialize, delete the '${INIT_MARKER}' file first.`);
    console.log("Note: Re-running may cause issues if placeholders have been replaced.\n");
    process.exit(0);
  }

  // Additional check: warn if placeholders are already modified
  if (!hasDefaultPlaceholders()) {
    logWarning("It appears the template placeholders have already been modified.");
    console.log("Some files may not be updated correctly.\n");
  }

  const rl = createReadline();

  try {
    // ==========================================================================
    // GATHER USER INPUT
    // ==========================================================================

    logStep("Please provide the following information:\n");

    // Package name (with validation)
    const packageName = await askWithValidation(rl, "Package name", "", validatePackageName);

    // Description
    const description = await ask(rl, "Description", `${packageName} - A TypeScript package`);

    // Author
    const author = await ask(rl, "Author name", "");
    if (!author) {
      logWarning("No author provided. You can update this later in package.json.");
    }

    // GitHub repository (with validation)
    let githubOwner = "";
    let githubRepo = "";
    const githubInput = await ask(rl, "GitHub repository (owner/repo)", "");

    if (githubInput) {
      const parsed = parseGitHubRepo(githubInput);
      if (parsed.valid) {
        githubOwner = parsed.owner;
        githubRepo = parsed.repo;
      } else {
        logWarning(parsed.error);
        logWarning("GitHub URLs in package.json will need manual updating.");
      }
    } else {
      logWarning("No GitHub repository provided. URLs will need manual updating.");
    }

    // Keywords
    const keywordsInput = await ask(rl, "Keywords (comma-separated)", packageName);
    const keywords = keywordsInput
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    // ==========================================================================
    // CONFIRM BEFORE PROCEEDING
    // ==========================================================================

    console.log("\n" + "-".repeat(40));
    console.log("Summary of changes:");
    console.log("-".repeat(40));
    console.log(`  Package name:  ${packageName}`);
    console.log(`  Description:   ${description}`);
    console.log(`  Author:        ${author || "(not set)"}`);
    console.log(
      `  GitHub:        ${githubOwner && githubRepo ? `${githubOwner}/${githubRepo}` : "(not set)"}`
    );
    console.log(`  Keywords:      ${keywords.join(", ") || "(none)"}`);
    console.log("-".repeat(40) + "\n");

    const confirm = await ask(rl, "Proceed with initialization? (yes/no)", "yes");
    if (!["yes", "y"].includes(confirm.toLowerCase())) {
      console.log("\nInitialization cancelled.\n");
      rl.close();
      process.exit(0);
    }

    rl.close();

    // ==========================================================================
    // PERFORM REPLACEMENTS
    // ==========================================================================

    console.log("\n");
    logStep("Updating files...");

    // Build replacement map
    // Order matters: longer/more specific strings should be replaced first
    const replacements = {};

    // Replace description first (contains "pkg_name")
    replacements[PLACEHOLDERS.DESCRIPTION] = description;

    // Replace full GitHub URL pattern
    const oldGitHubUrl = `https://github.com/${PLACEHOLDERS.GITHUB_OWNER}/${PLACEHOLDERS.GITHUB_REPO}`;
    if (githubOwner && githubRepo) {
      const newGitHubUrl = `https://github.com/${githubOwner}/${githubRepo}`;
      replacements[oldGitHubUrl] = newGitHubUrl;
      replacements[`${PLACEHOLDERS.GITHUB_OWNER}/${PLACEHOLDERS.GITHUB_REPO}`] =
        `${githubOwner}/${githubRepo}`;
    }

    // Replace author
    if (author) {
      replacements[PLACEHOLDERS.AUTHOR] = author;
    }

    // Replace package name last (shortest, most likely to have false positives)
    replacements[PLACEHOLDERS.PACKAGE_NAME] = packageName;

    // Walk and update all files
    const files = walk(ROOT);
    const updatedFiles = [];

    for (const file of files) {
      // Skip this init script itself to preserve placeholders for reference
      if (file === __filename) continue;

      if (replaceInFile(file, replacements)) {
        const relPath = path.relative(ROOT, file);
        updatedFiles.push(relPath);
      }
    }

    // ==========================================================================
    // UPDATE PACKAGE.JSON DIRECTLY
    // ==========================================================================

    logStep("Updating package.json...");

    const pkgPath = path.join(ROOT, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

    // Update fields
    pkg.name = packageName;
    pkg.description = description;

    if (author) {
      pkg.author = author;
    }

    if (githubOwner && githubRepo) {
      pkg.repository = {
        type: "git",
        url: `git+https://github.com/${githubOwner}/${githubRepo}.git`,
      };
      pkg.bugs = {
        url: `https://github.com/${githubOwner}/${githubRepo}/issues`,
      };
      pkg.homepage = `https://github.com/${githubOwner}/${githubRepo}#readme`;
    }

    pkg.keywords = keywords;

    // Write back with proper formatting
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

    // ==========================================================================
    // CREATE INIT MARKER
    // ==========================================================================

    createInitMarker();

    // ==========================================================================
    // SUMMARY
    // ==========================================================================

    console.log("\n");
    logSuccess("Template initialization complete!");
    console.log(`\nUpdated ${updatedFiles.length} file(s):`);
    for (const f of updatedFiles.slice(0, 10)) {
      console.log(`  - ${f}`);
    }
    if (updatedFiles.length > 10) {
      console.log(`  ... and ${updatedFiles.length - 10} more`);
    }

    // ==========================================================================
    // NEXT STEPS
    // ==========================================================================

    console.log("\n" + "=".repeat(60));
    console.log("  NEXT STEPS");
    console.log("=".repeat(60));
    console.log(`
1. Review the changes:
   git diff

2. Install dependencies (if not already done):
   pnpm install

3. Run tests to verify everything works:
   pnpm test

4. Build the package:
   pnpm run build

5. Start the documentation server:
   pnpm run docs:dev

6. Initialize Changesets (for versioning):
   pnpm changeset init

7. Commit your changes:
   git add -A
   git commit -m "chore: initialize package from template"

For more information, see the README.md file.
`);

    // Warn about manual tasks
    if (!githubOwner || !githubRepo) {
      logWarning("Remember to update GitHub repository URLs in package.json manually.\n");
    }

    if (!author) {
      logWarning("Remember to set the author field in package.json.\n");
    }
  } catch (error) {
    rl.close();
    logError(`Initialization failed: ${error.message}`);
    process.exit(1);
  }
}

// ==============================================================================
// ENTRY POINT
// ==============================================================================

main().catch((error) => {
  logError(`Unexpected error: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
