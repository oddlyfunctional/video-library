import { QueryClientProvider } from "@tanstack/react-query";
import { NewVideoPage } from "./pages/videos/NewVideoPage.tsx";
import { VideosPage } from "./pages/videos/VideosPage";
import { queryClient } from "./trpc.ts";
import { Navbar } from "./components/Navbar.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="bg-white max-w-6xl mx-auto mb-10 px-16 py-10">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<VideosPage />} />
              <Route path="/new" element={<NewVideoPage />} />
            </Routes>
          </QueryClientProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
