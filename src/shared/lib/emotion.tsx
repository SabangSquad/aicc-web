import { Smile, Frown, Angry, Laugh, Annoyed } from 'lucide-react';
import { ChartConfig } from '../ui/chart';

export const chartConfig: ChartConfig = {
  기쁨: {
    label: '기쁨',
    color: 'var(--laugh-color)',
    icon: () => <Laugh className="w-4 h-4" style={{ color: 'var(--laugh-color)' }} />,
  },
  평온: {
    label: '평온',
    color: 'var(--smile-color)',
    icon: () => <Smile className="w-4 h-4" style={{ color: 'var(--smile-color)' }} />,
  },
  화남: {
    label: '화남',
    color: 'var(--angry-color)',
    icon: () => <Angry className="w-4 h-4" style={{ color: 'var(--angry-color)' }} />,
  },
  슬픔: {
    label: '슬픔',
    color: 'var(--frown-color)',
    icon: () => <Frown className="w-4 h-4" style={{ color: 'var(--frown-color)' }} />,
  },
  짜증: {
    label: '짜증',
    color: 'var(--annoyed-color)',
    icon: () => <Annoyed className="w-4 h-4" style={{ color: 'var(--annoyed-color)' }} />,
  },
} satisfies ChartConfig;

export const emotionMap = {
  기쁨: { emoji: '😄', color: 'var(--laugh-bg)' },
  평온: { emoji: '🙂', color: 'var(--smile-bg)' },
  화남: { emoji: '😡', color: 'var(--angry-bg)' },
  짜증: { emoji: '😤', color: 'var(--annoyed-bg)' },
  슬픔: { emoji: '😢', color: 'var(--frown-bg)' },
} as const;
