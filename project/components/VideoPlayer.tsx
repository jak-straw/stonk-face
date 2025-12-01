import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import type { Video } from './VideoGallery';

interface VideoPlayerProps {
  video: Video | null;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  if (!video) {
    return (
      <Card>
        <CardContent className="p-12">
          <div className="text-center text-muted-foreground">
            Select a video from the gallery to start playing
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{video.title}</CardTitle>
        <CardDescription>
          Posted on {new Date(video.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
