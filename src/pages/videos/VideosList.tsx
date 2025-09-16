import { type Video } from "../../../core/video";
import { VideoItem } from "./VideoItem";

export const VideosList = ({ videos }: { videos: Video[] }) => (
  <ul className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {videos.map((video) => (
      <VideoItem video={video} key={video.id} />
    ))}
  </ul>
);
