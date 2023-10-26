/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// build: {
	// 	outDir: "build",
	// },
	// root: path.join(__dirname, "src"),

	define: {
		"process.env": {
			REACT_APP_TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY,
		},
	},
});
