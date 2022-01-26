import { defineConfig } from "vite";
import { join } from "path";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";
import polyfillNode from 'rollup-plugin-polyfill-node';
import commonJs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log({ command, mode })
  const common = {
    plugins: [
      vue()
    ],
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        plugins: [
          polyfillNode()
        ]
      }
    },
  }
  if (command === 'build') {
    return {
      ...common,
    }
  } else {
    // command === 'dev' || command === 'serve'
    return {
      ...common,
      plugins: [
        inject({ Buffer: ["buffer", "Buffer"] }),
        ...common.plugins
      ],
      define: {
        // these globals are used in borsh (near-api-js)
        // accounted for by the polyfillNode plugin during build
        'process.env': {},
        global: {},
      },
    }
  }
});
