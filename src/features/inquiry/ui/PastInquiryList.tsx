import Link from 'next/link';
import { StateBadge } from '@/entities/inquiry';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { customerAPI } from '@/entities/customer/api/api';

export async function PastInquiryList({ customerId }: { customerId: number }) {
  const pastInquiries = await customerAPI.getPastInquiries(customerId);

  if (!pastInquiries || pastInquiries.length === 0) {
    return <div className="text-muted-foreground p-4 text-center text-sm">과거 상담 이력이 없습니다.</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 p-4">
        <h3 className="font-semibold">과거 상담 ({pastInquiries.length})</h3>
      </div>
      <ScrollArea className="h-0 flex-1">
        <div className="flex flex-col gap-2 p-4">
          {pastInquiries.map(inquiry => (
            <Link key={inquiry.case_id} href={`/inquiry/${inquiry.case_id}`} className="hover:bg-accent block rounded-lg border p-4 transition-all">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-semibold">{inquiry.summary}</span>
                <StateBadge status={inquiry.status} />
              </div>
              <div className="text-muted-foreground mb-2 text-sm">{new Date(inquiry.created_at).toLocaleString('ko-KR')}</div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
