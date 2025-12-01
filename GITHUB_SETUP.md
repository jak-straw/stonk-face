# GitHub Repository Setup Instructions

## 🚀 Quick Setup

Follow these steps to create and push your Stonk Face project to GitHub:

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Fill in the repository details:
   - **Repository name**: `stonk-face`
   - **Description**: `A modern video sharing application for YouTube videos, built with React and Node.js/Express backend`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Step 2: Push to GitHub

After creating the repository on GitHub, run these commands in your terminal:

```bash
# Navigate to your project directory
cd /home/zachbrenneman/Projects/stonk-face

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/stonk-face.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git push -u origin main
```

### Alternative: Using SSH

If you prefer SSH (recommended for better security):

```bash
# Add remote using SSH
git remote add origin git@github.com:YOUR_USERNAME/stonk-face.git

# Push to GitHub
git push -u origin main
```

## 📝 What's Already Done

✅ **Local Git Repository** - Initialized and committed
✅ **Project Structure** - Backend and frontend organized
✅ **.gitignore** - Configured to exclude node_modules, .env, etc.
✅ **README.md** - Comprehensive documentation
✅ **Initial Commit** - All files committed with message: "Initial commit: Add backend API and frontend project structure"

## 🎯 Next Steps After Pushing

### 1. Add Repository Topics (Optional)
On your GitHub repository page, click "Add topics" and add:
- `nodejs`
- `express`
- `typescript`
- `react`
- `mongodb`
- `youtube`
- `video-sharing`
- `rest-api`

### 2. Enable GitHub Actions (Optional)
You can set up CI/CD workflows for:
- Running tests
- Linting code
- Building and deploying

### 3. Set Up Branch Protection (Recommended)
- Go to Settings → Branches
- Add rule for `main` branch
- Require pull request reviews
- Require status checks to pass

### 4. Add Collaborators (Optional)
- Go to Settings → Collaborators
- Invite team members

## 🔐 Environment Variables on Deployment

Remember to set these environment variables when deploying:

### Backend
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend
```
REACT_APP_API_URL=https://your-backend-domain.com
```

## 📦 Repository Structure

Your repository now contains:

```
stonk-face/
├── .git/                 # Git repository
├── .gitignore           # Git ignore rules
├── README.md            # Main documentation
├── GITHUB_SETUP.md      # This file
├── backend/             # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── project/             # React frontend
    ├── components/
    ├── styles/
    ├── App.tsx
    └── ...
```

## 🐛 Troubleshooting

### Issue: Remote already exists
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/stonk-face.git
```

### Issue: Authentication failed
```bash
# Use GitHub CLI (recommended)
gh auth login

# Or use Personal Access Token
# Go to GitHub Settings → Developer settings → Personal access tokens
# Create token with 'repo' scope
```

### Issue: Push rejected
```bash
# If you accidentally initialized with README on GitHub
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## 📚 Additional Resources

- [GitHub Docs - Adding an existing project](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
- [GitHub Docs - Managing remote repositories](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)
- [GitHub CLI](https://cli.github.com/)

## ✅ Verification

After pushing, verify everything is on GitHub:

1. Visit: `https://github.com/YOUR_USERNAME/stonk-face`
2. Check that all files are visible
3. Check that README.md displays correctly
4. Verify both `backend/` and `project/` directories are present

---

**🎉 Congratulations!** Your Stonk Face project is now on GitHub and ready to share with the world!