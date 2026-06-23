import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Target moderno — elimina polyfills desnecessários
    target: "es2020",

    // Avisar quando chunks > 500KB
    chunkSizeWarningLimit: 500,

    // CSS inline para chunks pequenos (elimina round-trips)
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        // Chunking manual — separa vendor pesados do código da app
        manualChunks: (id) => {
          // Framer Motion — animações, ~150KB
          if (id.includes("framer-motion")) return "vendor-framer";

          // React core
          if (id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/")) return "vendor-react";

          // React Router
          if (id.includes("react-router")) return "vendor-router";

          // Radix UI — componentes de UI
          if (id.includes("@radix-ui")) return "vendor-radix";

          // Supabase
          if (id.includes("@supabase")) return "vendor-supabase";

          // Restante node_modules
          if (id.includes("node_modules")) return "vendor-misc";
        },

        // Nomes de ficheiros com hash para cache busting
        chunkFileNames:  "assets/js/[name]-[hash].js",
        entryFileNames:  "assets/js/[name]-[hash].js",
        assetFileNames:  "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
}));
