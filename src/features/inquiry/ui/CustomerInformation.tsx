'use client';
import { GradeBadge } from '@/entities/customer';
import { Customer } from '@/shared/types/customer';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { useEffect, useState } from 'react';

const ValueDisplay = ({ value }: { value: string | number }) => {
  return <span className={!value ? 'text-muted-foreground italic' : ''}>{value || 'N/A'}</span>;
};

export function CustomerInformation({ customerId }: { customerId: number }) {
  const [item, setItem] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        setIsLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}`);

        if (!res.ok) {
          throw new Error(`서버 응답 오류: ${res.statusText}`);
        }

        const data = await res.json();
        setItem(data);
      } catch (err: any) {
        console.error('고객 정보 로드 실패:', err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCustomer();
  }, [customerId]);
  const getInitials = (name: string) => {
    return name ? name.substring(0, 1).toUpperCase() : 'U';
  };

  if (isLoading || !item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">고객 정보</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold">{item.name}</p>
              <GradeBadge grade={item.grade} />
            </div>

            <p className="text-sm text-muted-foreground">{item.email}</p>
            <p className="text-sm text-muted-foreground">{item.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <span className="font-medium text-muted-foreground">가입일</span>
          <ValueDisplay value={new Date(item.joined_at).toLocaleString('ko-KR')} />

          <span className="font-medium text-muted-foreground">적립금</span>
          <ValueDisplay value={item.points.toLocaleString('ko-KR')} />
        </div>
      </div>
    </div>
  );
}
