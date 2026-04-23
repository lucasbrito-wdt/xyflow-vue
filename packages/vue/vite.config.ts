import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: false, tsconfigPath: './tsconfig.json' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      // Only Vue stays external — @xyflow/system is bundled into the dist so
      // users get zero-config installs (pnpm add xyflow-vue and nothing else).
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
    sourcemap: true,
    target: 'es2020',
    emptyOutDir: true,
  },
});
