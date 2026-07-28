---
title: Website Deployment Guide
summary: GitHub Pages deployment, configuration, and verification steps
type: guide
category: Documentation
visibility: internal
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
---

# Website Deployment to GitHub Pages

## Overview

This portfolio website is deployed to GitHub Pages using:
- **Build Tool:** MkDocs with Material theme
- **Source:** `website/` folder (4 markdown pages)
- **Deployment:** Automated via GitHub Actions on commits to `main`
- **Live URL:** `https://patilkunals.github.io/`

---

## Architecture

```
Source Files (website/)
  ├─ index.md (homepage)
  ├─ about.md (biography, philosophy)
  ├─ portfolio.md (project index)
  └─ architecture.md (architecture philosophy)
         ↓
    mkdocs.yml (configuration)
         ↓
   GitHub Actions Workflow
   (deploy-website.yml)
         ↓
   MkDocs Build
   (converts MD → HTML)
         ↓
   GitHub Pages
   (serves static site)
         ↓
   https://patilkunals.github.io/
```

---

## Configuration Files

### 1. mkdocs.yml
**Location:** Repository root  
**Purpose:** Configures MkDocs build and theme

**Key Settings:**
- `docs_dir: website` — Source folder for website content
- `site_dir: site` — Output folder (built HTML)
- `theme: material` — Material Design theme for professional appearance
- `nav:` — Navigation menu structure (4 pages)
- `plugins:` — Search, minification, analytics
- `markdown_extensions:` — Code highlighting, tables, emoji, etc.

**Customization Options:**
- Change `primary` and `accent` colors in palette
- Add additional nav items
- Configure analytics (set `GOOGLE_ANALYTICS_ID` environment variable)

### 2. .github/workflows/deploy-website.yml
**Location:** `.github/workflows/`  
**Purpose:** Automates build and deployment

**Workflow Steps:**
1. Checkout repository
2. Set up Python 3.11
3. Install MkDocs and dependencies
4. Build static site from markdown
5. Upload build artifacts
6. Deploy to GitHub Pages

**Triggers:**
- Push to `main` branch (website/ or mkdocs.yml changes)
- Manual workflow dispatch (GitHub UI)

**Permissions:**
- `pages: write` — Deploy to GitHub Pages
- `id-token: write` — Authentication token

### 3. requirements-docs.txt
**Location:** Repository root  
**Purpose:** Python dependencies for builds

**Packages:**
- `mkdocs` — Static site generator
- `mkdocs-material` — Professional theme
- `pymdown-extensions` — Extended markdown support

---

## Setup Instructions

### Step 1: Local Testing (Optional)

Before deploying, test the site locally:

```bash
# Install dependencies
pip install -r requirements-docs.txt

# Build and serve locally
mkdocs serve

# Site available at: http://localhost:8000
```

### Step 2: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
   - This configures automatic deployment from actions
3. Save settings

### Step 3: Configure Custom Domain (Optional)

1. Go to repository **Settings** → **Pages**
2. Under "Custom domain":
   - Enter desired domain (e.g., `www.patilkunal.com`)
   - Create CNAME file: `patilkunal.com`
3. Update DNS records at domain registrar:
   - Add CNAME record pointing to `patilkunals.github.io`

### Step 4: Verify Deployment

1. Commit changes to `main` branch:
   ```bash
   git add mkdocs.yml website/ requirements-docs.txt .github/workflows/
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. Check GitHub Actions:
   - Go to **Actions** tab
   - Select "Deploy Website to GitHub Pages" workflow
   - Watch build progress
   - Verify "Deploy" step succeeds

3. Verify live site:
   - Visit `https://patilkunals.github.io/`
   - Verify all pages load correctly
   - Test navigation menu
   - Test search functionality

---

## Content Management

### Adding New Pages

1. Create new markdown file in `website/` folder:
   ```markdown
   ---
   title: Page Title
   summary: Short summary for metadata
   ---
   
   # Page Title
   
   Content here...
   ```

2. Update `mkdocs.yml` navigation:
   ```yaml
   nav:
     - Home: index.md
     - New Page: new-page.md
   ```

3. Commit and push — deployment happens automatically

### Updating Existing Pages

1. Edit markdown file in `website/`
2. Commit and push
3. Changes deployed automatically within ~2 minutes

### Adding Images

1. Create `website/images/` folder
2. Add image files
3. Reference in markdown:
   ```markdown
   ![Alt text](images/filename.jpg)
   ```

---

## Troubleshooting

### Build Fails

**Problem:** GitHub Actions workflow fails  
**Solution:** 
1. Check workflow run logs (Actions tab)
2. Verify all markdown files have YAML frontmatter
3. Verify mkdocs.yml syntax (YAML must be valid)
4. Test locally: `mkdocs build`

### Site Not Updating

**Problem:** Changes don't appear on live site  
**Solution:**
1. Wait 2-3 minutes for deployment to complete
2. Hard refresh browser (Ctrl+Shift+R)
3. Check GitHub Actions workflow succeeded
4. Verify files were committed to `main` branch

### Theme Not Loading

**Problem:** Site appears unstyled  
**Solution:**
1. Verify Material theme installed: `pip install mkdocs-material`
2. Check mkdocs.yml: `theme: name: material` is present
3. Clear browser cache and hard refresh
4. Check GitHub Pages settings: verify "GitHub Actions" is selected

### Search Not Working

**Problem:** Search box appears but doesn't work  
**Solution:**
1. Verify MkDocs search plugin enabled in mkdocs.yml
2. Rebuild site: `mkdocs build`
3. Deploy: `git push origin main`
4. Wait for deployment to complete

---

## Performance Optimization

### Current Setup
- **Build Time:** ~30 seconds
- **Site Size:** ~2-3 MB (minified HTML/CSS/JS)
- **Load Time:** <1 second globally (CDN via GitHub Pages)
- **Search:** Built-in MkDocs search (instant, client-side)

### Optimization Tips

1. **Reduce Image Size:**
   - Compress images before adding to website/
   - Use WebP format where possible

2. **Optimize Content:**
   - Keep markdown files modular
   - Avoid very large files (>10 MB)

3. **Minification:**
   - Already enabled in mkdocs.yml
   - Automatically minifies HTML, CSS, JS

---

## Monitoring & Analytics

### Google Analytics (Optional)

To enable analytics tracking:

1. Create Google Analytics account
2. Set environment variable:
   ```bash
   export GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
   ```
3. Redeploy or add to GitHub Actions secrets

### GitHub Actions Insights

Monitor deployment health:
1. Go to **Actions** tab
2. Select "Deploy Website to GitHub Pages"
3. View:
   - Recent runs (success/failure)
   - Deployment history
   - Execution times

---

## Security Considerations

### Current Setup
- ✅ All traffic via HTTPS (GitHub Pages enforces)
- ✅ No personal data collected (static site)
- ✅ No backend or databases
- ✅ Source control via private/public GitHub repo

### Recommendations
1. Keep repository public (portfolio transparency)
2. Avoid committing API keys or secrets
3. Use GitHub Secrets for sensitive environment variables
4. Monitor Actions runs for unusual activity

---

## Maintenance Checklist

**Weekly:**
- [ ] Verify site loads without errors
- [ ] Check GitHub Actions runs succeeded

**Monthly:**
- [ ] Update dependencies: `pip install --upgrade -r requirements-docs.txt`
- [ ] Review analytics (if enabled)
- [ ] Test search functionality

**Quarterly:**
- [ ] Backup markdown content (Git provides version control)
- [ ] Review and update deployment configuration
- [ ] Test full deployment workflow from scratch

---

## Rollback & Recovery

### Rollback to Previous Version

If something breaks, revert using Git:

```bash
# View commit history
git log --oneline

# Revert to previous commit
git revert <commit-hash>
git push origin main

# Site will rebuild and deploy with previous version
```

### Full Site Recovery

If needed to restore from backup:

1. Markdown source files are in Git (version history preserved)
2. GitHub Pages builds from Git automatically
3. To restore: `git checkout <commit-hash> -- website/`

---

## Support & Documentation

### External Resources
- [MkDocs Documentation](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

### Common Commands

```bash
# Local development
mkdocs serve                    # Serve locally (http://localhost:8000)
mkdocs build                    # Build static site to ./site
mkdocs build --strict           # Build with strict error checking

# Git deployment
git status                      # Check changes
git add website/ mkdocs.yml     # Stage changes
git commit -m "Update website"  # Commit with message
git push origin main            # Push and trigger deployment

# Dependency management
pip install -r requirements-docs.txt    # Install dependencies
pip list                                # List installed packages
```

---

**Last Updated:** 2026-07-28  
**Status:** Deployed and Active  
**Next Review:** 2026-08-31
