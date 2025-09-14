import { PORT } from "./config.ts";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./router.ts";

const app = express();
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  }),
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
