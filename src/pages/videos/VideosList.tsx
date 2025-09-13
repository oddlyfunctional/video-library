import { type Video } from "../../../core/video";
import { VideoItem } from "./VideoItem";

export const VideosList = ({ videos }: { videos: Video[] }) => (
  <ul>
    {videos.map((video) => (
      <VideoItem video={video} key={video.id} />
    ))}
  </ul>
);
