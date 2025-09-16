import { VideosList } from "./VideosList";
import { trpc } from "../../trpc.ts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../../components/Button.tsx";

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
      <header className="flex justify-between mb-5">
        <h1 className="text-3xl">All videos</h1>
        <span className="flex gap-2 items-center">
          <span>Sort by:</span>
          <Button
            type="button"
            onClick={() =>
              setOrderDirection((dir) => (dir === "asc" ? "desc" : "asc"))
            }
          >
            Creation date {orderDirection === "asc" ? "☝️" : "👇"}
          </Button>
        </span>
      </header>
      {videosQuery.isPending && <p>Loading...</p>}
      {videosQuery.isSuccess && <VideosList videos={videosQuery.data} />}
    </section>
  );
};
