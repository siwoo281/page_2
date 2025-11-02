import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
// 전역 베이스 스타일 (Tailwind base/components/utilities 포함)
import './index.css'
// 서브 프로젝트 전용 스타일은 각 페이지/컴포넌트에서 필요 시 개별적으로 임포트하도록 권장합니다.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
