import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Plus } from 'lucide-react';

interface VideoFormProps {
  onAddVideo: (url: string, title: string) => void;
}

export function VideoForm({ onAddVideo }: VideoFormProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && title.trim()) {
      onAddVideo(url.trim(), title.trim());
      setUrl('');
      setTitle('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Video</CardTitle>
        <CardDescription>Share your favorite YouTube videos with the community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Video Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">YouTube URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="mr-2 size-4" />
            Add Video
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
