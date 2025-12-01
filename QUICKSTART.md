# 🚀 Stonk Face - Quick Start Guide

Get up and running with Stonk Face in 5 minutes!

## 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** v6+ ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/))

## 🎯 Option 1: Quick Start (Recommended)

### 1. Clone & Setup
```bash
cd /home/zachbrenneman/Projects/stonk-face
./dev.sh
```

Select option **1** to set up the project automatically.

### 2. Start Development
Run `./dev.sh` again and select option **4** to start both servers.

**Done!** 🎉
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- API Docs: http://localhost:5000/api/videos

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

## 🛠️ Option 3: Manual Setup

### 1. Start MongoDB
```bash
# Local MongoDB
mongod

# OR with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on **http://localhost:5000**

### 3. Setup Frontend (New Terminal)
```bash
cd project
npm install
npm run dev
```

Frontend runs on **http://localhost:3000**

---

## ✅ Verify Installation

### Test Backend API
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test Frontend
Open browser: http://localhost:3000

You should see the VideoShare interface!

---

## 🎮 Using the Application

### Add Your First Video

1. Go to http://localhost:3000
2. Paste a YouTube URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
3. Enter a title
4. Click "Add Video"
5. Watch it appear in the gallery! 📹

### API Examples

#### Create a Video
```bash
curl -X POST http://localhost:5000/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cool Video",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }'
```

#### Get All Videos
```bash
curl http://localhost:5000/api/videos
```

#### Get Trending Videos
```bash
curl http://localhost:5000/api/videos/trending
```

---

## 🔧 Configuration

### Backend Environment (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stonk-face
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration
Update API endpoint in frontend code if needed (default: http://localhost:5000)

---

## 📊 Database Management

### Using Mongo Express (Docker only)
1. Go to http://localhost:8081
2. Login: `admin` / `admin123`
3. View and manage your videos database

### Using MongoDB Compass
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to: `mongodb://localhost:27017`
3. Browse the `stonk-face` database

### Using MongoDB Shell
```bash
mongosh
use stonk-face
db.videos.find().pretty()
```

---

## 🐛 Troubleshooting

### Port 5000 Already in Use
```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
pgrep mongod

# Start MongoDB
mongod
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues
```bash
# Reset everything
docker-compose down -v
docker-compose up -d --build
```

---

## 📦 Project Structure

```
stonk-face/
├── backend/              # Express API (Port 5000)
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database schemas
│   │   ├── routes/       # API endpoints
│   │   └── server.ts     # Entry point
│   └── package.json
├── project/              # React Frontend (Port 3000)
│   ├── components/       # UI components
│   ├── App.tsx          # Main app
│   └── package.json
└── docker-compose.yml    # Docker setup
```

---

## 🚀 Next Steps

1. ✅ **Add More Videos** - Build your collection
2. 📚 **Read the Docs** - Check [README.md](./README.md) for detailed API docs
3. 🔐 **Add Authentication** - Implement user accounts (coming soon)
4. 🎨 **Customize UI** - Modify React components in `project/components/`
5. 🌐 **Deploy** - See deployment guides in README

---

## 🆘 Need Help?

- **Documentation**: See [README.md](./README.md)
- **GitHub Issues**: Open an issue on GitHub
- **Backend Docs**: See [backend/README.md](./backend/README.md)

---

## 🎯 Common Tasks

### View Logs
```bash
# Backend logs
tail -f backend.log

# Frontend logs
tail -f frontend.log

# Docker logs
docker-compose logs -f
```

### Stop Development Servers
```bash
# If using dev.sh
./dev.sh
# Select option 5

# If using Docker
docker-compose down

# Manual (find PIDs)
lsof -i :5000 -i :3000
kill <PID>
```

### Reset Database
```bash
mongosh
use stonk-face
db.videos.deleteMany({})
```

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd project
npm test
```

---

## 🎉 You're Ready!

Your Stonk Face application is now running! Start sharing your favorite YouTube videos with friends.

**Happy Coding!** 🚀📹

---

**Pro Tip**: Use the `dev.sh` script for the easiest development experience. It handles everything automatically!

```bash
./dev.sh
```
