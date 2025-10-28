'use client';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { items } from '@/shared/data/inquiryItem';

import { StateBadge } from './StateBadge';

export function InquiryTable() {
  const router = useRouter();
  return (
    <div className="lg:col-span-2 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">처리해야 할 업무 목록</h2>
        <p className="mt-1 text-muted-foreground">오래된 문의부터 확인하고 처리해 주세요.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>상태</TableHead>
            <TableHead className="w-[100px]">문의 제목</TableHead>
            <TableHead className="hidden md:table-cell">고객명</TableHead>
            <TableHead className="text-right">접수 시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id} className="cursor-pointer" onClick={() => router.push(`/inquiry/${item.id}`)}>
              <TableCell>
                <StateBadge status={item.status} />
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="hidden md:table-cell">{item.customerName}</TableCell>
              <TableCell className="text-right">{new Date(item.createdAt).toLocaleString('ko-kr')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
