import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Video from "../models/Video";

/**
 * Get all videos with pagination and filtering
 */
export const getAllVideos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;
    const search = req.query.search as string;

    let query: any = {};

    // Add search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const videos = await Video.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Video.countDocuments(query);

    res.status(200).json({
      success: true,
      data: videos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch videos",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Get a single video by ID
 */
export const getVideoById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch video",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Create a new video
 */
export const createVideo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { title, url, description, tags, userId } = req.body;

    // Extract video ID from URL
    const videoId = (Video as any).extractVideoId(url);

    if (!videoId) {
      res.status(400).json({
        success: false,
        message: "Invalid YouTube URL",
      });
      return;
    }

    // Check if video already exists
    const existingVideo = await Video.findOne({ videoId });
    if (existingVideo) {
      res.status(409).json({
        success: false,
        message: "Video already exists in the database",
        data: existingVideo,
      });
      return;
    }

    const video = await Video.create({
      title,
      url,
      videoId,
      description,
      tags,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Video created successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create video",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Update a video
 */
export const updateVideo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { id } = req.params;
    const { title, description, tags } = req.body;

    const video = await Video.findByIdAndUpdate(
      id,
      { title, description, tags },
      { new: true, runValidators: true },
    );

    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: video,
    });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update video",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Delete a video
 */
export const deleteVideo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete video",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Increment video view count
 */
export const incrementViews = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
      return;
    }

    video.viewCount += 1;
    await video.save();

    res.status(200).json({
      success: true,
      message: "View count incremented",
      data: { viewCount: video.viewCount },
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    res.status(500).json({
      success: false,
      message: "Failed to increment views",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Like a video
 */
export const likeVideo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
      return;
    }

    video.likes += 1;
    await video.save();

    res.status(200).json({
      success: true,
      message: "Video liked",
      data: { likes: video.likes },
    });
  } catch (error) {
    console.error("Error liking video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to like video",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Get trending videos (most viewed/liked in last 7 days)
 */
export const getTrendingVideos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const days = parseInt(req.query.days as string) || 7;

    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const videos = await Video.find({
      createdAt: { $gte: dateThreshold },
    })
      .sort({ viewCount: -1, likes: -1 })
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending videos",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
