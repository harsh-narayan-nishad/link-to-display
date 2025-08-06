import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoIcon, PlayIcon } from "lucide-react";

const VideoForm = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && link) {
      // Store in localStorage for now with user details
      const videoData = {
        title,
        link,
        notes: notes || "",
        createdBy: "Demo User", // Dummy user for now
        createdAt: new Date().toISOString(),
        id: Date.now().toString()
      };
      localStorage.setItem('videoData', JSON.stringify(videoData));
      navigate('/video');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg">
              <VideoIcon className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Video Embedder
          </h1>
          <p className="text-muted-foreground text-lg">
            Transform any YouTube link into a beautiful video showcase
          </p>
        </div>

        <Card className="bg-gradient-to-br from-card to-video-container border-border/50 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Add Your Video</CardTitle>
            <CardDescription>
              Enter a YouTube link and give it a custom title to create your video showcase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Video Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a descriptive title for your video"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-input/50 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="link" className="text-foreground">YouTube Link</Label>
                <Input
                  id="link"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="bg-input/50 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this video..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-input/50 border-border focus:ring-primary focus:border-primary transition-all duration-300 min-h-[100px]"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={!title || !link}
              >
                <PlayIcon className="mr-2 h-5 w-5" />
                Create Video Showcase
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoForm;