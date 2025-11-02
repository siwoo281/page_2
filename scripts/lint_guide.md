# ESLint/Prettier 사용법 및 lint 오류 해결

## lint 오류 원인
- ESLint v8+ 및 eslint.config.js(또는 .js) 구성 사용 시, `--ext` 플래그 등 일부 CLI 옵션이 더 이상 지원되지 않습니다.
- 기존 스크립트:
  - `eslint src --ext .js,.ts,.tsx --fix && eslint main/projects --ext .js,.ts,.tsx --fix`
- 오류 메시지:
  - `Invalid option '--ext' - perhaps you meant '-c'? You're using eslint.config.js, some command line flags are no longer available.`

## 해결 방법
- `--ext` 플래그 제거 및 glob 패턴 사용 권장
- 예시:
  - `eslint "src/**/*.{js,ts,tsx}" --fix && eslint "main/projects/**/*.{js,ts,tsx}" --fix`
- 또는, 최신 ESLint는 config 기반 glob 지원:
  - `eslint . --fix` (eslint.config.js가 있으면 전체 프로젝트 적용)

## package.json 수정 예시
```json
"scripts": {
  "lint": "eslint . --fix"
}
```

## 참고
- [ESLint 공식 CLI 문서](https://eslint.org/docs/latest/use/command-line-interface)
- [Prettier 공식 문서](https://prettier.io/docs/en/options.html)
