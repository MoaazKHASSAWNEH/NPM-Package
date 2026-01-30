import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
  "docs/.vitepress/cache",
  "docs/.vitepress/dist",
]);

function shouldSkip(fullPath) {
  const rel = path.relative(ROOT, fullPath).replaceAll("\\", "/");
  for (const d of SKIP_DIRS) {
    if (rel === d || rel.startsWith(d + "/")) return true;
  }
  return false;
}

function walk(dir) {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (shouldSkip(full)) continue;
    if (item.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function isTextFile(file) {
  const ext = path.extname(file).toLowerCase();
  return (
    [
      ".md",
      ".ts",
      ".tsx",
      ".js",
      ".mjs",
      ".cjs",
      ".json",
      ".yml",
      ".yaml",
      ".txt",
      ".gitignore",
      ".eslintignore",
      ".prettierignore",
      ".editorconfig",
    ].includes(ext) || path.basename(file).startsWith(".")
  );
}

function replaceInFile(file, replacements) {
  if (!isTextFile(file)) return false;
  const raw = fs.readFileSync(file, "utf8");
  let next = raw;
  for (const [from, to] of Object.entries(replacements)) {
    next = next.split(from).join(to);
  }
  if (next !== raw) {
    fs.writeFileSync(file, next, "utf8");
    return true;
  }
  return false;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function normalizePkgName(name) {
  return name.trim();
}

async function ask(q, def) {
  const suffix = def ? ` (${def})` : "";
  const a = (await rl.question(`${q}${suffix}: `)).trim();
  return a || def || "";
}

async function main() {
  console.log("=== pkg_name template init ===");

  const npmName = normalizePkgName(await ask("NPM package name", "pkg_name"));
  const description = await ask("Description", "pkg_name - description");
  const author = await ask("Author", "pkg_name_author");
  const repoUrl = await ask("Repository URL (git)", "pkg_name_repo_url");
  const keywords = await ask("Keywords (comma separated)", "pkg_name");

  const replacements = {
    pkg_name: npmName,
    pkg_name_author: author,
    pkg_name_repo_url: repoUrl,
    "pkg_name - description": description,
  };

  const files = walk(ROOT);
  let changed = 0;

  for (const file of files) {
    if (replaceInFile(file, replacements)) changed++;
  }

  // Update package.json fields safely
  const pkgPath = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  pkg.name = npmName;
  pkg.description = description;
  pkg.author = author;
  pkg.repository = pkg.repository || {};
  pkg.repository.url = repoUrl;
  pkg.keywords = keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

  console.log(`Done. Updated ${changed} files + package.json.`);
  console.log("Next:");
  console.log("  pnpm install");
  console.log("  pnpm test");
  console.log("  pnpm run build");
  console.log("  pnpm run docs:dev");
  rl.close();
}

main().catch((e) => {
  console.error(e);
  rl.close();
  process.exit(1);
});
