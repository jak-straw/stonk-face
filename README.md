# Stonk Face 🎥

A modern video sharing application for YouTube videos, built with React and Node.js.

## 📁 Project Structure

```
stonk-face/
├── backend/          # Node.js/Express API server
├── project/          # React frontend application
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

The backend API will start on `http://localhost:5000`

### Frontend Setup

```bash
cd project
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🎯 Features

### Current Features
- **Video Management** - Add, view, and manage YouTube videos
- **Video Gallery** - Browse all shared videos
- **Video Player** - Embedded YouTube player
- **Search & Filter** - Find videos by title, description, or tags
- **Trending Videos** - See most popular videos
- **View Counter** - Track video views
- **Like System** - Like your favorite videos

### Planned Features
- User authentication
- User profiles
- Comments and discussions
- Video playlists
- Social sharing
- Real-time notifications

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Express Validator** - Request validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Lucide React** - Icon library
- **LocalStorage** - Client-side data persistence

## 📚 Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Documentation](./project/README.md)

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd project
npm test
```

### Building for Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd project
npm run build
```

## 🗄️ Database

The application uses MongoDB to store video metadata. Make sure MongoDB is running before starting the backend server.

### Local MongoDB
```bash
mongod
```

### Docker MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### MongoDB Atlas (Cloud)
Update the `MONGODB_URI` in your `.env` file with your Atlas connection string.

## 🌐 API Endpoints

### Videos
- `GET /api/videos` - Get all videos (with pagination)
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Create new video
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video
- `POST /api/videos/:id/view` - Increment view count
- `POST /api/videos/:id/like` - Like video
- `GET /api/videos/trending` - Get trending videos

### Health Check
- `GET /health` - Server health check

## 🔒 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stonk-face
CORS_ORIGIN=http://localhost:3000
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### CORS Issues
- Verify `CORS_ORIGIN` in backend `.env`
- Check frontend URL matches CORS configuration

## 🚀 Deployment

### Backend Deployment Options
- **Heroku** - Easy deployment with MongoDB Atlas
- **Railway** - Simple deployment with built-in MongoDB
- **DigitalOcean** - VPS with PM2
- **AWS EC2** - Full control over infrastructure
- **Docker** - Containerized deployment

### Frontend Deployment Options
- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting
- **AWS S3 + CloudFront** - Scalable static hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- YouTube API for video embedding
- MongoDB for database
- Express.js community
- React community

## 📞 Support

For questions and support:
- Open an issue on GitHub
- Email: support@stonkface.com
- Discord: [Join our community]

---

Built with ❤️ by the Stonk Face team