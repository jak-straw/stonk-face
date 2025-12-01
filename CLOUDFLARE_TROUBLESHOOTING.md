# 🔧 Cloudflare Pages Troubleshooting Guide

## Issue: "Hello World" Instead of StonkFace App

If you're seeing "hello world" or a blank page instead of the StonkFace application, follow these steps:

---

## ✅ Step 1: Verify Build Settings

Go to your Cloudflare Pages dashboard:

1. **Navigate to**: Dashboard → Pages → Your Project → Settings → Builds & deployments
2. **Check these settings**:

```yaml
Build command: npm run build:client
Build output directory: dist/client
Root directory: (leave blank)

Environment variables:
  NODE_VERSION = 18
```

### ⚠️ Common Mistakes:

❌ **Wrong**: `dist/` or `dist/server/` or `client/`  
✅ **Correct**: `dist/client`

❌ **Wrong**: `npm run build` or `npm start`  
✅ **Correct**: `npm run build:client`

---

## ✅ Step 2: Check Build Logs

1. Go to: Dashboard → Pages → Your Project → Deployments
2. Click on the latest deployment
3. Click "View build log"

### Look For These Success Messages:

```
✓ 1266 modules transformed.
✓ built in ~2s
../dist/client/index.html
../dist/client/assets/index-*.css
../dist/client/assets/index-*.js
Success: Build command completed
```

### Common Build Errors:

**Error: "Cannot find module"**
- **Fix**: Add `NODE_VERSION=18` environment variable

**Error: "Missing script: deploy"**
- **Fix**: Already fixed in latest commit, retry deployment

**Error: Module type warning**
- **Fix**: Already fixed with `"type": "module"` in package.json

---

## ✅ Step 3: Verify Deployed Files

After deployment completes, check these URLs:

1. **Verification file**: `https://your-site.pages.dev/DEPLOYED.txt`
   - Should show deployment info
   - If you see this, the build output is correct

2. **Main app**: `https://your-site.pages.dev/`
   - Should show StonkFace application

3. **View source**: Right-click → View Page Source
   - Should see: `<!-- StonkFace v1.0 - Deployed from client/index.html -->`
   - Should NOT see: "hello world" or anything else

---

## ✅ Step 4: Check for Conflicting Deployments

**Problem**: You might have multiple Pages projects pointing to the same domain

**Solution**:
1. Go to: Dashboard → Pages
2. Check if you have multiple projects
3. Delete any old/test projects
4. Keep only the `stonk-face` project

---

## ✅ Step 5: Clear Cache & Force Reload

Sometimes browsers cache old versions:

1. **Chrome/Edge**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Firefox**: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
3. **Safari**: `Cmd + Option + R`

Or:
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

---

## ✅ Step 6: Manually Trigger Rebuild

1. Go to: Dashboard → Pages → Your Project
2. Click on "Deployments" tab
3. Find your production deployment
4. Click the three dots (⋮) menu
5. Select "Retry deployment"

---

## ✅ Step 7: Check Browser Console

1. Open your deployed site
2. Press F12 to open Developer Tools
3. Go to "Console" tab
4. Look for errors (red messages)

### Common Console Errors:

**Error: "Failed to load module"**
- The JavaScript bundle is missing or in wrong location
- Check build output directory is `dist/client`

**Error: "Unexpected token"**
- JavaScript syntax error in deployed code
- Try clearing cache and rebuilding

**No errors, blank page**
- Check "Elements" tab in DevTools
- Look for `<div id="root"></div>`
- If empty, React app failed to mount

---

## ✅ Step 8: Compare Local vs Production

Build and test locally first:

```bash
# Clean build
rm -rf dist/
npm run build:client

# Preview the build
npm run client:start

# Open: http://localhost:4173
```

If it works locally but not in Cloudflare:
- Your build is correct
- Issue is in Cloudflare configuration
- Review Steps 1-2 above

---

## 🔍 Advanced Debugging

### Check Actual Deployed Files

Cloudflare Pages serves files from the build output. To verify:

1. **Check index.html**: 
   - URL: `https://your-site.pages.dev/index.html`
   - Should show the React app

2. **Check assets**:
   - Look at page source
   - Find `<script src="/assets/index-*.js">`
   - Try accessing: `https://your-site.pages.dev/assets/index-*.js`
   - Should download the JavaScript file

3. **Check 404 behavior**:
   - Try: `https://your-site.pages.dev/nonexistent-page`
   - Should redirect to index.html (thanks to `_redirects`)
   - Should show StonkFace app, not 404

---

## 🆘 Still Seeing "Hello World"?

If you've tried everything above and still see "hello world":

### Possible Causes:

1. **Wrong Project Selected**
   - You might be looking at a different Cloudflare Pages project
   - Check the URL matches your actual deployment

2. **Old Deployment**
   - The "hello world" might be from an old test deployment
   - Check deployment history and ensure latest is active

3. **DNS/Proxy Issue**
   - If using custom domain, DNS might point to wrong place
   - Try the `*.pages.dev` URL directly first

4. **Browser Extension**
   - Ad blocker or security extension might be interfering
   - Try in Incognito/Private mode

---

## 📋 Quick Checklist

- [ ] Build output directory is `dist/client`
- [ ] Build command is `npm run build:client`
- [ ] NODE_VERSION is set to 18
- [ ] Latest commit is deployed (check git SHA)
- [ ] Build logs show success
- [ ] Cleared browser cache
- [ ] Tried different browser
- [ ] Checked browser console for errors
- [ ] Verified `/DEPLOYED.txt` shows correct info

---

## 🎯 Expected Working State

When everything is configured correctly:

1. **URL**: `https://your-site.pages.dev`
2. **Shows**: StonkFace header with subtitle
3. **Has**: Dark/light mode toggle
4. **Contains**: Video upload form
5. **Working**: YouTube video embed player

---

## 📞 Need More Help?

1. **Check build logs**: Most issues show up there
2. **Cloudflare Community**: https://community.cloudflare.com/
3. **GitHub Issues**: Report persistent issues
4. **Build locally first**: Always verify it works on `localhost:4173`

---

## 🔄 Nuclear Option: Start Fresh

If nothing works, start with a clean slate:

```bash
# In Cloudflare Dashboard:
1. Delete the Pages project
2. Create new Pages project
3. Connect to GitHub repo again
4. Use exact settings from Step 1
5. Deploy

# In your local repo:
git pull origin main
rm -rf dist/ node_modules/
npm install
npm run build:client
npm run client:start  # Test locally first
```

---

**Remember**: The build succeeds, so your code is fine. It's a configuration issue in Cloudflare Pages settings. Double-check the build output directory! 🎯