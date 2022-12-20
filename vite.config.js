import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取当前环境的配置
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env.VITE_BASIC_URL, mode, command);
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: env.VITE_BASIC_URL,
      proxy: {
        "/api": {
          target: env.VITE_BASIC_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/socket.io": {
          target: env.VITE_WEBSOCKET_URL,
          ws: true,
        },
      },
    },
  };
});
