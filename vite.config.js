// /** @format */

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import dotenv from "dotenv";
// import path from "path";
// dotenv.config();

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// 	root: "./", // project root
// 	base: "./", // base path for the project
// 	build: {
// 		outDir: "dist", // the output directory for the build
// 		rollupOptions: {
// 			input: "./index.html", // replace this with your entry point if it's not 'src/index.html'
// 		},
// 	},
// 	define: {
// 		"process.env": {
// 			REACT_APP_TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY,
// 		},
// 	},
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path"; // Import the path module
dotenv.config();

export default defineConfig({
	plugins: [react()],
	base: "./",
	build: {
		outDir: "dist",
		assetsDir: "",
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"), // Use path.resolve to get the correct file path
			},
		},
	},
	server: {
		fs: {
			allow: [".", ".."], // Allow serving files outside of the default directories
		},
	},
	define: {
		"process.env": {
			REACT_APP_TMDB_API_KEY:
				process.env.REACT_APP_TMDB_API_KEY
			
		},
	},
});
