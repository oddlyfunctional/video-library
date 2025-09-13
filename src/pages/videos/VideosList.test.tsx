import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { VideosList } from "./VideosList";
import type { Video } from "../../../core/video";
import { fromPartial } from "@total-typescript/shoehorn";

describe("VideosList", () => {
  const baseVideo = fromPartial<Video>({
    created_at: new Date().toISOString(),
    duration: 1,
    tags: [],
    views: 0,
    thumbnail_url: "http://some.url/image.jpg",
  });

  test("renders the title of each video", () => {
    const video1: Video = {
      ...baseVideo,
      id: "1",
      title: "video 1",
    };
    const video2: Video = {
      ...baseVideo,
      id: "2",
      title: "video 2",
    };
    render(<VideosList videos={[video1, video2]} />);

    expect(screen.getByText(new RegExp(video1.title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(video2.title))).toBeInTheDocument();
  });

  test("works if list is empty", () => {
    expect(() => render(<VideosList videos={[]} />)).not.toThrow();
  });
});
