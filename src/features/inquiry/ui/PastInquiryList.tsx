'use client';
import Link from 'next/link';
import { StateBadge } from '@/entities/inquiry';
import { useCustomerCase } from '@/entities/inquiry/hooks/useInquiryQuery';
import { ScrollArea } from '@/shared/ui/scroll-area';

export function PastInquiryList({ customerId }: { customerId: number | string }) {
  const { data: pastInquiries } = useCustomerCase(customerId);

  if (!pastInquiries || pastInquiries.length === 0) {
    return <div className="p-4 text-center text-sm text-muted-foreground">과거 상담 이력이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-4">
        <h3 className="font-semibold">과거 상담 ({pastInquiries.length})</h3>
      </div>
      <ScrollArea className="flex-1 h-0">
        <div className="flex flex-col gap-2 p-4">
          {pastInquiries.map(inquiry => (
            <Link
              key={inquiry.case_id}
              href={`/inquiry/${inquiry.case_id}`}
              className="block rounded-lg border p-4 transition-all hover:bg-accent"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="font-semibold">{inquiry.title}</span>
                <StateBadge status={inquiry.status} />
              </div>
              <div className="mb-2 text-sm text-muted-foreground">
                {new Date(inquiry.created_at).toLocaleString('ko-KR')}
              </div>
              <div className="line-clamp-2 text-sm text-muted-foreground">{inquiry.content}</div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
