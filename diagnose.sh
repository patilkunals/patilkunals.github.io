#!/bin/bash
# GitHub Pages Deployment Diagnostic Script
# Run this to identify what's preventing your site from deploying

echo "=================================="
echo "GitHub Pages Deployment Diagnosis"
echo "=================================="
echo ""

# Check 1: Repository exists and git is initialized
echo "[1/7] Checking Git repository..."
if [ -d ".git" ]; then
    echo "✓ Git repository found"
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo "  Current branch: $BRANCH"
else
    echo "✗ ERROR: Not in a git repository"
    echo "  Run: cd c:\Users\kunalpatil\workspace\personal\patilkunals.github.io"
    exit 1
fi

echo ""

# Check 2: mkdocs.yml exists and is valid
echo "[2/7] Checking mkdocs.yml..."
if [ -f "mkdocs.yml" ]; then
    echo "✓ mkdocs.yml found"
    if grep -q "docs_dir: website" mkdocs.yml; then
        echo "✓ docs_dir correctly set to 'website'"
    else
        echo "✗ ERROR: docs_dir not set to 'website'"
        echo "  Edit mkdocs.yml and add: docs_dir: website"
    fi
else
    echo "✗ ERROR: mkdocs.yml not found"
    exit 1
fi

echo ""

# Check 3: Website files exist
echo "[3/7] Checking website files..."
FILES=("website/index.md" "website/about.md" "website/portfolio.md" "website/architecture.md")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ ERROR: $file missing"
    fi
done

echo ""

# Check 4: GitHub Actions workflow exists
echo "[4/7] Checking GitHub Actions workflow..."
if [ -f ".github/workflows/deploy-website.yml" ]; then
    echo "✓ Workflow file found at .github/workflows/deploy-website.yml"
else
    echo "✗ ERROR: Workflow not found at .github/workflows/deploy-website.yml"
fi

echo ""

# Check 5: Requirements file exists
echo "[5/7] Checking dependencies..."
if [ -f "requirements-docs.txt" ]; then
    echo "✓ requirements-docs.txt found"
    echo "  Contents:"
    cat requirements-docs.txt | sed 's/^/    /'
else
    echo "✗ ERROR: requirements-docs.txt not found"
fi

echo ""

# Check 6: Uncommitted changes
echo "[6/7] Checking for uncommitted changes..."
if git status --short | grep -q "^"; then
    echo "⚠ WARNING: Uncommitted changes found:"
    git status --short | sed 's/^/  /'
    echo ""
    echo "  Run these commands to commit and push:"
    echo "  git add mkdocs.yml .github/ requirements-docs.txt .nojekyll"
    echo "  git commit -m 'Setup GitHub Pages deployment'"
    echo "  git push origin main"
else
    echo "✓ All changes committed"
fi

echo ""

# Check 7: Recent commits
echo "[7/7] Checking git history..."
echo "Last 3 commits:"
git log --oneline -3 | sed 's/^/  /'

echo ""
echo "=================================="
echo "Diagnosis Complete"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. If any ✗ errors above, fix them"
echo "2. Push changes: git push origin main"
echo "3. Check GitHub Actions: https://github.com/patilkunals/patilkunals.github.io/actions"
echo "4. Verify GitHub Pages setting: https://github.com/patilkunals/patilkunals.github.io/settings/pages"
echo "5. Wait 2-3 minutes for deployment"
echo "6. Visit: https://patilkunals.github.io/"
