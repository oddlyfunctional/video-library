import { type Video } from "../../../core/video";

export const VideoItem = ({ video }: { video: Video }) => (
  <li>
    <img src={video.thumbnail_url} />
    {video.title} -{video.created_at} -{video.tags.join(", ")}
  </li>
);
