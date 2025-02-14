import tsconfigPaths from 'vite-tsconfig-paths';
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, loadEnv, transformWithEsbuild } from "vite";

// https://vitejs.dev/config/

export default ({  mode }:{ mode:string }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
	return defineConfig({
		plugins: [
			react(),
      tsconfigPaths(),
			{
				name: "treat-js-files-as-jsx",
				async transform(code, id) {
					if (!id.match(/src\/.*\.js$/)) return null;
					return transformWithEsbuild(code, id, {
						loader: "jsx",
						jsx: "automatic",
					});
				},
			},
		],
		server: {
			port: mode === 'development' ? Number(process.env.VITE_PORT_DEV) : Number(process.env.VITE_PORT_PROD),
			host: true
		},
		
		optimizeDeps: {
			force: true,
			exclude: ["js-big-decimal"],
			esbuildOptions: {
				loader: {
					".js": "jsx",
				},
			},
		},
		resolve: {
			alias: {
				src: resolve(__dirname, "src"),
			},
		},
	})
}