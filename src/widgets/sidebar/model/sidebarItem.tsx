import { Home, ChartNoAxesCombined, ClipboardList, Store, FileText } from 'lucide-react';
import React from 'react';

export type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
  disabled?: boolean;
};

export type MenuGroup = {
  id: string; // key 용
  label?: string; // 그룹 레이블 (없어도 됨)
  items: MenuItem[];
  collapsible?: boolean; // 확장/접기 기능을 추가하고 싶을 때 사용(선택)
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
      { title: '문의내역', url: '/inquiry', icon: ClipboardList },
      { title: '업장 기본 정보', url: '/store-info', icon: Store },
      { title: '이용약관 및 정책 관리', url: '/policies', icon: FileText },
    ],
  },
  // 예시로 다른 그룹 추가 가능
  // {
  //   id: "others",
  //   label: "기타",
  //   items: [
  //     { title: "설정", url: "/settings", icon: Settings },
  //   ]
  // }
];
