import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
// 컴파일된 Tailwind v4 CSS를 전역으로 로드하여 메인 홈에서도 유틸리티 클래스를 사용할 수 있게 함
import '../projects/rc/src/index.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
