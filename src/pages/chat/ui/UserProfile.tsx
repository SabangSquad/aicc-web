'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ChevronDown, Hash, User } from 'lucide-react';
import { LogoutButton } from '@/features/login';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/entities/auth';

export const UserProfile = () => {
  const pathname = usePathname();
  const { data: authData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-zinc-800 backdrop-blur-md transition-all hover:bg-white/90 active:scale-95"
      >
        <span>{authData?.user?.name}님</span>
        <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            <div className="p-3">
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-zinc-400">내 계정 정보</span>
                  <span className="text-[15px] font-bold text-zinc-900">{authData?.user?.name}</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-50">
                      <Mail size={12} className="text-zinc-400" />
                    </div>
                    <span className="truncate">{authData?.user?.email || '이메일 없음'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-50">
                      <Hash size={12} className="text-zinc-400" />
                    </div>
                    <span>ID: {authData?.user?.customer_id || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-1 border-t border-zinc-100" />

            {/* 로그아웃 버튼 영역 */}
            <div className="p-1">{pathname && <LogoutButton returnTo={pathname} />}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
