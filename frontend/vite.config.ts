import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, loadEnv, transformWithEsbuild } from "vite";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  // Load environment variables
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

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
      // Add bundle visualizer plugin
      visualizer({
        filename: './stats.html',
        open: false // Set to true if you want to open automatically
      })
    ],
    
    server: {
      port: mode === "development"
        ? Number(process.env.VITE_PORT_DEV)
        : Number(process.env.VITE_PORT_PROD),
      host: true,
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
    
    build: {
      // Chunk splitting configuration
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Separate node_modules into vendor chunk
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            // You can add more sophisticated chunk splitting logic here
            // For example, separating large libraries or components
            if (id.includes('large-library')) {
              return 'large-library';
            }
          }
        }
      },
      
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      
      // More aggressive minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          // Additional compression options
          dead_code: true,
          unused: true,
        },
        format: {
          comments: false, // Remove comments
        }
      },
      
      // Enable source map for debugging (optional)
      sourcemap: mode === 'development',
    }
  });
};