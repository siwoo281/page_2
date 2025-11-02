import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  // GitHub Pages 리포지토리 경로에 맞게 설정
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 공통 UI 컴포넌트 경로 별칭
      '~/components/ui': path.resolve(__dirname, './src/components/ui'),
      // figma asset 별칭 (Header.tsx에서 사용하는 경로와 정확히 일치)
      'figma:asset/00615d1b59bc611665476fb4668d05fa3e99d2d2.png': path.resolve(
        __dirname,
        './src/assets/00615d1b59bc611665476fb4668d05fa3e99d2d2.png'
      ),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        job: path.resolve(__dirname, 'projects/job/index.html'),
        rc: path.resolve(__dirname, 'projects/rc/index.html'),
        school: path.resolve(__dirname, 'projects/school/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
