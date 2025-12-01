# 🔧 How to Check Your Cloudflare Pages Build Settings

## Step-by-Step Guide with Screenshots

---

## 📍 Step 1: Access Your Cloudflare Dashboard

1. Go to: **https://dash.cloudflare.com/**
2. Log in with your Cloudflare account
3. You should see the Cloudflare dashboard home page

---

## 📍 Step 2: Navigate to Pages

Look at the left sidebar:

```
☰ Menu
├── 🏠 Home
├── 🌐 Websites
├── 📊 Analytics & Logs
├── 🔒 Security
├── ⚡ Speed
├── 📄 Pages          ← CLICK HERE
├── 🔧 Workers & Pages
└── ...
```

Click on **"Pages"** in the left sidebar.

---

## 📍 Step 3: Find Your Project

You should see a list of your Pages projects.

Look for your project named something like:
- `stonk-face`
- `stonk-face-xxx`
- Or whatever name you gave it

```
┌─────────────────────────────────────────────────┐
│  Pages Projects                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  📄 stonk-face                    Production     │
│     stonk-face-xxx.pages.dev                    │
│     Connected to jak-straw/stonk-face           │
│     Last deployed: 5 minutes ago                │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Click on your project name** to open it.

---

## 📍 Step 4: Open Settings

At the top of your project page, you'll see tabs:

```
┌──────────────────────────────────────────────────┐
│  Deployments  |  Settings  |  Analytics  |  ...  │
└──────────────────────────────────────────────────┘
```

**Click on "Settings"** tab.

---

## 📍 Step 5: Navigate to Build Settings

In the Settings page, look at the left sidebar or scroll down to find:

```
Settings Menu:
├── General
├── Builds & deployments    ← CLICK HERE
├── Environment variables
├── Functions
├── Custom domains
└── ...
```

**Click on "Builds & deployments"**

---

## 📍 Step 6: View Build Configuration

You should now see the "Build configuration" section:

```
┌─────────────────────────────────────────────────────────┐
│  Build configuration                      [Edit] button  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Production branch: main                                 │
│                                                          │
│  Build settings                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ Framework preset: Vite                         │    │
│  │                                                 │    │
│  │ Build command:                                  │    │
│  │ npm run build:client                            │    │
│  │                                                 │    │
│  │ Build output directory:                         │    │
│  │ dist/client              ← THIS IS THE KEY!     │    │
│  │                                                 │    │
│  │ Root directory (Path to project):               │    │
│  │ (Not set)                                       │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 CRITICAL: Check Build Output Directory

Look at the **"Build output directory"** field.

### ✅ CORRECT Settings:
```
Build command: npm run build:client
Build output directory: dist/client
```

### ❌ WRONG Settings (Common Mistakes):

```
❌ dist/             (missing "client")
❌ client/           (missing "dist")
❌ /dist/client/     (leading slash)
❌ dist/client/      (trailing slash)
❌ build/            (wrong directory name)
❌ dist              (missing "client")
❌ ./dist/client     (dot slash)
```

---

## 📝 Step 7: Edit Configuration (If Wrong)

If the build output directory is NOT exactly `dist/client`:

1. **Click the "Edit configuration" button** (top right of Build configuration section)

2. You'll see editable fields:
   ```
   Framework preset: [Dropdown] → Select "Vite" or "None"
   
   Build command: [Text field]
   npm run build:client
   
   Build output directory: [Text field]
   dist/client          ← TYPE THIS EXACTLY
   
   Root directory: [Text field]
   (leave blank or enter "/")
   ```

3. **Type exactly**: `dist/client`
   - No leading slash: `/`
   - No trailing slash: `/`
   - No spaces
   - Case-sensitive: lowercase

4. **Click "Save"** button at the bottom

---

## 🔄 Step 8: Retry Deployment

After saving the correct settings:

1. Go back to the **"Deployments"** tab at the top

2. Find your latest deployment in the list

3. Look for the three dots menu (⋮) on the right side of the deployment

4. Click the menu and select **"Retry deployment"**

5. Wait 2-3 minutes for the build to complete

---

## ✅ Step 9: Verify Build Succeeded

Once the deployment completes:

1. Check the deployment status shows **"Success"** (green checkmark ✓)

2. Click on the deployment to see build logs

3. Look for these lines in the logs:
   ```
   ✓ 1266 modules transformed.
   ../dist/client/index.html
   ../dist/client/assets/index-*.css
   ../dist/client/assets/index-*.js
   ✓ built in ~2s
   Success: Build command completed
   ```

---

## 🔍 Step 10: Test the Deployment

Visit these URLs to verify (replace `your-site` with your actual URL):

### Test 1: Verification File
```
https://your-site.pages.dev/BUILD_VERIFICATION_DO_NOT_DELETE.txt
```
**Should show:** Long text file with deployment info

### Test 2: Test Page
```
https://your-site.pages.dev/test.html
```
**Should show:** Purple gradient page saying "StonkFace is HERE!"

### Test 3: Homepage
```
https://your-site.pages.dev/
```
**Should show:** StonkFace application with video upload form

---

## 🆘 Still Showing "Hello World"?

If you've updated the settings correctly and it still shows "hello world":

### Check for Multiple Projects

1. Go back to **Pages** in the left sidebar
2. Do you see MORE than one project?
3. Are you viewing the CORRECT project?

```
┌─────────────────────────────────────────────────┐
│  Pages Projects                                  │
├─────────────────────────────────────────────────┤
│  📄 stonk-face-test      ← Old test project?    │
│  📄 stonk-face           ← Your real project     │
│  📄 my-old-site          ← Unrelated project     │
└─────────────────────────────────────────────────┘
```

**Solution:**
- Delete old test projects
- Make sure you're viewing the correct project URL

### Check Environment Variables

While in Settings → Builds & deployments, scroll down to find:

```
┌─────────────────────────────────────────────────┐
│  Environment variables (Build)                   │
├─────────────────────────────────────────────────┤
│  Variable name       Value                       │
│  NODE_VERSION        18                          │
└─────────────────────────────────────────────────┘
```

**Make sure you have:**
- `NODE_VERSION` = `18`

**To add if missing:**
1. Click "Add variable"
2. Variable name: `NODE_VERSION`
3. Value: `18`
4. Click "Save"
5. Retry deployment

---

## 📸 Visual Reference

Your correct settings should look like this:

```
╔════════════════════════════════════════════════════╗
║  Build configuration                               ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  Production branch                                 ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ main                                         │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  Framework preset                                  ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ Vite                                     ▼   │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  Build command                                     ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ npm run build:client                         │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  Build output directory                            ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ dist/client                                  │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
║  Root directory (advanced)                         ║
║  ┌──────────────────────────────────────────────┐ ║
║  │                                              │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

---

## 🎯 Quick Checklist

Before you leave the settings page, verify:

- [ ] Build command is: `npm run build:client`
- [ ] Build output directory is: `dist/client` (exactly)
- [ ] Root directory is: blank or "/"
- [ ] NODE_VERSION environment variable is: 18
- [ ] Production branch is: main
- [ ] Framework preset is: Vite (or None)

If all checkboxes are ticked, click "Save" and retry deployment.

---

## 💡 Pro Tips

1. **Copy-Paste**: Instead of typing `dist/client`, copy it from here to avoid typos

2. **Case Matters**: Linux is case-sensitive. Must be lowercase: `dist/client`

3. **No Extra Spaces**: Don't add spaces before or after `dist/client`

4. **Clear Cache**: After deploying, do a hard refresh (Ctrl+Shift+R) in your browser

5. **Check URL**: Make sure you're viewing `yourproject.pages.dev` not a different project

---

## 🔗 Where to Find Your Site URL

Your site URL is shown in several places:

1. **On the project dashboard** (after clicking your project):
   ```
   Visit site: https://stonk-face-xxx.pages.dev →
   ```

2. **In the deployments list**, each deployment shows its URL

3. **In Settings → Custom domains**, your default `.pages.dev` domain is listed

Make sure you're visiting the correct URL!

---

## ✅ Success Indicators

When everything is configured correctly:

1. ✅ Build logs show "Success"
2. ✅ No errors in build logs
3. ✅ `/BUILD_VERIFICATION_DO_NOT_DELETE.txt` loads
4. ✅ `/test.html` shows purple page
5. ✅ `/` shows StonkFace application
6. ✅ No "hello world" anywhere

---

**You've got this! Follow the steps carefully and you'll get it working.** 🚀

Need more help? See `CLOUDFLARE_TROUBLESHOOTING.md` for additional debugging steps.