import Link from 'next/link';
import { StateBadge } from '@/entities/inquiry';
import { InquiryType } from '@/shared/types/inquiry';

interface PastInquiryListProps {
  inquiries: InquiryType[];
}

export function PastInquiryList({ inquiries }: PastInquiryListProps) {
  if (!inquiries || inquiries.length === 0) {
    return <div className="p-4 text-center text-sm text-muted-foreground">과거 상담 이력이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {inquiries.map(inquiry => (
        <Link
          key={inquiry.id}
          href={`/inquiry/${inquiry.id}`} // 해당 이력의 상세 페이지로 이동
          className="block rounded-lg border p-4 transition-all hover:bg-accent"
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="font-semibold">{inquiry.title}</span>
            <StateBadge status={inquiry.status} />
          </div>
          <div className="mb-2 text-sm text-muted-foreground">
            {new Date(inquiry.createdAt).toLocaleString('ko-KR')}
          </div>
          <div className="line-clamp-2 text-sm text-muted-foreground">{inquiry.aiSummary}</div>
        </Link>
      ))}
    </div>
  );
}
