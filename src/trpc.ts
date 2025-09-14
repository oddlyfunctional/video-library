import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index.ts";

export const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "/trpc" })],
});
