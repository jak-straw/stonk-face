import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  incrementViews,
  likeVideo,
  getTrendingVideos,
} from '../controllers/videoController';

const router = Router();

/**
 * @route   GET /api/videos
 * @desc    Get all videos with pagination and filtering
 * @access  Public
 * @query   page, limit, sortBy, order, search
 */
router.get('/', getAllVideos);

/**
 * @route   GET /api/videos/trending
 * @desc    Get trending videos
 * @access  Public
 * @query   limit, days
 */
router.get('/trending', getTrendingVideos);

/**
 * @route   GET /api/videos/:id
 * @desc    Get a single video by ID
 * @access  Public
 */
router.get('/:id', getVideoById);

/**
 * @route   POST /api/videos
 * @desc    Create a new video
 * @access  Public
 */
router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    body('url')
      .trim()
      .notEmpty()
      .withMessage('URL is required')
      .isURL()
      .withMessage('Must be a valid URL'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Description cannot exceed 2000 characters'),
    body('tags')
      .optional()
      .isArray({ max: 10 })
      .withMessage('Tags must be an array with max 10 items'),
    body('userId')
      .optional()
      .trim(),
  ],
  createVideo
);

/**
 * @route   PUT /api/videos/:id
 * @desc    Update a video
 * @access  Public
 */
router.put(
  '/:id',
  [
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Title cannot be empty')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Description cannot exceed 2000 characters'),
    body('tags')
      .optional()
      .isArray({ max: 10 })
      .withMessage('Tags must be an array with max 10 items'),
  ],
  updateVideo
);

/**
 * @route   DELETE /api/videos/:id
 * @desc    Delete a video
 * @access  Public
 */
router.delete('/:id', deleteVideo);

/**
 * @route   POST /api/videos/:id/view
 * @desc    Increment video view count
 * @access  Public
 */
router.post('/:id/view', incrementViews);

/**
 * @route   POST /api/videos/:id/like
 * @desc    Like a video
 * @access  Public
 */
router.post('/:id/like', likeVideo);

export default router;
