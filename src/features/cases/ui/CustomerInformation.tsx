'use client';
import { User, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCustomerInfo } from '@/entities/customer/hooks/useCustomer';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';

export function CustomerInformation({ customerId }: { customerId: number }) {
  const { data: customer } = useCustomerInfo(customerId);

  const getInitials = (name: string) => {
    return name ? name.substring(0, 1).toUpperCase() : 'U';
  };

  const formatBirthdate = (isoString: string) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]"
    >
      {/* 🔹 헤더 영역 */}
      <div className="flex items-center border-b border-zinc-100 bg-zinc-50/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <User size={16} className="text-zinc-800" />
          <h3 className="text-[15px] font-semibold text-zinc-800">고객 정보</h3>
        </div>
      </div>

      <div className="p-5">
        {/* 🔹 프로필 영역 (아바타 & 이름) */}
        <div className="mb-6 flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
          <Avatar className="h-12 w-12 border border-zinc-200">
            <AvatarFallback className="bg-white text-[15px] font-bold text-zinc-700">{getInitials(customer.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-zinc-900">{customer.name}</span>
            <span className="text-[13px] font-medium text-zinc-400">Customer #{customer.customer_id}</span>
          </div>
        </div>

        {/* 🔹 상세 정보 리스트 */}
        <div className="flex flex-col gap-1">
          <InfoRow icon={<Phone size={14} />} label="연락처" value={customer.phone} />
          <InfoRow icon={<Mail size={14} />} label="이메일" value={customer.email} />
          <InfoRow icon={<MapPin size={14} />} label="주소" value={customer.address} />
          <InfoRow icon={<Calendar size={14} />} label="생년월일" value={formatBirthdate(customer.birthdate)} />
        </div>
      </div>
    </motion.div>
  );
}

// 🔹 개별 정보 행을 렌더링하는 헬퍼 컴포넌트
const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) => {
  return (
    <div className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-50">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500">{icon}</div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">{label}</span>
        <span className={`text-[13px] leading-relaxed break-keep ${!value ? 'text-zinc-400 italic' : 'font-medium text-zinc-700'}`}>
          {value || '정보 없음'}
        </span>
      </div>
    </div>
  );
};
