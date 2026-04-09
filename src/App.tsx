import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import { PromoSticker } from "@/components/PromoSticker";
import Index from "./pages/Index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CollectionPage from "./pages/CollectionPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import B2BPage from "./pages/B2BPage.tsx";
import Hit10x1Page from "./pages/Hit10x1Page.tsx";
import CrystalOilPage from "./pages/CrystalOilPage.tsx";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  return (
    <BrowserRouter>
      <PromoSticker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/collections/all" element={<CollectionPage />} />
        <Route path="/collections/:collection" element={<CollectionPage />} />
         <Route path="/products/leave-in-hit-10x1-200ml-6903bafe7954e" element={<Hit10x1Page />} />
         <Route path="/products/serum-crystal-oil-laranja-60ml-6903bb190ee85" element={<CrystalOilPage />} />
         <Route path="/products/serum-crystal-oil-laranja-15ml-6903bb1b03e45" element={<CrystalOilPage />} />
         <Route path="/products/:handle" element={<ProductPage />} />
         <Route path="/hit-10x1" element={<Hit10x1Page />} />
         <Route path="/crystal-oil" element={<CrystalOilPage />} />
         <Route path="/profissional" element={<B2BPage />} />
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
