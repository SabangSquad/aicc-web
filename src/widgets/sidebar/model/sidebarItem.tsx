import React from 'react';
import { Home, ChartNoAxesCombined, ClipboardList, Store, FileText } from 'lucide-react';

export type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
  disabled?: boolean;
};

export type MenuGroup = {
  id: string;
  label?: string;
  items: MenuItem[];
};

export const sidebarGroups: MenuGroup[] = [
  {
    id: 'main',
    label: '메인',
    items: [
      { title: '홈', url: '/home', icon: Home },
      { title: '통계', url: '/statistics', icon: ChartNoAxesCombined },
    ],
  },
  {
    id: 'management',
    label: '채팅',
    items: [
      { title: '문의 내역', url: '/inquiry', icon: ClipboardList },
      { title: '업장 기본 정보', url: '/store-info', icon: Store },
      { title: '이용약관 및 정책 관리', url: '/policies', icon: FileText },
    ],
  },
  {
    id: 'reservation',
    label: '예약 확인',
    items: [{ title: '예약 관리', url: '/reservation', icon: ClipboardList }],
  },
  {
    id: 'items',
    label: '상품',
    items: [
      { title: '상품 관리', url: '/products', icon: Store },
      {
        title: '배송 관리',
        url: '/orders',
        icon: Store,
      },
    ],
  },
];
