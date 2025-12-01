import { useState, useEffect } from "react";
import { VideoForm } from "./components/VideoForm";
import { VideoGallery, type Video } from "./components/VideoGallery";
import { VideoPlayer } from "./components/VideoPlayer";
import { ThemeToggle } from "./components/ThemeToggle";
import { Youtube } from "lucide-react";

function extractVideoId(url: string): string | null {
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
}

function App() {
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem("youtube-videos");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    localStorage.setItem("youtube-videos", JSON.stringify(videos));
  }, [videos]);

  const handleAddVideo = (url: string, title: string) => {
    const videoId = extractVideoId(url);

    if (!videoId) {
      alert("Invalid YouTube URL. Please enter a valid YouTube link.");
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title,
      url,
      videoId,
      createdAt: new Date(),
    };

    setVideos((prev) => [newVideo, ...prev]);
    setSelectedVideo(newVideo);
  };

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Youtube className="size-8 text-primary" />
              <h1>VideoShare</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <VideoForm onAddVideo={handleAddVideo} />
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-8">
              <VideoPlayer video={selectedVideo} />

              <div>
                <h2 className="mb-4">Video Gallery</h2>
                <VideoGallery
                  videos={videos}
                  onSelectVideo={handleSelectVideo}
                  selectedVideoId={selectedVideo?.id}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
