# 🚀 Cloudflare Deployment Guide for StonkFace

This guide will help you deploy the StonkFace application to Cloudflare Pages (frontend) and prepare the backend for deployment.

## 📋 Pre-Deployment Checklist

### ✅ Before Linking Your GitHub Repo

1. **Environment Variables Protection** ✅
   - `.env` is in `.gitignore` (already configured)
   - Never commit `.env` files to GitHub
   - Use `.env.example` as a template

2. **Sensitive Data Check** 🔍
   ```bash
   # Check for accidentally committed secrets
   git log --all --full-history -- .env
   
   # Search for potential API keys or passwords
   git grep -i "password\|api_key\|secret" -- ':!*.md' ':!.env.example'
   ```

3. **Build Configuration** ⚙️
   - Verify `package.json` scripts are correct
   - Test production build locally
   - Ensure dependencies are properly listed

4. **Database Considerations** 💾
   - The current app uses **localStorage** (client-side only)
   - Backend MongoDB connection exists but isn't used by the frontend yet
   - For production: Consider MongoDB Atlas or other cloud database

## 🌐 Current Architecture

### Frontend (Client)
- **Technology**: React + TypeScript + Vite
- **Storage**: localStorage (browser-based)
- **Port**: 3000 (development)
- **Build Output**: `dist/client/`

### Backend (Server)
- **Technology**: Node.js + Express + MongoDB
- **Port**: 5000 (development)
- **Build Output**: `dist/server/`
- **Status**: ⚠️ **Currently NOT connected to frontend**

### Important Note
The frontend is currently **standalone** and uses localStorage. The backend API exists but isn't being called by the frontend yet. This means you can deploy the frontend independently without setting up the backend immediately.

## 📦 Deployment Options

### Option 1: Frontend Only (Recommended for Quick Start)

Deploy just the React frontend to Cloudflare Pages. Videos will be stored in the browser's localStorage.

**Pros:**
- Simple and fast deployment
- No database setup needed
- Works immediately

**Cons:**
- Data is local to each browser
- No sharing between devices
- Data lost if browser cache cleared

### Option 2: Full Stack (Future)

Deploy frontend to Cloudflare Pages and backend to a separate service (Heroku, Railway, Render, etc.)

**Pros:**
- Centralized data storage
- Multi-device access
- Scalable architecture

**Cons:**
- Requires database setup (MongoDB Atlas)
- More configuration needed
- Additional costs possible

## 🎯 Cloudflare Pages Deployment (Frontend)

### Step 1: Prepare Your Repository

1. **Ensure clean git status:**
   ```bash
   git status
   git add .
   git commit -m "Prepare for Cloudflare deployment"
   git push origin main
   ```

2. **Verify .gitignore includes:**
   ```
   node_modules/
   dist/
   .env
   .env.local
   .env.production.local
   ```

### Step 2: Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your GitHub repository: `stonk-face`
5. Click **Begin setup**

### Step 3: Configure Build Settings

Use these exact settings:

```yaml
Production branch: main

Build settings:
  Framework preset: Vite
  Build command: npm run build:client
  Build output directory: dist/client
  Root directory: (leave empty)

Environment variables:
  NODE_VERSION: 18
```

### Step 4: Advanced Settings (Optional)

If you want to prepare for future backend integration:

```bash
# Add these environment variables in Cloudflare Pages settings:
NODE_ENV=production
VITE_API_URL=https://your-backend-api.com  # Set this when backend is deployed
```

### Step 5: Deploy

1. Click **Save and Deploy**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://stonk-face-xxx.pages.dev`

### Step 6: Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `stonkface.yourdomain.com`)
4. Follow DNS configuration instructions

## 🔧 Production Optimizations

### 1. Update Vite Config for Production

The current `vite.config.ts` is configured for development. Consider adding:

```typescript
// vite.config.ts additions for production
export default defineConfig({
  // ... existing config
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
    sourcemap: false, // Disable source maps in production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot']
        }
      }
    }
  }
});
```

### 2. Add Production Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "build:prod": "NODE_ENV=production npm run build:client",
    "preview": "vite preview"
  }
}
```

### 3. Test Production Build Locally

Before deploying, test the production build:

```bash
# Build for production
npm run build:client

# Preview the production build
npm run client:start

# Open http://localhost:4173
```

## 🔐 Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] No API keys or secrets in code
- [ ] All sensitive configs use environment variables
- [ ] CORS configured properly (if backend connected)
- [ ] Helmet.js enabled for security headers
- [ ] Rate limiting configured (backend)

## 🗄️ Database Setup (For Future Backend Integration)

### MongoDB Atlas Setup

1. **Create Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster:**
   - Create a new cluster (M0 Free Tier)
   - Choose a region close to your users
   - Wait for cluster to deploy (~5 minutes)

3. **Configure Access:**
   - Database Access: Create a database user
   - Network Access: Add IP `0.0.0.0/0` (allow from anywhere)
   - ⚠️ For production, restrict to specific IPs

4. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/stonk-face`

5. **Add to Environment Variables:**
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stonk-face?retryWrites=true&w=majority
   ```

## 🔄 Connecting Frontend to Backend (Future)

When you're ready to connect the frontend to the backend:

### 1. Update Client Code

Replace localStorage logic in `client/App.tsx` with API calls:

```typescript
// Example: Fetch videos from API
const fetchVideos = async () => {
  const response = await fetch('/api/videos');
  const data = await response.json();
  setVideos(data.data);
};

// Example: Add video via API
const handleAddVideo = async (url: string, title: string) => {
  const response = await fetch('/api/videos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, title })
  });
  const data = await response.json();
  // Update state with new video
};
```

### 2. Update Environment Variables

In Cloudflare Pages, add:

```bash
VITE_API_URL=https://your-backend-domain.com
```

### 3. Backend Deployment Options

Deploy backend to one of these services:

- **Railway**: Easy Node.js deployment
- **Render**: Free tier available
- **Heroku**: Classic choice (paid)
- **Fly.io**: Edge deployment
- **Cloudflare Workers**: Keep everything in Cloudflare

## 📊 Monitoring & Analytics

### Add Analytics to Cloudflare Pages

1. Enable **Web Analytics** in Cloudflare dashboard
2. Add the analytics script to `client/index.html`:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "your-token-here"}'></script>
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Common issues:
1. Check Node version (needs 18+)
2. Clear cache: rm -rf node_modules dist && npm install
3. Verify all dependencies in package.json
4. Check build command in Cloudflare settings
```

### "Cannot find module" errors

```bash
# Ensure all imports use correct paths
# TypeScript path aliases should resolve correctly
# Check tsconfig.json paths configuration
```

### Videos not loading

```bash
# Check browser console for errors
# Verify YouTube embed URLs are correct
# Ensure localStorage is enabled in browser
```

### Dark mode not persisting

```bash
# Check localStorage is available
# Verify theme-provider is wrapping the app
# Clear browser cache and reload
```

## 🚀 Post-Deployment

1. **Test Everything:**
   - [ ] Homepage loads correctly
   - [ ] Can add videos
   - [ ] Videos display properly
   - [ ] YouTube embeds work
   - [ ] Dark mode toggle works
   - [ ] Theme persists on refresh

2. **Share Your Site:**
   - Update README.md with live URL
   - Share with users for feedback

3. **Monitor Performance:**
   - Check Cloudflare Analytics
   - Monitor build times
   - Watch for errors in console

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [React Production Build](https://react.dev/learn/start-a-new-react-project)

## 🎉 Next Steps

After successful deployment:

1. Set up custom domain
2. Enable Cloudflare Analytics
3. Consider implementing backend API
4. Add user authentication
5. Implement video comments
6. Add social sharing features
7. Set up CI/CD for automatic deployments

---

**Need Help?** 
- Check the [Cloudflare Community](https://community.cloudflare.com/)
- Review deployment logs in Cloudflare dashboard
- Ensure all prerequisites are met

**Good luck with your deployment! 🎬✨**