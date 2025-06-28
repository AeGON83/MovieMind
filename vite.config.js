import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    fs: {
      allow: [".", ".."],
    },
  },
  define: {
    "process.env": {
      REACT_APP_TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY,
    },
  },
});
