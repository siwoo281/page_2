
# 온통청년 모노레포 (Vite + React + TS)

루트 하나에서 3개의 서브 페이지를 운영하는 멀티 엔트리 구조입니다. 공통 코드는 `src/`에, 각 서브앱의 엔트리/라우팅/페이지는 `projects/<name>/`에 있습니다.

## 개발 실행

필수: Node.js 18+ 권장

```bash
npm ci
# 루트
npm run dev
# 개별 서브앱 루트 실행
npm run dev:job
npm run dev:rc
npm run dev:school
```

## 빌드/미리보기

```bash
npm run build
npm run preview
```

멀티 페이지로 번들되어 `build/`에 다음 엔트리가 생성됩니다.
- `index.html` (메인)
- `projects/job/index.html`
- `projects/rc/index.html`
- `projects/school/index.html`

## 경로 별칭

- `@/*` → `src/*`
- `~/components/ui` → `src/components/ui`
- `figma:asset/00615d1b59bc611665476fb4668d05fa3e99d2d2.png` → `src/assets/00615d1b59bc611665476fb4668d05fa3e99d2d2.png`

서브앱에서 공통 UI를 쓸 때는 다음과 같이 import 합니다.

```ts
import { Button } from '~/components/ui/button'
```

## CSS 정책 (충돌 방지)

- 전역 CSS는 루트 `src/index.css`만 import 합니다.
- 서브앱 전용 스타일은 각 프로젝트의 `src/index.css`가 아닌 컴포넌트 단위로 `@layer components` 범위에 추가하고 해당 컴포넌트 파일 안에서 import 하세요.
- 기존 `projects/*/src/index.css`는 전역 충돌을 막기 위해 비활성/축소되었습니다.

## Lint/Format

```bash
npm run lint
```

- ESLint flat config: `eslint.config.mjs`
  - 앱 코드: 브라우저 전역(window, document 등)
  - 설정/스크립트: 노드 전역(module, __dirname 등)
  - TS에서는 `no-undef`/`no-unused-vars` base 규칙을 비활성화하고 `@typescript-eslint/no-unused-vars`만 경고로 사용
- Prettier: `prettier.config.js` (루트 단일 설정)

## CI

GitHub Actions에서 전체 워크스페이스에 대해 lint → build → gh-pages 배포가 이뤄집니다. Lint 실패 시 배포가 중단됩니다.

## 포함된 서브프로젝트
- `projects/job`
- `projects/rc`
- `projects/school`
