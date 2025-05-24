"use client"

import { env } from "@/env/server";
import { createIframeLink } from "@/lib/utils";

const VideoPlayer = ({ videoId, className }: VideoPlayerProps) => {
  return (
    <div className="video-player">
      <iframe
        // ref={iframeRef}
        src={createIframeLink(videoId)}
        loading="lazy"
        title="Video player"
        // style={{ border: 0, zIndex: 50 }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        // onLoad={() => setState((prev) => ({ ...prev, isLoaded: true }))}
      />
    </div>
  );
};

export default VideoPlayer;
