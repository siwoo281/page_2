import '../../projects/job/src/index.css';
import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const JobApp = lazy(() => import('../../projects/job/src/App'));

export default function Job(){
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* hide embedded app's fixed bottom bar so our wrapper button is clickable */}
      <style>{`.embedded-child .fixed.bottom-0{display:none !important}`}</style>
      <div className="flex-1 embedded-child">
        <Suspense fallback={<div className="p-4 text-center text-gray-600">로딩 중…</div>}>
          <JobApp />
        </Suspense>
      </div>
      <div className="p-4 sm:p-6 bg-transparent">
        <button
          onClick={() => navigate('/rc')}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:h-14 rounded-xl sm:rounded-2xl shadow-lg inline-flex items-center justify-center gap-2 text-base sm:text-lg font-semibold transition-colors duration-300"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          맞춤 강의 찾기
        </button>
      </div>
    </div>
  );
}
