'use client';
import { useTransition } from 'react';
import { logout } from '@/entities/auth';
import { Button } from '@/shared/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton({ returnTo }: { returnTo?: string }) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout();

      if (result.success) {
        const destination = returnTo || window.location.origin;
        window.location.href = destination;
      }
    });
  };

  return (
    <Button
      variant="ghost"
      disabled={isPending}
      onClick={handleLogout}
      className={`w-full justify-start gap-2 rounded-xl px-3 py-2 transition-colors ${isPending ? 'opacity-50' : 'text-zinc-500 hover:bg-red-50 hover:text-red-500'}`}
    >
      <LogOut size={16} className={isPending ? 'animate-pulse' : ''} />
      <span className="text-sm font-semibold">{isPending ? '로그아웃 중...' : '로그아웃'}</span>
    </Button>
  );
}
