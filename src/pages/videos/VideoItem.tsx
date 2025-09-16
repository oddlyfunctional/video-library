import { type Video } from "../../../core/video";
import {
  formatCount,
  formatDuration,
  formatRelativeDate,
} from "../../utils.ts";
import { Tag } from "./Tag.tsx";

export const VideoItem = ({ video }: { video: Video }) => (
  <li>
    <div
      className="relative bg-contain aspect-[3/2]"
      style={{ backgroundImage: `url(${video.thumbnail_url})` }}
    >
      {/* <img src={video.thumbnail_url} /> */}
      <div className="absolute right-2 bottom-2 text-xs text-white bg-gray-700 opacity-80 px-1 py-[2px] rounded-sm">
        {formatDuration(video.duration)}
      </div>
    </div>
    <div className="font-semibold mt-1 mb-2">{video.title}</div>
    <div className="text-sm text-gray-500 mb-1">
      {formatCount(video.views)} views •{" "}
      {formatRelativeDate(new Date(video.created_at))}
    </div>
    <div className="flex gap-1 flex-wrap">
      {video.tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  </li>
);
