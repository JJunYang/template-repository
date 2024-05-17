import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { BuildOptions } from 'vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const build: BuildOptions = {
    outDir: resolve(__dirname, './dist/renderer'),
  };
  return {
    base: './',
    root: resolve(__dirname, './src/renderer'),
    build,
    plugins: [react()],
  };
});
