import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CollectionPage from "./pages/CollectionPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import B2BPage from "./pages/B2BPage.tsx";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/collections/all" element={<CollectionPage />} />
        <Route path="/collections/:collection" element={<CollectionPage />} />
        <Route path="/products/:handle" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
