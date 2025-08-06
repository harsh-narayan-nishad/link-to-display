import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";

interface VideoData {
  title: string;
  link: string;
}

const VideoDisplay = () => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('videoData');
    if (data) {
      setVideoData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const getEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = '';
      
      if (urlObj.hostname.includes('youtube.com')) {
        // Handle regular videos: youtube.com/watch?v=VIDEO_ID
        if (urlObj.searchParams.get('v')) {
          videoId = urlObj.searchParams.get('v') || '';
        }
        // Handle YouTube Shorts: youtube.com/shorts/VIDEO_ID
        else if (urlObj.pathname.includes('/shorts/')) {
          videoId = urlObj.pathname.split('/shorts/')[1];
        }
      } else if (urlObj.hostname.includes('youtu.be')) {
        // Handle youtu.be/VIDEO_ID format
        videoId = urlObj.pathname.slice(1);
      }
      
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : '';
    } catch {
      return '';
    }
  };

  if (!videoData) {
    return null;
  }

  const embedUrl = getEmbedUrl(videoData.link);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-border hover:bg-secondary transition-all duration-300"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Form
          </Button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-foreground">Video Showcase</h1>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-video-container to-card border-border/50 shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="aspect-video bg-secondary/20 rounded-lg overflow-hidden shadow-inner relative group">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={videoData.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                      style={{ filter: 'drop-shadow(var(--video-shadow))' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <p>Invalid YouTube URL</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-80 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                    {videoData.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ExternalLinkIcon className="h-4 w-4" />
                    <span className="truncate">YouTube Video</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => window.open(videoData.link, '_blank')}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    Watch on YouTube
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full border-border hover:bg-secondary transition-all duration-300"
                  >
                    Add Another Video
                  </Button>
                </div>

                <div className="p-4 bg-secondary/20 rounded-lg border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">Video Details</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Title:</span>
                      <p className="mt-1">{videoData.title}</p>
                    </div>
                    <div>
                      <span className="font-medium">Source:</span>
                      <p className="mt-1 break-all">{videoData.link}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VideoDisplay;