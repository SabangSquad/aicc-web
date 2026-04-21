'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronsLeft, ChevronsRight, LogOut } from 'lucide-react';
import { sidebarGroups, MenuItem } from '../model/sidebarItem';
import { useStoreInformation } from '@/entities/store';
import { useAuth } from '@/entities/auth';

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: authData } = useAuth();
  const { data: storeData } = useStoreInformation(authData.user.store_id);

  const isActive = (url: string) => {
    if (url === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname === url || pathname.startsWith(url + '/');
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      router.push('/');
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white py-8 shadow-sm transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20 px-4' : 'w-64 px-4'}`}
    >
      <div className={`mb-10 flex shrink-0 items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2`}>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden pr-2">
            <span className="text-xs font-medium text-slate-500">환영합니다,</span>
            <span className="truncate text-lg font-bold text-slate-900">{storeData.name} 사장님 👋</span>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex shrink-0 items-center justify-center rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>

      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <nav className="flex flex-col gap-8">
          {sidebarGroups.map(group => {
            if (storeData.category === '이커머스' && group.id === 'reservation') return null;
            if (storeData.category !== '이커머스' && group.id === 'items') return null;
            return (
              <div key={group.id} className="flex flex-col gap-2">
                {!isCollapsed && group.label && <p className="px-2 text-[12px] font-medium text-zinc-500 uppercase">{group.label}</p>}

                <div className="flex flex-col gap-1">
                  {group.items.map((item: MenuItem) => {
                    const Icon = item.icon;
                    const active = isActive(item.url);

                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        title={isCollapsed ? item.title : ''}
                        className={`group relative flex items-center gap-3 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'} ${active ? 'bg-zinc-800 text-white shadow-lg shadow-zinc-200' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'} `}
                      >
                        <Icon
                          size={20}
                          className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-white' : 'text-zinc-400'}`}
                        />

                        {!isCollapsed && <span className={`truncate text-sm`}>{item.title}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto shrink-0 pt-4">
        <button
          onClick={handleLogout}
          title={isCollapsed ? '로그아웃' : ''}
          className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'} text-slate-500 hover:bg-red-50 hover:text-red-600`}
        >
          <LogOut size={20} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          {!isCollapsed && <span className="truncate text-sm font-medium">로그아웃</span>}
        </button>
      </div>
    </aside>
  );
}
