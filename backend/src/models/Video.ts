import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  url: string;
  videoId: string;
  description?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likes: number;
  userId?: string;
}

const VideoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    url: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
      validate: {
        validator: function (v: string) {
          // Validate YouTube URL format
          const patterns = [
            /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
            /^https?:\/\/youtu\.be\/[\w-]+/,
            /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
            /^https?:\/\/(www\.)?youtube\.com\/v\/[\w-]+/,
          ];
          return patterns.some((pattern) => pattern.test(v));
        },
        message: 'Please provide a valid YouTube URL',
      },
    },
    videoId: {
      type: String,
      required: [true, 'Video ID is required'],
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    userId: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
VideoSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Static method to extract video ID from URL
VideoSchema.statics.extractVideoId = function (url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

// Instance method to increment view count
VideoSchema.methods.incrementViewCount = async function (): Promise<IVideo> {
  this.viewCount += 1;
  return await this.save();
};

// Instance method to increment likes
VideoSchema.methods.incrementLikes = async function (): Promise<IVideo> {
  this.likes += 1;
  return await this.save();
};

export default mongoose.model<IVideo>('Video', VideoSchema);
