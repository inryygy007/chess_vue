import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from "unplugin-vue-components/resolvers";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取当前环境的配置
  const env = loadEnv(mode, process.cwd(), "");
  console.log(
    `api接口:${env.VITE_APP_API_BASEURL},端口号:${env.VITE_APP_PORT},mode:${mode},command:${command}`
  );
  return {
    plugins: [
      vue(),
      //在此处引入如下配置
      Components({
        resolvers: [
          AntDesignVueResolver(),
          ElementPlusResolver(),
          VantResolver(),
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      // 端口号
      port: env.VITE_APP_PORT,
      proxy: {
        "/api": {
          // 请求接口号
          target: env.VITE_APP_API_BASEURL,
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
