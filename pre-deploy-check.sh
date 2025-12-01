#!/bin/bash

# Pre-Deployment Check Script for StonkFace
# Run this before pushing to GitHub and deploying to Cloudflare

echo "🔍 StonkFace Pre-Deployment Check"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check 1: .env file should not be committed
echo "1️⃣  Checking for .env in git..."
if git ls-files --error-unmatch .env 2>/dev/null; then
    echo -e "${RED}❌ CRITICAL: .env file is tracked by git!${NC}"
    echo "   Run: git rm --cached .env"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ .env is not tracked by git${NC}"
fi
echo ""

# Check 2: Search for potential secrets in code
echo "2️⃣  Checking for potential secrets..."
if git grep -E "(api[_-]?key|password|secret|token).*=.*['\"]([^'\"]{8,})" -- '*.ts' '*.tsx' '*.js' '*.jsx' ':!*.md' ':!.env.example' 2>/dev/null; then
    echo -e "${YELLOW}⚠️  WARNING: Potential secrets found in code${NC}"
    echo "   Review the above matches"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ No obvious secrets found in code${NC}"
fi
echo ""

# Check 3: node_modules should be ignored
echo "3️⃣  Checking node_modules..."
if git ls-files --error-unmatch node_modules 2>/dev/null; then
    echo -e "${RED}❌ node_modules is tracked by git!${NC}"
    echo "   Run: git rm -r --cached node_modules"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ node_modules is properly ignored${NC}"
fi
echo ""

# Check 4: dist folder should be ignored
echo "4️⃣  Checking dist folder..."
if git ls-files --error-unmatch dist 2>/dev/null; then
    echo -e "${YELLOW}⚠️  WARNING: dist folder is tracked by git${NC}"
    echo "   Run: git rm -r --cached dist"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ dist folder is properly ignored${NC}"
fi
echo ""

# Check 5: Dependencies installed
echo "5️⃣  Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules exists${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: node_modules not found${NC}"
    echo "   Run: npm install"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 6: Test production build
echo "6️⃣  Testing production build..."
if npm run build:client > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Production build successful${NC}"
    # Clean up
    rm -rf dist/client
else
    echo -e "${RED}❌ Production build failed!${NC}"
    echo "   Run: npm run build:client"
    echo "   Check the output for errors"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 7: Verify package.json has correct scripts
echo "7️⃣  Checking package.json scripts..."
if grep -q '"build:client"' package.json; then
    echo -e "${GREEN}✅ build:client script exists${NC}"
else
    echo -e "${RED}❌ build:client script missing${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 8: Git status
echo "8️⃣  Checking git status..."
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${GREEN}✅ All changes committed${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: Uncommitted changes detected${NC}"
    echo "   Run: git status"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Check 9: Check for localhost references
echo "9️⃣  Checking for hardcoded localhost..."
if git grep -n "localhost" -- '*.ts' '*.tsx' ':!vite.config.ts' ':!*.md' ':!pre-deploy-check.sh' 2>/dev/null | grep -v "//"; then
    echo -e "${YELLOW}⚠️  WARNING: localhost references found${NC}"
    echo "   Ensure these are only in development mode"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ No hardcoded localhost in source files${NC}"
fi
echo ""

# Check 10: Verify .gitignore exists and has key entries
echo "🔟 Checking .gitignore..."
if [ -f ".gitignore" ]; then
    MISSING=()
    if ! grep -q "node_modules" .gitignore; then
        MISSING+=("node_modules")
    fi
    if ! grep -q ".env" .gitignore; then
        MISSING+=(".env")
    fi
    if ! grep -q "dist" .gitignore; then
        MISSING+=("dist")
    fi

    if [ ${#MISSING[@]} -eq 0 ]; then
        echo -e "${GREEN}✅ .gitignore has all required entries${NC}"
    else
        echo -e "${YELLOW}⚠️  WARNING: .gitignore missing: ${MISSING[*]}${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${RED}❌ .gitignore not found!${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Summary
echo "=================================="
echo "📊 Summary"
echo "=================================="
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! You're ready to deploy!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Push to GitHub: git push origin main"
    echo "  2. Go to Cloudflare Pages dashboard"
    echo "  3. Connect your GitHub repo"
    echo "  4. Use these build settings:"
    echo "     - Build command: npm run build:client"
    echo "     - Build output directory: dist/client"
    echo "     - Node version: 18"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  ${WARNINGS} warning(s) found${NC}"
    echo ""
    echo "Review the warnings above. You can proceed with deployment,"
    echo "but consider addressing these issues."
    exit 0
else
    echo -e "${RED}❌ ${ERRORS} error(s) and ${WARNINGS} warning(s) found${NC}"
    echo ""
    echo "Please fix the errors above before deploying."
    exit 1
fi
