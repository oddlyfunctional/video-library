import { VideosList } from "./VideosList";
import { trpc } from "../../trpc.ts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const VideosPage = () => {
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const videosQuery = useQuery(
    trpc.listVideos.queryOptions({
      orderBy: { column: "created_at", direction: orderDirection },
    }),
  );

  if (videosQuery.isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <section>
      <header>Videos</header>

      <button
        type="button"
        onClick={() =>
          setOrderDirection((dir) => (dir === "asc" ? "desc" : "asc"))
        }
      >
        Creation date {orderDirection === "asc" ? "☝️" : "👇"}
      </button>
      {videosQuery.isPending && <p>Loading...</p>}
      {videosQuery.isSuccess && <VideosList videos={videosQuery.data} />}
    </section>
  );
};
