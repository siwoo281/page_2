#!/usr/bin/env bash
set -euo pipefail

MAIN_DIR="/Users/siu/Downloads/main"
PROJECT_DIRS=(
  "/Users/siu/Downloads/job"
  "/Users/siu/Downloads/school"
  "/Users/siu/Downloads/rc"
)

# 1) 존재 확인
for p in "${PROJECT_DIRS[@]}"; do
  if [ ! -d "$p" ]; then
    echo "오류: 프로젝트 폴더가 없습니다: $p"
    exit 1
  fi
done

# 2) 메인 백업
BACKUP="${MAIN_DIR}_backup_$(date +%s)"
echo "메인 백업 생성: $BACKUP"
cp -r "$MAIN_DIR" "$BACKUP"

# 3) projects 디렉터리에 복사 (node_modules, .git 제외)
mkdir -p "$MAIN_DIR/projects"
for p in "${PROJECT_DIRS[@]}"; do
  name=$(basename "$p")
  echo "복사: $p -> $MAIN_DIR/projects/$name/"
  rsync -a --exclude='node_modules' --exclude='.git' "$p/" "$MAIN_DIR/projects/$name/"
done

# 4) package.json 병합 (main 우선, 서브 프로젝트의 의존성 추가, 스크립트는 projectName:scriptName 으로 추가)
if [ ! -f "$MAIN_DIR/package.json" ]; then
  echo "{}" > "$MAIN_DIR/package.json"
fi
cp "$MAIN_DIR/package.json" "$MAIN_DIR/package.json.bak"

TMP_JS="$(mktemp /tmp/merge_pkg.XXXXXX 2>/dev/null || mktemp -t merge_pkg)"
if [[ "$TMP_JS" != *.js ]]; then
  TMP_JS="${TMP_JS}.js"
fi
cat > "$TMP_JS" <<'NODEJS'
const fs = require('fs');
const path = require('path');
const mainPkgPath = process.argv[2];
const projectPaths = process.argv.slice(3);

let mainPkg = {};
try { mainPkg = JSON.parse(fs.readFileSync(mainPkgPath,'utf8')); } catch(e){ mainPkg = {}; }
mainPkg.dependencies = mainPkg.dependencies || {};
mainPkg.devDependencies = mainPkg.devDependencies || {};
mainPkg.scripts = mainPkg.scripts || {};

for(const p of projectPaths){
  const pkgPath = path.join(p, 'package.json');
  if(!fs.existsSync(pkgPath)) continue;
  let pkg = {};
  try { pkg = JSON.parse(fs.readFileSync(pkgPath,'utf8')); } catch(e){ continue; }

  // dependencies: main 우선, 없는 것만 추가
  for(const [k,v] of Object.entries(pkg.dependencies || {})){
    if(!(k in mainPkg.dependencies)) mainPkg.dependencies[k] = v;
  }
  for(const [k,v] of Object.entries(pkg.devDependencies || {})){
    if(!(k in mainPkg.devDependencies)) mainPkg.devDependencies[k] = v;
  }

  // scripts: projectName:scriptName 로 추가
  const projectName = path.basename(p);
  for(const [name, cmd] of Object.entries(pkg.scripts || {})){
    const newName = `${projectName}:${name}`;
    if(!(newName in mainPkg.scripts)) mainPkg.scripts[newName] = cmd;
  }
}

fs.writeFileSync(mainPkgPath, JSON.stringify(mainPkg, null, 2), 'utf8');
NODEJS

node "$TMP_JS" "$MAIN_DIR/package.json" "${PROJECT_DIRS[@]}"
rm -f "$TMP_JS"

# 5) README 업데이트
README="$MAIN_DIR/README.md"
echo -e "\n\n## 포함된 서브프로젝트\n- job\n- school\n- rc" >> "$README"

# 6) 설치 (주의: 환경에 따라 시간이 걸림)
cd "$MAIN_DIR"
echo "npm install 시작 (main 디렉터리)..."
npm install

echo "완료. 백업: $BACKUP"
