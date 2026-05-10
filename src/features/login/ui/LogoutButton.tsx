'use client';
import { logout } from '@/entities/auth';
import { Button } from '@/shared/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton({ returnTo }: { returnTo?: string }) {
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        await logout(returnTo);
        window.location.href = returnTo || '/';
      }}
      className="w-full justify-start gap-2 rounded-xl px-3 py-2 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
    >
      <LogOut size={16} />
      <span className="text-sm font-medium">로그아웃</span>
    </Button>
  );
}
