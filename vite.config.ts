import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: ["es2015", "safari13"],
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — chunk separado
          if (id.includes("node_modules/react/") || 
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/react-router-dom/") ||
              id.includes("node_modules/scheduler/")) {
            return "vendor-react";
          }
          // Dados do blog — muito pesados, só carregam em /blog
          if (id.includes("allBlogPostsMeta") || 
              id.includes("allBlogPostsContent") ||
              id.includes("allBlogPosts")) {
            return "data-blog";
          }
          // Todo o resto dos node_modules junto
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
