import { useState, lazy, Suspense } from "react";
import { Header } from "./components/Header";
import { Card } from "./components/ui/card";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Routes, Route, useNavigate } from 'react-router-dom';
// 서브앱 페이지는 지연 로딩하여 초기 구동 시 불필요한 모듈 변환을 방지
const School = lazy(() => import('./pages/School'));
const Job = lazy(() => import('./pages/Job'));
const RC = lazy(() => import('./pages/RC'));

function Home() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (cardType: string, path: string) => {
    // 퀵윈: 지연 없이 즉시 네비게이션하여 반응성 개선
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
        {/* 메인 헤딩 섹션 */}
        <motion.div 
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-gray-900 mb-3 sm:mb-5 md:mb-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight">
            내일배움카드 과정 찾기
          </h1>
          
          <motion.p 
            className="text-gray-600 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            국가가 청년들의 <span className="text-blue-600">미래</span>와 <span className="text-blue-600">내일</span>을 지원합니다
          </motion.p>
        </motion.div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-8 max-w-6xl mx-auto mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          {/* 내 전공으로 찾기 카드 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.25 }}
            whileHover={{ scale: 1.01, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`shadow-md border-2 bg-white overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 hover:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
              onClick={() => handleCardClick('major', '/school')}
            >
              <div className="p-6 sm:p-8 md:p-10 lg:p-10 flex flex-col items-center text-center">
                <motion.div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4 sm:mb-6 md:mb-8 shadow-lg`}
                >
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
                </motion.div>
                
                <h2 className="text-gray-900 mb-2 sm:mb-3 md:mb-4 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  내 전공으로 찾기
                </h2>
                
                <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  전공 분야별 맞춤 과정 추천
                </p>
              </div>
            </Card>
          </motion.div>

          {/* 관심 직무로 찾기 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.25 }}
            whileHover={{ scale: 1.01, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`shadow-md border-2 bg-white overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 hover:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
              onClick={() => handleCardClick('job', '/job')}
            >
              <div className="p-6 sm:p-8 md:p-10 lg:p-10 flex flex-col items-center text-center">
                <motion.div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4 sm:mb-6 md:mb-8 shadow-lg`}
                >
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
                </motion.div>
                
                <h2 className="text-gray-900 mb-2 sm:mb-3 md:mb-4 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  관심 직무로 찾기
                </h2>
                
                <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  희망 직무별 맞춤 과정 추천
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* 하단 정보 섹션 */}
        <motion.div 
          className="text-center bg-white rounded-2xl p-6 sm:p-8 md:p-10 max-w-4xl mx-auto shadow-md border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium">💳 내일배움카드로</p>
            <p className="text-blue-700 text-2xl sm:text-3xl md:text-4xl font-bold">최대 500만원</p>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium">국비지원 교육 수강 가능</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function App(){
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-600">로딩 중…</div>}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/school' element={<School/>} />
        <Route path='/job' element={<Job/>} />
        <Route path='/rc' element={<RC/>} />
      </Routes>
    </Suspense>
  )
}