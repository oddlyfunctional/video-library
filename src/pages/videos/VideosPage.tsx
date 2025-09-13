import { z } from "zod/mini";
import { schema } from "../../../core/video";
// TODO: hardcoding videos list for now, replace with API call
import videosJSON from "../../../seed.json" with { type: "json" };
import { VideosList } from "./VideosList";
const { videos } = z.object({ videos: z.array(schema) }).parse(videosJSON);

export const VideosPage = () => (
  <section>
    <header>Videos</header>
    <VideosList videos={videos} />
  </section>
);
