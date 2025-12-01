# Stonk Face Backend API

A robust Node.js/Express backend API for the Stonk Face video sharing application. Built with TypeScript, MongoDB, and modern best practices.

## 🚀 Features

- **RESTful API** - Clean and intuitive API endpoints
- **TypeScript** - Full type safety and excellent developer experience
- **MongoDB/Mongoose** - Flexible NoSQL database with schema validation
- **Express.js** - Fast and minimalist web framework
- **Validation** - Request validation using express-validator
- **Security** - Helmet, CORS, and security best practices
- **Error Handling** - Centralized error handling with detailed logging
- **Compression** - Response compression for better performance
- **Hot Reload** - Development mode with automatic reloading

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd stonk-face/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stonk-face
CORS_ORIGIN=http://localhost:3000
```

4. **Start MongoDB**
```bash
# Using local MongoDB
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🎯 Usage

### Development Mode
```bash
npm run dev
```
Starts the server with hot reload on `http://localhost:5000`

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## 📚 API Endpoints

### Health Check
```http
GET /health
```
Check if the server is running.

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

#### Get Trending Videos
```http
GET /api/videos/trending?limit=10&days=7
```
Get most viewed/liked videos from the last N days.

#### Get Single Video
```http
GET /api/videos/:id
```

#### Create Video
```http
POST /api/videos
Content-Type: application/json

{
  "title": "Video Title",
  "url": "https://youtube.com/watch?v=...",
  "description": "Optional description",
  "tags": ["tag1", "tag2"],
  "userId": "optional-user-id"
}
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

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Route controllers
│   │   └── videoController.ts
│   ├── models/          # Database models
│   │   └── Video.ts
│   ├── routes/          # API routes
│   │   └── videoRoutes.ts
│   ├── middleware/      # Custom middleware
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   ├── utils/           # Utility functions
│   │   └── database.ts
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── dist/                # Compiled JavaScript
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Security Features

- **Helmet** - Sets security headers
- **CORS** - Configurable cross-origin resource sharing
- **Input Validation** - Request validation and sanitization
- **Error Handling** - Safe error responses (no stack traces in production)
- **Rate Limiting** - Configurable (ready to implement)

## 🚦 Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Server Error

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/stonk-face |
| `CORS_ORIGIN` | Allowed CORS origins | * |

## 📝 Development

### Code Style
- TypeScript with strict mode
- ESLint for linting
- Consistent error handling
- Async/await for asynchronous operations

### Adding New Routes
1. Create controller in `src/controllers/`
2. Add route in `src/routes/`
3. Register route in `src/app.ts`

### Database Queries
Use Mongoose models with TypeScript interfaces for type safety.

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Or check Docker container
docker ps | grep mongo
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

## 🚀 Deployment

### Using PM2
```bash
npm install -g pm2
npm run build
pm2 start dist/server.js --name stonk-face-api
```

### Using Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup
- Set `NODE_ENV=production`
- Use MongoDB Atlas or managed MongoDB
- Configure proper CORS origins
- Set up environment-specific configs

## 📄 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Node.js, Express, TypeScript, and MongoDB