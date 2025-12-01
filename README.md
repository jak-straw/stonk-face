# Stonk Face 🎥

A modern, full-stack video sharing application for YouTube videos, built with React, Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **Video Management** - Add, view, edit, and delete YouTube videos
- **Video Gallery** - Browse all shared videos in a beautiful gallery
- **Embedded Player** - Watch videos directly in the app
- **Search & Filter** - Find videos by title, description, or tags
- **Trending Videos** - See most popular videos
- **View Counter** - Track video views
- **Like System** - Like your favorite videos
- **RESTful API** - Full-featured backend API
- **Type Safety** - TypeScript on both frontend and backend

## 📁 Project Structure

```
stonk-face/
├── client/              # React frontend (Vite)
│   ├── components/      # UI components
│   ├── styles/          # CSS styles
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.html       # HTML template
├── server/              # Express backend
│   └── src/
│       ├── controllers/ # Business logic
│       ├── models/      # MongoDB schemas
│       ├── routes/      # API endpoints
│       ├── middleware/  # Custom middleware
│       ├── utils/       # Helper functions
│       ├── app.ts       # Express app setup
│       └── server.ts    # Server entry point
├── dist/                # Compiled output
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript config (root)
├── vite.config.ts       # Vite config
└── docker-compose.yml   # Docker setup
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### DevOps
- **Docker** - Containerization
- **Concurrently** - Run multiple processes
- **ESLint** - Code linting

## 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** v6+ ([Download](https://www.mongodb.com/try/download/community))
- **npm** or **yarn**
- **Git**

## 🚀 Quick Start

### Option 1: Standard Setup (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/stonk-face.git
cd stonk-face
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB**
```bash
# Local MongoDB
mongod

# OR with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. **Start development servers**
```bash
npm run dev
```

This starts both frontend (port 3000) and backend (port 5000) simultaneously!

**Access the app:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

### Option 2: Docker (Easiest)

```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend API on port 5000
- Mongo Express (DB Admin) on port 8081

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start both client and server
npm run client:dev       # Start frontend only (port 3000)
npm run server:dev       # Start backend only (port 5000)

# Production Build
npm run build            # Build both client and server
npm run build:client     # Build frontend only
npm run build:server     # Build backend only

# Start Production
npm start                # Start production server
npm run server:start     # Start backend server
npm run client:start     # Preview built frontend

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # Check TypeScript types
npm test                 # Run tests
```

## 🌐 API Endpoints

### Videos

#### Get All Videos
```http
GET /api/videos?page=1&limit=10&sortBy=createdAt&order=desc&search=query
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `order` - Sort order: asc/desc (default: desc)
- `search` - Search in title, description, tags

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Video Title",
      "url": "https://youtube.com/watch?v=...",
      "videoId": "...",
      "description": "Video description",
      "tags": ["tag1", "tag2"],
      "viewCount": 0,
      "likes": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### Create Video
```http
POST /api/videos
Content-Type: application/json

{
  "title": "Video Title",
  "url": "https://youtube.com/watch?v=...",
  "description": "Optional description",
  "tags": ["tag1", "tag2"]
}
```

#### Get Single Video
```http
GET /api/videos/:id
```

#### Update Video
```http
PUT /api/videos/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["new-tag"]
}
```

#### Delete Video
```http
DELETE /api/videos/:id
```

#### Increment View Count
```http
POST /api/videos/:id/view
```

#### Like Video
```http
POST /api/videos/:id/like
```

#### Get Trending Videos
```http
GET /api/videos/trending?limit=10&days=7
```

### Health Check
```http
GET /health
```

## 🗄️ Database Schema

### Video Model
```typescript
{
  title: String (required, max 200 chars)
  url: String (required, valid YouTube URL)
  videoId: String (required, unique)
  description: String (optional, max 2000 chars)
  tags: [String] (optional, max 10 tags)
  viewCount: Number (default: 0)
  likes: Number (default: 0)
  userId: String (optional)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

**Indexes:**
- `videoId` - Unique index
- `userId` - Index for filtering
- Text search on `title`, `description`, `tags`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/stonk-face

# CORS
CORS_ORIGIN=http://localhost:3000

# Client (Vite)
VITE_API_URL=http://localhost:5000
```

### MongoDB Connection

**Local MongoDB:**
```bash
mongod
```

**Docker MongoDB:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/stonk-face?retryWrites=true&w=majority
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
pgrep mongod

# Start MongoDB
mongod

# Or use Docker
docker start mongodb
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clean dist folder
rm -rf dist

# Rebuild
npm run build
```

## 🚀 Deployment

### Backend Deployment (Heroku Example)

1. **Create Heroku app**
```bash
heroku create stonk-face-api
```

2. **Set environment variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CORS_ORIGIN=https://your-frontend.com
```

3. **Deploy**
```bash
git push heroku main
```

### Frontend Deployment (Vercel Example)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Set environment variables**
```bash
vercel env add VITE_API_URL
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Request validation with express-validator
- **Error Handling** - No stack traces in production
- **MongoDB Injection Prevention** - Mongoose schema validation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- YouTube for video embedding
- MongoDB for database
- React and Vite teams
- Express.js community
- All open-source contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/stonk-face/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/stonk-face/discussions)

---

**Built with ❤️ using React, Node.js, Express, TypeScript, and MongoDB**

🎥 Happy video sharing!