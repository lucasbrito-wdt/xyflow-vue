import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    fs: {
      allow: [resolve(__dirname, '../..')],
    },
  },
  optimizeDeps: {
    exclude: ['@xyflow/vue', '@xyflow/system'],
  },
});
