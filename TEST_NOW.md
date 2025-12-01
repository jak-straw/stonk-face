# 🧪 Test Your Application Now!

## ✅ Everything is installed and ready!

All dependencies have been installed. Now let's test both servers.

---

## 🚀 Start the Application

Open a terminal in the project directory and run:

```bash
cd /home/zachbrenneman/Projects/stonk-face
npm run dev
```

This will start:
- **Backend** on http://localhost:5000
- **Frontend** on http://localhost:3000

---

## 🌐 Test the Frontend

1. Open your browser to: **http://localhost:3000**
2. You should see the **StonkFace** interface
3. Try adding a video:
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Title: `Test Video`
   - Click "Add Video"
4. The video should appear in your gallery!

---

## 🔌 Test the Backend API

Open another terminal and test these commands:

### Health Check
```bash
curl http://localhost:5000/health
```

Expected: `{"success":true,"message":"Server is running",...}`

### Get All Videos
```bash
curl http://localhost:5000/api/videos
```

### Create a Video
```bash
curl -X POST http://localhost:5000/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Awesome Video",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "description": "This is a test video",
    "tags": ["test", "youtube"]
  }'
```

### Get Trending Videos
```bash
curl http://localhost:5000/api/videos/trending
```

---

## 🎉 If Everything Works

You should see:
- ✅ Frontend loading at localhost:3000
- ✅ Backend API responding at localhost:5000
- ✅ Videos can be added and displayed
- ✅ API endpoints return JSON responses

**Congratulations! Your full-stack application is running!** 🚀

---

## 🐛 If Something Doesn't Work

### Frontend Not Loading
- Check if port 3000 is available: `lsof -i :3000`
- Look for errors in the terminal where you ran `npm run dev`
- Try `npm run client:dev` separately

### Backend Not Loading
- Make sure MongoDB is running: `mongod`
- Check if port 5000 is available: `lsof -i :5000`
- Try `npm run server:dev` separately

### MongoDB Issues
```bash
# Start MongoDB
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## 📊 What You're Seeing

When you access http://localhost:3000, you should see:
- A header with "StonkFace" and YouTube icon
- A form to add videos (left side)
- A video player area (right side)
- A video gallery showing all your videos

When you call the API at http://localhost:5000, you get JSON responses with video data.

---

## 🎮 Next Steps

Once everything is working:
1. ✅ Add more videos
2. ✅ Test the search functionality
3. ✅ Try the like and view count features
4. ✅ Start building new features!

Check out `NEXT_STEPS.md` for ideas on what to build next.

---

**Happy coding! Your application is live!** 🎥✨