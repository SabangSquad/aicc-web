'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { LogOut, Loader2 } from 'lucide-react';

export function LogoutButton({ returnTo }: { returnTo?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/action/logout', { method: 'GET', cache: 'no-store' });

      if (res.ok) {
        const destination = returnTo || window.location.origin;
        window.location.replace(destination);
      }
    } catch (error) {
      console.error('Logout failed', error);
      window.location.href = '/';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      disabled={isLoading}
      onClick={handleLogout}
      className="w-full justify-start gap-2 rounded-xl px-3 py-2 text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-500"
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
      <span className="text-sm font-semibold">{isLoading ? '처리 중...' : '로그아웃'}</span>
    </Button>
  );
}
