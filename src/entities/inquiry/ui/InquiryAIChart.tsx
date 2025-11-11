'use client';

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

type InquiryItem = {
  createdAt: string;
  processedByAI: boolean;
};

type AIChartData = {
  date: string;
  rate: number;
};

const CHART_CONFIG = {
  rate: {
    label: 'AI 자동 처리율',
    color: 'var(--chart-1)',
  },
};

/**
 * 최근 7일 기준 AI 처리율 데이터 생성
 */
const getAIProcessingRateData = (items: InquiryItem[]): AIChartData[] => {
  const dateMap = new Map<string, { total: number; aiProcessed: number }>();

  items.forEach(item => {
    const date = item.createdAt.split('T')[0];
    const entry = dateMap.get(date) ?? { total: 0, aiProcessed: 0 };
    entry.total += 1;
    if (item.processedByAI) {
      entry.aiProcessed += 1;
    }
    dateMap.set(date, entry);
  });

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 6); // 오늘 포함 7일

  const data: AIChartData[] = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const { total = 0, aiProcessed = 0 } = dateMap.get(dateStr) ?? {};
    data.push({
      date: dateStr.slice(5), // MM-DD
      rate: total ? Number(((aiProcessed / total) * 100).toFixed(1)) : 0,
    });
  }

  return data;
};

export function InquiryAIChart({ items }: { items: InquiryItem[] }) {
  const data = getAIProcessingRateData(items);

  return (
    <div className="flex flex-col pb-10">
      {/* 제목과 설명 */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ai">{CHART_CONFIG.rate.label}</h2>
        <p className="mt-1 text-muted-foreground">
          최근 문의 내역 기준으로 날짜별 AI 답변 처리율을 확인할 수 있습니다.
        </p>
      </div>

      {/* 차트 */}
      <ChartContainer config={CHART_CONFIG}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis unit="%" domain={[0, 100]} axisLine={false} tickLine={false} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={CHART_CONFIG.rate.color}
              strokeWidth={2}
              dot={{ fill: CHART_CONFIG.rate.color }}
              activeDot={{ r: 3 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
