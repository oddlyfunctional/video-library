import { VideosList } from "./VideosList";
import { trpc } from "../../trpc.ts";
import { useQuery } from "@tanstack/react-query";

export const VideosPage = () => {
  const videosQuery = useQuery(trpc.listVideos.queryOptions());

  if (videosQuery.isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <section>
      <header>Videos</header>

      {videosQuery.isPending && <p>Loading...</p>}
      {videosQuery.isSuccess && <VideosList videos={videosQuery.data} />}
    </section>
  );
};
