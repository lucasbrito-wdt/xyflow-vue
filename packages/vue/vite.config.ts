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
      external: ['vue', '@xyflow/system'],
      output: {
        globals: { vue: 'Vue', '@xyflow/system': 'XYFlowSystem' },
      },
    },
    sourcemap: true,
    target: 'es2020',
    emptyOutDir: true,
  },
});
