import { QueryClientProvider } from "@tanstack/react-query";
import { NewVideoPage } from "./pages/videos/NewVideoPage.tsx";
import { VideosPage } from "./pages/videos/VideosPage";
import { queryClient } from "./trpc.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewVideoPage />
      <VideosPage />
    </QueryClientProvider>
  );
}

export default App;
