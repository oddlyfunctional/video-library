import { QueryClientProvider } from "@tanstack/react-query";
import { NewVideoPage } from "./pages/videos/NewVideoPage.tsx";
import { VideosPage } from "./pages/videos/VideosPage";
import { queryClient } from "./trpc.ts";
import { Navbar } from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-white max-w-6xl mx-auto mb-10 px-16 py-10">
        <QueryClientProvider client={queryClient}>
          <NewVideoPage />
          <VideosPage />
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
