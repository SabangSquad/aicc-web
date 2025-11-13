import Link from 'next/link';
import { StateBadge } from './StateBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { InquiryType } from '@/shared/types/inquiry';

export function InquiryTable({ items }: { items: InquiryType[] }) {
  return (
    <div className="space-y-4 lg:col-span-2">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">처리해야 할 업무 목록</h2>
        <p className="mt-1 text-muted-foreground">오래된 문의부터 확인하고 처리해 주세요.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>상태</TableHead>
            <TableHead className="w-[100px]">문의 제목</TableHead>
            <TableHead className="hidden md:table-cell">카테고리</TableHead>
            <TableHead className="text-right">접수 시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <Link key={item.case_id} href={`/inquiry/${item.case_id}`} className="contents">
              <TableRow className="cursor-pointer hover:bg-muted/50 transition">
                <TableCell>
                  <StateBadge status={item.status} />
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                <TableCell className="text-right">{new Date(item.created_at).toLocaleString('ko-kr')}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
