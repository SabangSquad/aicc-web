'use client';

import { History, Clock, Tag, ShoppingBag, Smile, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomerPastInquiries } from '@/entities/customer';
import { CaseType } from '@/shared/types/case';

interface PastInquiryListProps {
  customerId: number;
  storeId: number;
}
export function PastInquiryList({ customerId, storeId }: PastInquiryListProps) {
  const { data: casesData } = useCustomerPastInquiries(customerId);

  const filteredCases: CaseType[] = casesData?.filter((inquiry: CaseType) => inquiry.store_id === storeId) || [];

  const formatDateTime = (isoString: string) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // 상태별 뱃지 스타일링 헬퍼 함수
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case '대기':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case '진행중':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case '완료':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default:
        return 'bg-zinc-50 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <History size={16} className="text-zinc-800" />
          <h3 className="text-[15px] font-semibold text-zinc-800">과거 상담 내역</h3>
        </div>
        <span className="rounded-full bg-zinc-200/50 px-2.5 py-0.5 text-[11px] font-bold text-zinc-500">{filteredCases.length}건</span>
      </div>

      <div className="flex flex-col p-5">
        {filteredCases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50">
              <History size={20} className="text-zinc-300" />
            </div>
            <p className="text-[14px] font-medium text-zinc-500">해당 매장의 상담 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredCases.map(inquiry => (
              <div
                key={inquiry.case_id}
                className="group flex flex-col gap-3 rounded-xl border border-zinc-100 bg-white p-4 transition-all hover:border-zinc-200 hover:shadow-sm"
              >
                {/* 상단: 상태, 카테고리, 날짜 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide ${getStatusBadgeStyle(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                    <div className="flex items-center gap-1 text-[13px] font-semibold text-zinc-700">
                      <Tag size={13} className="text-zinc-400" />
                      {inquiry.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400">
                    <Clock size={12} />
                    {formatDateTime(inquiry.created_at)}
                  </div>
                </div>

                {/* 하단: 주문번호, 감정상태 등 상세 정보 */}
                <div className="flex flex-wrap items-center gap-4 rounded-lg bg-zinc-50/80 px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag size={14} className="text-zinc-400" />
                    <span className="text-[12px] font-medium text-zinc-500">주문번호:</span>
                    <span className="text-[13px] font-semibold text-zinc-700">{inquiry.order_id ? `#${inquiry.order_id}` : '-'}</span>
                  </div>

                  <div className="h-3 w-px bg-zinc-200"></div>

                  <div className="flex items-center gap-1.5">
                    <Smile size={14} className="text-zinc-400" />
                    <span className="text-[12px] font-medium text-zinc-500">감정상태:</span>
                    <span className="text-[13px] font-semibold text-zinc-700">{inquiry.emotion || '-'}</span>
                  </div>

                  {inquiry.reservation_id && (
                    <>
                      <div className="h-3 w-px bg-zinc-200"></div>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-zinc-400" />
                        <span className="text-[12px] font-medium text-zinc-500">예약번호:</span>
                        <span className="text-[13px] font-semibold text-zinc-700">#{inquiry.reservation_id}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
