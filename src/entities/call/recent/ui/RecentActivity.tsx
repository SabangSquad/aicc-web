import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { ArrowRight, Check, Phone } from 'lucide-react';

type ActivityType = 'success' | 'call' | 'next';

interface RecentActivityItemProps {
  type: ActivityType;
  title: string;
  description: string;
}

const iconMap = {
  success: <Check />,
  call: <Phone className="w-4 h-4" strokeWidth={1} fill="#2e5cdc" />,
  next: <ArrowRight />,
};

const bgMap = {
  success: 'bg-light-green text-deep-green',
  call: 'bg-light-blue text-deep-blue',
  next: 'bg-light-yellow text-deep-yellow',
};

export function RecentActivity() {
  const items: RecentActivityItemProps[] = [
    { type: 'success', title: '통화 기록 1 문의해결', description: '2025.04.30 12:40' },
    { type: 'call', title: '통화 기록 2', description: '2025.04.30 12:40' },
    { type: 'next', title: '통화 기록 3', description: '최근에 완료된 통화 기록입니다.' },
    { type: 'next', title: '통화 기록 3', description: '최근에 완료된 통화 기록입니다.' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex flex-col max-h-72 px-2">
          {items.map((item, idx) => (
            <RecentActivityItem key={idx} {...item} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function RecentActivityItem({ type, title, description }: RecentActivityItemProps) {
  return (
    <Item variant="muted" className={`mb-2 ${bgMap[type]}`}>
      <ItemMedia className={`bg-white rounded-full p-2 flex items-center justify-center w-10 h-10`}>
        {iconMap[type]}
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
