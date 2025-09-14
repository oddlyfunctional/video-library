import { useEffect, useState } from "react";
import { type Video } from "../../../core/video";
import { VideosList } from "./VideosList";
import { trpc } from "../../trpc.ts";

export const VideosPage = () => {
  // TODO: handle request states (loading, error, etc)
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    trpc.listVideos.query().then(setVideos);
  }, []);

  return (
    <section>
      <header>Videos</header>
      <VideosList videos={videos} />
    </section>
  );
};
