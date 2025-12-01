import { Card, CardContent } from './ui/card';
import { Play } from 'lucide-react';

export interface Video {
  id: string;
  title: string;
  url: string;
  videoId: string;
  createdAt: Date;
}

interface VideoGalleryProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  selectedVideoId?: string;
}

export function VideoGallery({ videos, onSelectVideo, selectedVideoId }: VideoGalleryProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No videos posted yet. Be the first to share!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <Card
          key={video.id}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedVideoId === video.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onSelectVideo(video)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-video bg-muted">
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <Play className="size-12 text-white" fill="white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2">{video.title}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
