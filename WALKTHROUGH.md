# GitHub Pages & Actions — Quick Walkthrough

This short guide helps you publish the site and configure the Actions workflow if you choose to use it.

## Option A — Simple (recommended for quick publish)
1. Create a repository named exactly: `patilkunals.github.io`.
2. Commit & push all files to the `main` branch (index.html at root, assets/ folder, README.md).
3. In GitHub: Settings → Pages → Source: select **main** branch and **/ (root)**. Save.
4. Wait a minute — the site will be published at: `https://patilkunals.github.io/`.

## Option B — Using GitHub Actions to publish to `gh-pages`
1. Keep files in `main`. The included workflow `.github/workflows/deploy.yml` will publish the repository root to the `gh-pages` branch whenever you push to `main`.
2. No additional secrets required — the workflow uses `${{ secrets.GITHUB_TOKEN }}` which is provided by GitHub automatically.
3. After the workflow runs, go to Settings → Pages and set **Source** to the `gh-pages` branch.
4. You can review the Actions run under the **Actions** tab to see logs and confirm successful deployment.

## Notes on Branches & Publishing
- If you use Option A (direct Pages from `main`/root), you don't need the Actions workflow — you may remove `.github/workflows/deploy.yml`.
- If you prefer to keep `main` clean and publish from a built branch (`gh-pages`), keep the workflow and set Pages source to `gh-pages`.

## Optional: Custom Domain & HTTPS
- If you have a custom domain, add `CNAME` to the repo root with your domain name and configure DNS records (A or CNAME as GitHub recommends).
- GitHub will provision HTTPS automatically for your domain once DNS is validated.

## Troubleshooting
- If the site doesn't appear: check the Actions logs (Actions tab) or Pages settings for errors.
- If assets (CSS/JS/images) are 404: ensure paths are correct and files committed at exact locations (`/assets/css/styles.css`, `/assets/js/script.js`, `/assets/img/*`).

---
If you want, I can also:
- Create a GitHub Actions workflow that builds assets (e.g., run a static-site build) before publishing.
- Provide step-by-step screenshots for the GitHub UI.
