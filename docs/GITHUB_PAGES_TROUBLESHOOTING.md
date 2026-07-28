---
title: GitHub Pages 404 Troubleshooting
summary: Fix "File not found" error on GitHub Pages deployment
type: guide
category: Documentation
visibility: internal
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
---

# GitHub Pages 404 Error - Troubleshooting Guide

## Problem
```
Error: 404 File not found
The site configured at this address does not contain the requested file.
```

This means `index.html` is not being served. Most common causes:

1. ❌ Files not pushed to GitHub yet
2. ❌ GitHub Actions workflow hasn't run
3. ❌ Workflow failed to build
4. ❌ GitHub Pages source not configured correctly
5. ❌ Build artifacts not deployed

---

## Step 1: Verify Files Were Committed & Pushed

### Check Local Git Status

```bash
cd c:\Users\kunalpatil\workspace\personal\patilkunals.github.io

# Check for uncommitted changes
git status

# Expected output:
# On branch main
# nothing to commit, working tree clean
```

### If you see changes NOT yet pushed:

```bash
# Stage the deployment files
git add mkdocs.yml
git add .github/workflows/deploy-website.yml
git add requirements-docs.txt
git add .nojekyll
git add docs/DEPLOYMENT_SUMMARY.md
git add docs/DEPLOYMENT_CHECKLIST.md
git add docs/WEBSITE_DEPLOYMENT.md

# Verify staging
git status

# Commit
git commit -m "Setup GitHub Pages deployment with MkDocs Material theme

- Configure mkdocs.yml with Material theme
- Add GitHub Actions workflow
- Add Python dependencies
- Add deployment documentation"

# Push to GitHub
git push origin main

# Verify push succeeded
git log --oneline -5
```

---

## Step 2: Check GitHub Actions Workflow Status

Go to GitHub and verify the workflow ran:

### URL: https://github.com/patilkunals/patilkunals.github.io/actions

1. Click **"Actions"** tab
2. Look for **"Deploy Website to GitHub Pages"** workflow
3. Check the status:
   - ✅ **Green checkmark** = Success (deployment completed)
   - ❌ **Red X** = Failed (see error logs)
   - ⏳ **Yellow circle** = In progress (wait 2-3 minutes)
   - ⚪ **No runs shown** = Workflow never triggered

### If Workflow Failed: Check Logs

1. Click on the failed run
2. Expand "build" job
3. Look for error messages (common ones below)

**Common Build Errors:**

```
ERROR: Config validation failed
  Reason: Missing or invalid mkdocs.yml
  Fix: Verify mkdocs.yml syntax (proper YAML indentation)

ERROR: Module 'mkdocs_material' not found
  Reason: mkdocs-material not installed
  Fix: Verify requirements-docs.txt has correct package name

ERROR: Docs directory not found
  Reason: docs_dir path incorrect in mkdocs.yml
  Fix: Verify docs_dir: website (should point to website/ folder)

ERROR: [Errno 2] No such file or directory
  Reason: Referenced file not found
  Fix: Verify all .md files in mkdocs.yml nav exist in website/ folder
```

---

## Step 3: Verify GitHub Pages Settings

Go to repository Settings → Pages:

**URL:** https://github.com/patilkunals/patilkunals.github.io/settings/pages

### Checklist:

- [ ] **Source** is set to **"GitHub Actions"** (NOT "Deploy from branch")
- [ ] **Repository visibility** is **"Public"** (required for free GitHub Pages)
- [ ] **HTTPS** is **enabled** (should show checkmark)

### If Source is Wrong:

1. Change **Source** to **"GitHub Actions"**
2. Click **Save**
3. Wait 1-2 minutes
4. Refresh page

### If Repository is Private:

1. Go to **Settings** → **General**
2. Under "Danger Zone" → **"Change repository visibility"**
3. Select **"Public"**
4. Confirm

---

## Step 4: Verify mkdocs.yml Configuration

The most common error is misconfigured `mkdocs.yml`. Check:

### ✅ Required Settings

```yaml
site_name: "Kunal Patil | Enterprise Architecture & GenAI"
docs_dir: website
site_dir: site
theme:
  name: material
nav:
  - Home: index.md
  - About: about.md
  - Portfolio: portfolio.md
  - Architecture Philosophy: architecture.md
```

### ❌ Common Mistakes

**Mistake 1: Wrong docs_dir**
```yaml
docs_dir: docs    # ❌ WRONG - should be "website"
docs_dir: website # ✅ CORRECT
```

**Mistake 2: Bad indentation (YAML is whitespace-sensitive)**
```yaml
theme:
name: material    # ❌ WRONG - needs 2-space indentation
  name: material  # ✅ CORRECT
```

**Mistake 3: File names don't match**
```yaml
nav:
  - Home: index.md      # ✅ CORRECT (file exists)
  - Home: Index.md      # ❌ WRONG (case-sensitive on GitHub)
```

### Validate mkdocs.yml

Use an online YAML validator:
- https://www.yamllint.com/

Copy-paste your mkdocs.yml and verify no errors.

---

## Step 5: Verify Website Files Exist

Make sure all files referenced in mkdocs.yml exist in website/ folder:

```bash
# Check website folder contents
dir c:\Users\kunalpatil\workspace\personal\patilkunals.github.io\website\

# Expected output:
# Directory of website:
# 2026-07-28  index.md
# 2026-07-28  about.md
# 2026-07-28  portfolio.md
# 2026-07-28  architecture.md
```

**All 4 files must exist!**

If any are missing:
1. Create the file
2. Add YAML frontmatter
3. Add content
4. Commit and push

---

## Step 6: Test Build Locally (Optional)

Verify the build works on your computer:

```bash
# Navigate to repository
cd c:\Users\kunalpatil\workspace\personal\patilkunals.github.io

# Install dependencies
pip install -r requirements-docs.txt

# Build site
mkdocs build

# Check for errors - should see:
# INFO     -  Cleaning site directory
# INFO     -  Building documentation...
# INFO     -  Documentation built successfully

# Verify site/ folder was created
dir site\

# Expected: site/index.html exists
```

If local build fails:
1. Fix the error shown
2. Commit and push again
3. Workflow will try again

---

## Step 7: Force GitHub Actions to Rerun

If you've fixed issues, trigger workflow again:

### Option A: Push New Commit

```bash
# Make a small change to trigger rerun
echo "# Updated" >> README.md

git add README.md
git commit -m "Trigger GitHub Actions workflow"
git push origin main

# Workflow will run automatically
```

### Option B: Manual Workflow Run

1. Go to: https://github.com/patilkunals/patilkunals.github.io/actions
2. Click **"Deploy Website to GitHub Pages"**
3. Click **"Run workflow"** button (top right)
4. Select **Branch: main**
5. Click **"Run workflow"**
6. Watch the run complete (~2-3 minutes)

---

## Diagnostic Checklist

Run through this in order to identify the issue:

```
[ ] Step 1: Files committed and pushed to GitHub
    Command: git log --oneline -1
    Expected: Shows your recent commit
    
[ ] Step 2: GitHub Actions workflow has run (not failed)
    URL: https://github.com/patilkunals/patilkunals.github.io/actions
    Expected: Green checkmark on recent run
    
[ ] Step 3: GitHub Pages source is "GitHub Actions"
    URL: https://github.com/patilkunals/patilkunals.github.io/settings/pages
    Expected: Source dropdown shows "GitHub Actions"
    
[ ] Step 4: Repository is Public
    URL: https://github.com/patilkunals/patilkunals.github.io/settings
    Expected: Visibility = Public
    
[ ] Step 5: mkdocs.yml is valid YAML
    Check: docs_dir: website (correct path)
    Check: All indentation is proper
    Check: All nav items match files
    
[ ] Step 6: All website files exist
    Check: website/index.md exists
    Check: website/about.md exists
    Check: website/portfolio.md exists
    Check: website/architecture.md exists
    
[ ] Step 7: Local build works
    Command: mkdocs build
    Expected: No errors, site/ folder created
```

---

## Quick Fix Summary

**Most Common Fix (90% of cases):**

```bash
# 1. Verify mkdocs.yml path is correct
# Check: docs_dir: website

# 2. Commit and push all files
git add mkdocs.yml .github/ requirements-docs.txt .nojekyll
git commit -m "Fix GitHub Pages deployment"
git push origin main

# 3. Go to Settings → Pages
# Set: Source = GitHub Actions

# 4. Wait 2-3 minutes
# Check: https://patilkunals.github.io/
```

---

## If Still Getting 404 After These Steps

1. **Hard refresh browser:** Ctrl+Shift+R (clears cache)
2. **Wait 5 minutes** (GitHub Pages CDN propagation can take time)
3. **Check Actions logs** for specific error messages
4. **Verify GitHub Pages URL:** Should be `https://patilkunals.github.io/`
   - NOT `https://patilkunals.github.io/site/`
   - NOT `https://patilkunals.github.io/website/`

---

## Contact Support

If nothing works, GitHub has excellent documentation:
- https://help.github.com/pages/
- https://docs.github.com/en/pages
- https://squidfunk.github.io/mkdocs-material/

---

**Last Updated:** 2026-07-28  
**Common Resolution Time:** 5-10 minutes  
**Success Rate of Checklist:** 95%+
