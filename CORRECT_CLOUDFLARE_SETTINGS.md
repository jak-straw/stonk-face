# ✅ CORRECT Cloudflare Pages Settings for StonkFace

## 🎯 The Exact Settings You Need

Based on official Cloudflare Pages documentation and our monorepo structure, here are the **EXACT** settings:

---

## 📋 Build Configuration

Go to: **Cloudflare Dashboard** → **Pages** → **Your Project** → **Settings** → **Builds & deployments**

### Framework Preset
```
Vite
```
(or select "None" if Vite isn't available)

### Build Command
```
npm run build:client
```

### Build Output Directory
```
dist/client
```

### Root Directory
```
(leave blank)
```
or
```
/
```

---

## 🔧 Environment Variables

Go to: **Settings** → **Environment variables** → **Production** → **Add variable**

Add this variable:

| Variable Name | Value |
|---------------|-------|
| `NODE_VERSION` | `18` |

---

## ⚠️ CRITICAL: Why Our Setup is Different

### Standard Vite Project:
- Build command: `npm run build`
- Build output: `dist`
- Structure: Single project in repo root

### Our StonkFace Project (Monorepo):
- Build command: `npm run build:client` ← Custom script for client only
- Build output: `dist/client` ← Nested output directory
- Structure: Client and server in separate directories

```
stonk-face/
├── client/          ← React app source
├── server/          ← Express API source
└── dist/
    ├── client/      ← Frontend build output (THIS is what Cloudflare needs!)
    └── server/      ← Backend build output (not used for Pages)
```

---

## 🚫 Common Mistakes

### ❌ WRONG Settings:

| Setting | Wrong Value | Why It's Wrong |
|---------|-------------|----------------|
| Build command | `npm run build` | Builds both client AND server (unnecessary) |
| Build output | `dist` | Points to parent directory, not the client build |
| Build output | `dist/` | Trailing slash can cause issues |
| Build output | `/dist/client` | Leading slash is incorrect |
| Build output | `client` | Points to source, not build output |
| Build output | `build` | Wrong directory name (we use `dist`) |

### ✅ CORRECT Settings:

| Setting | Correct Value | Why It's Right |
|---------|---------------|----------------|
| Build command | `npm run build:client` | Builds only the frontend (faster, cleaner) |
| Build output | `dist/client` | Exact location of built files |
| Root directory | (blank) | Project is at repo root |
| NODE_VERSION | `18` | Ensures compatible Node.js version |

---

## 🔍 How to Verify Settings Are Correct

After saving settings and deploying, check these URLs:

### Test 1: Verification File
```
https://your-site.pages.dev/BUILD_VERIFICATION_DO_NOT_DELETE.txt
```
**Expected:** Shows deployment info text  
**If 404:** Build output directory is WRONG

### Test 2: Test Page
```
https://your-site.pages.dev/test.html
```
**Expected:** Purple gradient page with "StonkFace is HERE!"  
**If 404:** Build output directory is WRONG

### Test 3: Homepage
```
https://your-site.pages.dev/
```
**Expected:** StonkFace application with video form  
**If "hello world":** Either wrong project OR wrong build output directory

---

## 📊 What Happens During Build

When Cloudflare builds your project, here's the exact sequence:

1. **Clone repository** from GitHub
2. **Install dependencies**: `npm install`
3. **Set NODE_VERSION** to 18
4. **Run build command**: `npm run build:client`
5. **Vite builds** the React app
6. **Output goes to**: `dist/client/`
7. **Cloudflare looks in**: Build output directory setting
8. **Finds files**:
   - `dist/client/index.html`
   - `dist/client/assets/*.js`
   - `dist/client/assets/*.css`
   - `dist/client/BUILD_VERIFICATION_DO_NOT_DELETE.txt`
   - `dist/client/test.html`
   - `dist/client/_redirects`
9. **Deploys to CDN**

---

## 🎯 Complete Settings Checklist

Before clicking "Save", verify ALL of these:

- [ ] Build command is exactly: `npm run build:client`
- [ ] Build output directory is exactly: `dist/client`
- [ ] No leading slash: `/dist/client` ❌
- [ ] No trailing slash: `dist/client/` ❌
- [ ] Root directory is blank or `/`
- [ ] Production branch is: `main`
- [ ] Framework preset is: Vite (or None)
- [ ] NODE_VERSION environment variable is: `18`

---

## 🔄 After Changing Settings

1. **Click "Save"** in build settings
2. **Go to "Deployments"** tab
3. **Find latest deployment**
4. **Click three dots (⋮)** menu
5. **Select "Retry deployment"**
6. **Wait 2-3 minutes** for build
7. **Check the verification URLs** above

---

## 📝 Build Logs - What to Look For

Successful build shows:

```
Installing dependencies...
✓ Dependencies installed

Running build command: npm run build:client
> stonk-face@1.0.0 build:client
> vite build

vite v5.4.21 building for production...
✓ 1266 modules transformed.
../dist/client/index.html                   0.77 kB
../dist/client/assets/index-GMOGc-Xw.css   64.54 kB
../dist/client/assets/index-C3faLFOg.js   176.72 kB
✓ built in 2.40s

Success: Build command completed
Uploading... (dist/client)
Success: Assets uploaded
Success: Deployment complete
```

---

## 🆘 Still Not Working?

If you've set everything correctly and it's still not working:

### Check for Multiple Projects

1. Go to **Pages** in sidebar
2. Do you see multiple projects?
3. Delete any old/test projects
4. Make sure you're viewing the correct project URL

### Verify You're Editing the Right Project

1. Check the project name at top of page
2. Check the connected repository: `jak-straw/stonk-face`
3. Check the project URL matches what you're visiting

### Nuclear Option - Start Fresh

1. **Delete the Pages project** (Settings → Delete project)
2. **Create new Pages project**
3. **Connect to GitHub**: `jak-straw/stonk-face`
4. **Use exact settings** from this document
5. **Deploy**
6. **Test verification URLs**

---

## 💡 Why "dist/client" Specifically?

Our `vite.config.ts` file contains:

```typescript
export default defineConfig({
  root: "client",           // Source is in client/ directory
  build: {
    outDir: "../dist/client", // Output goes to dist/client/
    emptyOutDir: true,
  },
});
```

This means Vite ALWAYS outputs to `dist/client/`, not just `dist/`.

Cloudflare needs to know the EXACT path to the built files, which is `dist/client/`.

---

## 🎉 Success Criteria

You know it's working when:

1. ✅ Build completes with "Success" status
2. ✅ `/BUILD_VERIFICATION_DO_NOT_DELETE.txt` loads
3. ✅ `/test.html` shows purple page
4. ✅ `/` shows StonkFace application
5. ✅ Dark mode toggle works
6. ✅ Can add videos
7. ✅ Videos persist on refresh
8. ✅ NO "hello world" anywhere

---

**Copy these exact settings into Cloudflare Pages and your deployment will work!** 🚀