'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { sidebarGroups, MenuItem } from '../model/sidebarItem';

export function AppSidebar() {
  const pathname = usePathname() ?? '/';
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (url: string) => {
    if (url === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname === url || pathname.startsWith(url + '/');
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 border-r border-slate-200 bg-white px-4 py-8 transition-all duration-300 ease-in-out shadow-sm
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-10 -right-3 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-md hover:text-slate-900 hover:scale-110 transition-all"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`mb-10 flex items-center gap-3 px-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ai text-white shadow-md">
          <Sparkles size={20} fill="currentColor" />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">AICC</span>
        )}
      </div>

      <nav className="flex flex-col gap-8">
        {sidebarGroups.map(group => (
          <div key={group.id} className="flex flex-col gap-2">
            {!isCollapsed && group.label && <p className="px-4 text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase">{group.label}</p>}

            <div className="flex flex-col gap-1">
              {group.items.map((item: MenuItem) => {
                const Icon = item.icon;
                const active = isActive(item.url);

                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    title={isCollapsed ? item.title : ''}
                    className={`
                      group relative flex items-center gap-3 rounded-xl transition-all duration-200
                      ${isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'}
                      ${active ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <Icon
                      size={20}
                      className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400'}`}
                    />

                    {!isCollapsed && <span className={`text-sm truncate ${active ? 'font-semibold' : 'font-medium'}`}>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
