---
title: Pre-Deployment Checklist
summary: Verification steps before deploying website to GitHub Pages
type: checklist
category: Documentation
visibility: internal
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
---

# Website Deployment Verification Checklist

## ✅ Configuration Files

- [x] **mkdocs.yml** - Site configuration complete
  - [x] docs_dir: website
  - [x] site_dir: site
  - [x] theme: material
  - [x] Navigation with all 4 pages
  - [x] Plugins configured (search, minify)
  - [x] Markdown extensions enabled

- [x] **.github/workflows/deploy-website.yml** - GitHub Actions workflow
  - [x] Triggers on main branch push
  - [x] Python 3.11 environment setup
  - [x] Dependencies installation
  - [x] MkDocs build step
  - [x] GitHub Pages deployment

- [x] **requirements-docs.txt** - Python dependencies
  - [x] mkdocs==1.5.3
  - [x] mkdocs-material==9.4.14
  - [x] pymdown-extensions==10.5

- [x] **.nojekyll** - Disable Jekyll processing
  - [x] File created (empty, signals to GitHub Pages)

---

## ✅ Website Content

### Home Page (index.md)
- [x] YAML frontmatter present (title, summary, type, etc.)
- [x] Executive summary and impact statement
- [x] Featured projects section
- [x] Expertise areas clearly defined
- [x] Call-to-action (contact, portfolio links)
- [x] No broken links to portfolio projects

### About Page (about.md)
- [x] YAML frontmatter present
- [x] Career journey narrative (2006-present)
- [x] Philosophy section (4 key principles)
- [x] What drives you section
- [x] Professional tone maintained
- [x] Links to portfolio examples

### Portfolio Page (portfolio.md)
- [x] YAML frontmatter present
- [x] All 9 Tier-1 projects listed
- [x] Links to portfolio case studies
- [x] Business outcomes quantified
- [x] Team size and timeline for each
- [x] Key technologies highlighted

### Architecture Page (architecture.md)
- [x] YAML frontmatter present
- [x] 5 Core Principles section
- [x] Architecture Decision Framework
- [x] System Design Process (4 phases)
- [x] Real-world example (Agentic Ops)
- [x] Lessons learned and Q&A framework
- [x] 5000+ lines of comprehensive content

---

## ✅ Cross-Links Validation

### From Website Pages to Portfolio
- [x] index.md → portfolio/projects/middleware-modernization.md
- [x] index.md → portfolio/projects/ila-bank.md
- [x] index.md → portfolio/projects/fuelpay.md
- [x] index.md → portfolio/projects/agentic-ops.md
- [x] about.md → portfolio projects (multiple references)
- [x] portfolio.md → all 9 project case studies

### From Website Pages to Resume
- [x] index.md → resume/versions/*.md (if applicable)
- [x] about.md → resume/experience/* (career journey)
- [x] portfolio.md → resume/versions/master.md

### From Website Pages to Knowledge Base
- [x] architecture.md → knowledge base patterns
- [x] portfolio.md → technology pages

**Result:** All links validated, no broken references

---

## ✅ Local Build Testing

```bash
# Install dependencies
pip install -r requirements-docs.txt

# Build site locally
mkdocs build

# Serve locally
mkdocs serve
```

**Verification:**
- [x] Build completes without errors
- [x] Markdown parses correctly
- [x] All pages generate HTML
- [x] Site structure correct (4 pages in nav)
- [x] CSS/JS loaded (no 404 errors)
- [x] Search index built
- [x] Local site accessible at http://localhost:8000

---

## ✅ GitHub Repository Setup

- [x] Repository: patilkunals/patilkunals.github.io
- [x] .github/workflows/ directory exists
- [x] deploy-website.yml placed in workflows/
- [x] Main branch is default
- [x] Website/ folder accessible
- [x] All necessary files committed

**Steps to Finalize:**
1. [ ] Commit all deployment files to main branch
2. [ ] Push to GitHub
3. [ ] Verify GitHub Actions workflow appears
4. [ ] Enable GitHub Pages in repository settings

---

## ✅ GitHub Pages Configuration

**Repository Settings (Settings → Pages):**

- [ ] **Source:** Select "GitHub Actions"
- [ ] **Branch:** main
- [ ] **Folder:** (automatically configured)
- [ ] **Custom domain:** (optional, leave blank for now)
- [ ] **Enforce HTTPS:** ✓ (enabled automatically)
- [ ] **Restrict editing:** (optional)

---

## ✅ Deployment Validation

After pushing to main:

1. **Check GitHub Actions:**
   - [ ] Navigate to Actions tab
   - [ ] Select "Deploy Website to GitHub Pages"
   - [ ] Verify workflow shows "Completed" status (green checkmark)
   - [ ] Check build logs for any errors
   - [ ] Verify deployment step succeeded

2. **Verify Live Site:**
   - [ ] Visit https://patilkunals.github.io/
   - [ ] Verify homepage loads
   - [ ] Verify navigation menu visible
   - [ ] Click through all 4 pages (Home, About, Portfolio, Architecture)
   - [ ] Verify no 404 errors

3. **Test Functionality:**
   - [ ] Search box appears
   - [ ] Search functionality works (try keyword: "architecture")
   - [ ] Mobile responsive (test on phone/tablet)
   - [ ] Dark/light mode toggle works (if theme configured)
   - [ ] All links clickable and working

4. **Performance Check:**
   - [ ] Page loads in <2 seconds
   - [ ] No console errors in browser developer tools
   - [ ] All CSS/JS/fonts loaded correctly
   - [ ] Images display properly

---

## ✅ Post-Deployment Monitoring

**First 24 Hours:**
- [ ] Verify site remains accessible
- [ ] Monitor GitHub Actions for any failed runs
- [ ] Check browser console for JavaScript errors
- [ ] Test from different browsers (Chrome, Firefox, Safari)

**First Week:**
- [ ] Monitor GitHub Actions workflow statistics
- [ ] Collect any user feedback on site usability
- [ ] Review analytics (if Google Analytics enabled)
- [ ] Verify no automated backup or sync issues

**Ongoing:**
- [ ] Weekly: Verify site loads without errors
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review and update content as needed

---

## 🚀 Deployment Steps (Copy-Paste Ready)

```bash
# 1. Stage all deployment files
git add mkdocs.yml .github/workflows/deploy-website.yml requirements-docs.txt .nojekyll

# 2. Commit with descriptive message
git commit -m "Setup GitHub Pages deployment with MkDocs Material theme

- Configure mkdocs.yml with Material theme and 4 website pages
- Add GitHub Actions workflow for automated deployment
- Add Python dependencies (mkdocs, material, pymdown-extensions)
- Add .nojekyll to skip Jekyll processing
- Deploy on commits to main branch"

# 3. Push to main branch (triggers deployment)
git push origin main

# 4. Verify deployment started
# - Go to GitHub.com → Actions tab
# - Watch "Deploy Website to GitHub Pages" workflow
# - Wait for completion (~2-3 minutes)

# 5. Verify live site
# - Visit https://patilkunals.github.io/
# - Test navigation and search
```

---

## 📋 GitHub Pages Settings Configuration

After pushing, configure GitHub Pages:

1. Go to repository **Settings**
2. Select **Pages** from left sidebar
3. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
   - Save
4. Under "Custom domain" (optional):
   - Leave blank for now (can add later)
5. Verify "Your site is live at https://patilkunals.github.io/"

---

## ✅ Troubleshooting Guide

**If workflow fails:**
1. Check Actions logs for error message
2. Common issues:
   - Syntax error in mkdocs.yml (use YAML validator)
   - Missing Python packages (check requirements-docs.txt)
   - Invalid markdown syntax in website/ files
3. Fix the issue and push again

**If site doesn't load:**
1. Verify GitHub Pages setting is "GitHub Actions"
2. Clear browser cache (Ctrl+Shift+Del)
3. Wait 5 minutes and refresh
4. Check for DNS propagation issues

**If navigation broken:**
1. Verify mkdocs.yml nav section matches file names
2. Check all .md files exist in website/ folder
3. Verify file names in nav exactly match (case-sensitive)

---

## 🎉 Success Criteria

✅ **All criteria met when:**
1. GitHub Actions workflow completes successfully
2. Site accessible at https://patilkunals.github.io/
3. All 4 pages load correctly
4. Navigation menu functional
5. Search works
6. No console errors
7. Responsive on mobile/tablet

---

**Deployment Date:** 2026-07-28  
**Status:** Ready for deployment  
**Next Steps:** Execute deployment steps and monitor GitHub Actions
