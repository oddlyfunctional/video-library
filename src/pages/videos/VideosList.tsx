import { type Video } from "../../../core/video";
import { VideoItem } from "./VideoItem";

export const VideosList = ({ videos }: { videos: Video[] }) => (
  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
    {videos.map((video) => (
      <VideoItem video={video} key={video.id} />
    ))}
  </ul>
);
