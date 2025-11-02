import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // 1) 무시 대상: 빌드 산출물, 백업/임시 폴더 등
  {
    ignores: ['node_modules/**', 'build/**', 'dist/**', 'main_backup_*/**', '**/src/components/ui_backup_*/**'],
  },
  // 2) JS 권장 규칙
  js.configs.recommended,
  // 3) React/TS 프로젝트 전역 규칙 (src/ 및 projects/** 내부 포함)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      // 브라우저 런타임 전역(window, document, console 등)
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsEslintPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // 팀 규칙
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      // TS 사용 시 no-undef는 비활성화(타입/DOM 전역 경고 방지)
      'no-undef': 'off',
      // TS 환경에서는 base no-unused-vars를 끄고 TS용 규칙만 사용
      'no-unused-vars': 'off',
      // 미사용 변수는 경고로 완화, 언더스코어 접두는 무시
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  // 3-1) Node 실행 환경 파일(설정/스크립트) 전용 오버라이드
  {
    files: [
      '**/*.config.{js,cjs,mjs,ts}',
      'vite.config.ts',
      'tailwind.config.js',
      'prettier.config.js',
      'scripts/**/*.js',
    ],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
    },
    rules: {
      'no-undef': 'off',
    },
  },
  // 4) Prettier와 충돌하는 규칙들 비활성화
  prettier,
];
