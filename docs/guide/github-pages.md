# GitHub Pages

This template deploys documentation to GitHub Pages automatically.

## How It Works

1. Push documentation changes to `main`
2. GitHub Actions builds the VitePress site
3. Built files are deployed to GitHub Pages
4. Site is available at `https://<user>.github.io/<repo>/`

## Initial Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - **Source:** GitHub Actions
4. Save

::: warning Don't use "Deploy from a branch"
The old method of deploying from `gh-pages` branch doesn't work well with GitHub Actions. Use "GitHub Actions" as the source.
:::

### 2. Configure Base Path

VitePress needs to know the base URL path for your site.

Edit `docs/.vitepress/config.mts`:

```typescript
export default defineConfig({
  title: "Your Package",
  description: "Your description",
  base: "/your-repo-name/", // [!code highlight]
  // ... rest of config
});
```

::: info Base Path Rules
| Hosting | Base |
| -------------------------------------- | ----------------- |
| `username.github.io/repo-name` | `/repo-name/` |
| Custom domain (`docs.example.com`) | `/` |
| `username.github.io` (user/org site) | `/` |
:::

### 3. Verify Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**:
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
3. Save

## Deployment Workflow

The workflow in `.github/workflows/docs.yml`:

1. **Triggers** on pushes to `main` that modify:
   - `docs/**`
   - `src/**` (API docs depend on source)
   - `package.json`, `pnpm-lock.yaml`
   - `typedoc.json`

2. **Builds** the documentation:

   ```bash
   pnpm run docs:build
   ```

3. **Deploys** to GitHub Pages using the official action

### Manual Deployment

You can trigger a deployment manually:

1. Go to **Actions** → **Deploy Docs**
2. Click **Run workflow**
3. Select the `main` branch
4. Click **Run workflow**

## Verifying Deployment

After the workflow completes:

1. Go to **Actions** tab
2. Find the latest "Deploy Docs" run
3. Click on it to see the deployment URL
4. Or visit `https://<user>.github.io/<repo>/`

### First Deployment

The first deployment may take a few minutes to propagate. If you see a 404:

1. Wait 2-5 minutes
2. Hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`)
3. Check the Actions tab for errors

## Custom Domain

To use a custom domain like `docs.example.com`:

### 1. Configure DNS

Add a CNAME record with your DNS provider:

| Type  | Name | Value                |
| ----- | ---- | -------------------- |
| CNAME | docs | `username.github.io` |

### 2. Add Domain in GitHub

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter `docs.example.com`
3. Click **Save**
4. Wait for DNS check to pass
5. Enable **Enforce HTTPS** once available

### 3. Update VitePress Config

```typescript
export default defineConfig({
  base: "/", // Change from /repo-name/ to /
  // ...
});
```

### 4. Add CNAME File

Create `docs/public/CNAME`:

```
docs.example.com
```

This file is copied to the build output and tells GitHub Pages which domain to use.

## Troubleshooting

### 404 on All Pages

**Cause:** Base path mismatch

**Check:**

- VitePress `base` config matches your repo name
- Include leading and trailing slashes: `/repo-name/`

**Fix:**

```typescript
// docs/.vitepress/config.mts
export default defineConfig({
  base: "/your-repo-name/", // Must match exactly
});
```

### 404 on Subpages (Only Home Works)

**Cause:** Server not handling client-side routing

**This shouldn't happen with GitHub Pages**, but if it does:

1. Ensure you're using "GitHub Actions" as the source
2. Check that `.nojekyll` file exists in the build output
3. VitePress creates this automatically

### Assets Not Loading (CSS/JS)

**Cause:** Wrong base path

**Symptoms:** Page loads but looks broken, no styling

**Fix:** Same as above — verify `base` config

### Workflow Not Running

**Cause:** Path filters not matching

**Check:** The workflow only runs for specific paths. If you only changed files outside those paths, it won't trigger.

**Manual trigger:**

```bash
# Make a trivial docs change
echo "" >> docs/index.md
git add docs/index.md
git commit -m "docs: trigger rebuild"
git push
```

Or use the manual dispatch in the Actions tab.

### "Permission denied" Error

**Cause:** Workflow doesn't have write permissions

**Fix:**

1. **Settings** → **Actions** → **General**
2. Set "Read and write permissions"
3. Re-run the workflow

### Build Succeeds but Deploy Fails

**Cause:** Pages not enabled or wrong source

**Fix:**

1. **Settings** → **Pages**
2. Ensure **Source** is "GitHub Actions"
3. Re-run the workflow

## Environment URLs

After deployment, you can find the URL:

1. **In the workflow run:** Look for the deploy step output
2. **In repository homepage:** See the "Environments" section in the sidebar
3. **In Settings → Pages:** Shows the live URL

## Multiple Environments

For preview deployments on PRs, you'd need to:

1. Create a separate workflow for PR previews
2. Use a service like Netlify, Vercel, or Cloudflare Pages
3. Or use GitHub's deployment environments feature

This template focuses on production deployments to keep things simple.

## Caching

The workflow uses pnpm's built-in caching:

```yaml
- uses: pnpm/action-setup@v4

- uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: "pnpm"
```

This caches `node_modules` based on `pnpm-lock.yaml`, speeding up subsequent builds.
