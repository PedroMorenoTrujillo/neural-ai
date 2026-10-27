import { defineConfig } from 'vite';
import { ngNativeWeb } from '@ng-native/web/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [ngNativeWeb()],
  build: { outDir: '../../dist/native-examples', emptyOutDir: true, target: 'es2022' },
});
