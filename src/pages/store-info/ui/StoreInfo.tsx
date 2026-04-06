import { Suspense } from 'react';
import { StoreInfoPage } from './StoreInfoPage';
import { Loader2 } from 'lucide-react';

export function Page() {
  return (
    <div className="container mx-auto py-10">
      <Suspense
        fallback={
          <div className="flex h-[60vh] w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <span className="ml-3 text-lg font-medium text-slate-600">업장 정보를 불러오는 중...</span>
          </div>
        }
      >
        <StoreInfoPage />
      </Suspense>
    </div>
  );
}
