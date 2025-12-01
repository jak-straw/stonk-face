# ⚡ Cloudflare Pages Quick Deploy

**5-Minute Deployment Guide for StonkFace**

## 🚨 Before You Start

Run the pre-deployment check:
```bash
./pre-deploy-check.sh
```

## 📋 Quick Checklist

- [ ] `.env` is NOT committed to git
- [ ] All changes committed and pushed to GitHub
- [ ] Production build tested locally (`npm run build:client`)
- [ ] No secrets/API keys in code

## 🚀 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Cloudflare deployment"
git push origin main
```

### 2. Cloudflare Pages Setup

1. Go to: https://dash.cloudflare.com/
2. Click: **Pages** → **Create a project** → **Connect to Git**
3. Select your `stonk-face` repository
4. Click: **Begin setup**

### 3. Build Configuration

**Copy these exact settings:**

```
Production branch: main

Framework preset: Vite

Build command: npm run build:client

Build output directory: dist/client

Root directory: (leave empty)

Environment variables:
  NODE_VERSION = 18
```

### 4. Deploy

Click **Save and Deploy** and wait 2-5 minutes.

Your site will be live at: `https://stonk-face-xxx.pages.dev`

## 🎯 What Gets Deployed

- ✅ React frontend (client)
- ✅ All UI components
- ✅ Dark mode theme
- ✅ YouTube video player
- ✅ localStorage (browser-based storage)

## ⚠️ What's NOT Included

- ❌ Backend API (not connected yet)
- ❌ MongoDB database (not needed yet)
- ❌ Server code (frontend only)

**Note:** The app works perfectly without the backend! Videos are stored locally in your browser.

## 🔧 Custom Domain (Optional)

After deployment:

1. Go to your Pages project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter: `stonkface.yourdomain.com`
5. Follow DNS instructions

## 🐛 Troubleshooting

### Build Fails?
```bash
# Check build locally first
npm run build:client

# If it works locally, check:
# 1. Node version is 18+ in Cloudflare settings
# 2. Build command is exactly: npm run build:client
# 3. Output directory is exactly: dist/client
```

### Blank Page?
```bash
# Check build output directory
# Should be: dist/client (not just dist)

# Check browser console for errors
# Verify index.html is in dist/client/
```

### Videos Not Working?
- Clear browser cache
- Check YouTube URLs are valid
- Verify localStorage is enabled

## 📊 Post-Deployment

Test these features:
- [ ] Homepage loads
- [ ] Can add videos
- [ ] Videos play in embed
- [ ] Dark mode toggle works
- [ ] Data persists on refresh

## 🎉 Success!

Your site is live! Share it with:
```
https://stonk-face-xxx.pages.dev
```

## 📚 Next Steps

- [ ] Add custom domain
- [ ] Enable Cloudflare Analytics
- [ ] Set up automatic deployments (already enabled!)
- [ ] Consider backend integration (future)

## 💡 Pro Tips

1. **Automatic Deploys**: Every push to `main` triggers a new deployment
2. **Preview Deploys**: Pull requests get preview URLs automatically
3. **Rollbacks**: Easy rollback to previous deployments in Cloudflare dashboard
4. **Analytics**: Enable Web Analytics for free in Cloudflare settings

## 🆘 Need Help?

- 📖 Full guide: See `DEPLOYMENT.md`
- 🔍 Pre-deploy check: Run `./pre-deploy-check.sh`
- 💬 Cloudflare Community: https://community.cloudflare.com/

---

**Deploy Time:** ~2-5 minutes ⚡  
**Cost:** $0 (Free tier) 💰  
**Difficulty:** Easy 🟢