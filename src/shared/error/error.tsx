'use client';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md p-6 text-center">
        <AlertTriangle className="text-destructive mx-auto mb-2 h-10 w-10" />
        <h2 className="mb-1 text-xl font-semibold text-neutral-900">문제가 발생했습니다.</h2>
        <p className="mb-6 text-neutral-700">죄송합니다. 문제가 발생하여 페이지를 표시할 수 없습니다.</p>
      </div>
    </div>
  );
}
