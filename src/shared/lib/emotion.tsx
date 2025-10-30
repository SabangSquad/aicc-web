import { Smile, Meh, Frown } from 'lucide-react';
import { ChartConfig } from '../ui/chart';

export const chartConfig = {
  positive: {
    label: '긍정',
    color: 'var(--positive-color)',
    icon: () => <Smile className="w-4 h-4" style={{ color: 'var(--positive-color)' }} />,
  },
  neutral: {
    label: '중립',
    color: 'var(--neutral-color)',
    icon: () => <Meh className="w-4 h-4" style={{ color: 'var(--neutral-color)' }} />,
  },
  negative: {
    label: '부정',
    color: 'var(--negative-color)',
    icon: () => <Frown className="w-4 h-4" style={{ color: 'var(--negative-color)' }} />,
  },
} satisfies ChartConfig;
