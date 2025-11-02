import '../../projects/rc/src/index.css';
import { lazy, Suspense } from 'react';

const RCApp = lazy(() => import('../../projects/rc/src/App'));

export default function RC(){
  return (
    <Suspense fallback={<div className="p-4 text-center text-gray-600">로딩 중…</div>}>
      <RCApp />
    </Suspense>
  );
}
