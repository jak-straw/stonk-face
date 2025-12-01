# 🚀 Stonk Face - Quick Start Guide

Get up and running with Stonk Face in 5 minutes!

## 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** v6+ ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/))

## 🎯 Option 1: Quick Start (Recommended)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/stonk-face.git
cd stonk-face
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env if needed (default settings work for local development)
```

### 3. Start MongoDB
```bash
# Local MongoDB
mongod

# OR with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Start Development
```bash
npm run dev
```

**Done!** 🎉
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

---

## 🐳 Option 2: Docker (Easiest)

### Start Everything with One Command
```bash
docker-compose up -d
```

This starts:
- **MongoDB** on port 27017
- **Backend API** on http://localhost:5000
- **Mongo Express** (DB Admin) on http://localhost:8081

### Stop Everything
```bash
docker-compose down
```

---

## 🛠️ Option 3: Manual Setup (Step by Step)

### 1. Start MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: Docker MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Option C: MongoDB Atlas (Cloud)
# Get connection string from https://www.mongodb.com/cloud/atlas
# Update MONGODB_URI in .env
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stonk-face
CORS_ORIGIN=http://localhost:3000
VITE_API_URL=http://localhost:5000
```

### 4. Start Backend (Terminal 1)
```bash
npm run server:dev
```

Server runs on **http://localhost:5000**

### 5. Start Frontend (Terminal 2)
```bash
npm run client:dev
```

Frontend runs on **http://localhost:3000**

---

## ✅ Verify Installation

### Test Backend API
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### Test Frontend
Open browser: **http://localhost:3000**

You should see the VideoShare interface! ✨

---

## 🎮 Using the Application

### Add Your First Video

1. Go to **http://localhost:3000**
2. Paste a YouTube URL:
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. Enter a title: `My First Video`
4. Click **"Add Video"**
5. Watch it appear in the gallery! 📹

### API Examples

#### Create a Video
```bash
curl -X POST http://localhost:5000/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cool Video",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "description": "This is an awesome video!",
    "tags": ["music", "fun"]
  }'
```

#### Get All Videos
```bash
curl http://localhost:5000/api/videos
```

#### Get Trending Videos
```bash
curl http://localhost:5000/api/videos/trending?limit=5
```

#### Search Videos
```bash
curl "http://localhost:5000/api/videos?search=music&limit=10"
```

---

## 📜 Available Commands

```bash
# Development
npm run dev              # Start both frontend & backend
npm run client:dev       # Start frontend only (port 3000)
npm run server:dev       # Start backend only (port 5000)

# Production Build
npm run build            # Build both client & server
npm run build:client     # Build frontend
npm run build:server     # Build backend

# Production Start
npm start                # Start production server

# Code Quality
npm run lint             # Check code quality
npm run lint:fix         # Fix linting issues
npm run type-check       # Check TypeScript types
npm test                 # Run tests
```

---

## 📊 Database Management

### Using Mongo Express (Docker Setup)
1. Go to **http://localhost:8081**
2. Login:
   - Username: `admin`
   - Password: `admin123`
3. Browse the `stonk-face` database
4. View and manage video documents

### Using MongoDB Compass
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to: `mongodb://localhost:27017`
3. Select `stonk-face` database
4. Browse the `videos` collection

### Using MongoDB Shell
```bash
mongosh

use stonk-face
db.videos.find().pretty()
db.videos.countDocuments()
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/stonk-face` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:3000` |
| `VITE_API_URL` | Backend API URL (frontend) | `http://localhost:5000` |

### Vite Dev Server

The Vite dev server automatically proxies `/api` requests to the backend server.

Frontend port: **3000**  
Backend port: **5000**

---

## 🐛 Troubleshooting

### Port 5000 Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Port 3000 Already in Use
```bash
# Vite will automatically try next available port
# Or specify port in vite.config.ts
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
pgrep mongod

# If not running, start it
mongod

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log
```

### "Cannot find module" Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types
npm run type-check

# Rebuild
npm run build
```

### Docker Issues
```bash
# Reset everything
docker-compose down -v
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check running containers
docker ps
```

### Frontend Not Loading
```bash
# Clear browser cache
# Check console for errors (F12)
# Verify backend is running: curl http://localhost:5000/health
```

### CORS Errors
```bash
# Verify CORS_ORIGIN in .env matches frontend URL
# Restart backend server after changing .env
```

---

## 📦 Project Structure

```
stonk-face/
├── client/              # React Frontend (Vite)
│   ├── components/      # React components
│   ├── styles/          # CSS files
│   ├── App.tsx          # Main app
│   ├── main.tsx         # Entry point
│   └── index.html       # HTML template
├── server/              # Express Backend
│   └── src/
│       ├── controllers/ # Route handlers
│       ├── models/      # MongoDB schemas
│       ├── routes/      # API routes
│       ├── middleware/  # Express middleware
│       ├── utils/       # Helper functions
│       ├── app.ts       # Express config
│       └── server.ts    # Server start
├── dist/                # Build output
├── node_modules/        # Dependencies
├── package.json         # Project config
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
├── .env                 # Environment variables
└── docker-compose.yml   # Docker setup
```

---

## 🚀 Next Steps

1. ✅ **Explore the API** - Try different endpoints
2. 📚 **Read Documentation** - Check [README.md](./README.md)
3. 🎨 **Customize UI** - Modify components in `client/components/`
4. 🔐 **Add Features** - Implement authentication, comments, etc.
5. 🌐 **Deploy** - See deployment guides in README
6. 🧪 **Write Tests** - Add test coverage

---

## 🎯 Common Tasks

### View Logs
```bash
# If using npm run dev
# Logs show in terminal

# If using Docker
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Stop Development Servers
```bash
# Press Ctrl+C in terminal where servers are running

# Or kill processes
pkill -f "tsx watch"
pkill -f "vite"
```

### Reset Database
```bash
mongosh
use stonk-face
db.videos.deleteMany({})  # Delete all videos
db.dropDatabase()         # Delete entire database
```

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Add New npm Package
```bash
# Install and save to dependencies
npm install package-name

# Install and save to devDependencies
npm install -D package-name
```

---

## 📚 Useful Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Express Docs**: https://expressjs.com/
- **MongoDB Docs**: https://www.mongodb.com/docs/
- **Mongoose Docs**: https://mongoosejs.com/docs/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

---

## 🆘 Need Help?

- **Issues**: [Open GitHub Issue](https://github.com/YOUR_USERNAME/stonk-face/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/stonk-face/discussions)
- **Documentation**: See [README.md](./README.md)

---

## 🎉 You're Ready!

Your Stonk Face application is now running! 

**Start sharing your favorite YouTube videos!** 🚀📹

---

**Pro Tip**: Keep the backend and frontend running in separate terminal windows so you can see logs from both simultaneously!

**Happy Coding!** 🎉