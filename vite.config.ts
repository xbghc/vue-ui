import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.*', 'src/**/*.test.*'],
      outDir: 'dist',
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'XbghcVueUI',
      formats: ['es', 'umd'],
      fileName: format => `index.${format === 'es' ? 'es.js' : 'umd.js'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
        assetFileNames: assetInfo => {
          if (assetInfo.names?.[0]?.endsWith('.css')) {
            return 'vue-ui.css';
          }
          return assetInfo.names?.[0];
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '// Global SCSS variables can be added here',
      },
    },
  },
});
