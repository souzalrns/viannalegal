import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { lazy, Suspense } from "react";

// Carregamento imediato — rota principal
import Index from "./pages/Index";

// Lazy loading — só carrega quando o utilizador navega para a rota
const CidadaniaPortuguesa = lazy(() => import("./pages/CidadaniaPortuguesa"));
const BuscaDocumentos      = lazy(() => import("./pages/BuscaDocumentos"));
const ServicePage          = lazy(() => import("./pages/ServicePage"));
const Blog                 = lazy(() => import("./pages/Blog"));
const BlogPost             = lazy(() => import("./pages/BlogPost"));
const Quiz                 = lazy(() => import("./pages/Quiz"));
const PoliticaPrivacidade  = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosUso            = lazy(() => import("./pages/TermosUso"));
const NotFound             = lazy(() => import("./pages/NotFound"));

// Skeleton mínimo enquanto o chunk carrega
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" aria-label="A carregar..." />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime:    1000 * 60 * 10,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"                        element={<Index />} />
              <Route path="/cidadania-portuguesa"    element={<CidadaniaPortuguesa />} />
              <Route path="/cidadania-portuguesa/:slug" element={<ServicePage />} />
              <Route path="/busca-documentos"        element={<BuscaDocumentos />} />
              <Route path="/blog"                    element={<Blog />} />
              <Route path="/blog/:slug"              element={<BlogPost />} />
              <Route path="/quiz"                    element={<Quiz />} />
              <Route path="/politica-privacidade"    element={<PoliticaPrivacidade />} />
              <Route path="/termos-uso"              element={<TermosUso />} />
              <Route path="*"                        element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
