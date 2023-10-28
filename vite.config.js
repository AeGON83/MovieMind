/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: "./", // project root
	base: "./", // base path for the project
	build: {
		outDir: "dist", // the output directory for the build
		rollupOptions: {
			input: "./index.html", // replace this with your entry point if it's not 'src/index.html'
		},
	},

	define: {
		"process.env": {
			REACT_APP_TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY,
		},
	},
});
