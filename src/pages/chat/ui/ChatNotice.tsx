'use client';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const ChatNotice = ({ notice }: { notice: string | null }) => {
  useEffect(() => {
    toast.success(notice || '가게 공지사항이 없습니다.', {
      duration: 5000,
    });
  }, []);

  return <></>;
};
