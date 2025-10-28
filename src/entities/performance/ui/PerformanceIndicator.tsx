import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Check, Clock9, Phone, Star } from 'lucide-react';

interface PerformanceItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  bgColor: string;
}

export function PerformanceIndicator() {
  const items: PerformanceItem[] = [
    {
      icon: <Phone fill="#2e5cdc" />,
      value: '24건',
      label: '오늘 통화',
      bgColor: 'bg-light-blue text-deep-blue',
    },
    {
      icon: <Clock9 />,
      value: '5분 32초',
      label: '평균통화 시간',
      bgColor: 'bg-light-green text-deep-green',
    },
    {
      icon: <Star fill="#ea5c12" />,
      value: '94%',
      label: '만족도',
      bgColor: 'bg-light-yellow text-deep-yellow',
    },
    {
      icon: <Check />,
      value: '87%',
      label: '해결률',
      bgColor: 'bg-light-purple text-deep-purple',
    },
  ];

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>성과 지표</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {items.map((item, idx) => (
            <PerformanceCard key={idx} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PerformanceCard({ icon, value, label, bgColor }: PerformanceItem) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl p-4 gap-2 ${bgColor}`}>
      <div className="bg-white p-4 rounded-full flex items-center justify-center">{icon}</div>
      <span className="font-semibold text-xl">{value}</span>
      <span className="text-black-primary text-sm">{label}</span>
    </div>
  );
}
