'use client';

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { items } from '@/shared/data/inquiryItem';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';

const getAIProcessingRateData = () => {
  const dateMap: Record<string, { total: number; aiProcessed: number }> = {};

  items.forEach(item => {
    const date = item.createdAt.split('T')[0];
    if (!dateMap[date]) {
      dateMap[date] = { total: 0, aiProcessed: 0 };
    }
    dateMap[date].total += 1;
    if (item.processedByAI) {
      dateMap[date].aiProcessed += 1;
    }
  });

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 6); // 오늘 포함 7일치

  const result = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const { total = 0, aiProcessed = 0 } = dateMap[dateStr] || {};
    result.push({ date: dateStr.slice(5), rate: total ? Number(((aiProcessed / total) * 100).toFixed(1)) : 0 }); // MM-DD만 표시
  }

  return result;
};

export const chartConfig = {
  rate: {
    label: 'AI 자동 처리율',
    color: 'var(--chart-1)',
  },
};

export function InquiryAIChart() {
  const data = getAIProcessingRateData();

  return (
    <div className="flex flex-col pb-10">
      {/* 제목과 설명 */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ai">AI 자동 처리율</h2>
        <p className="mt-1 text-muted-foreground">
          최근 문의 내역 기준으로 날짜별 AI 답변 처리율을 확인할 수 있습니다.
        </p>
      </div>

      {/* 차트 */}
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis unit="%" domain={[0, 100]} axisLine={false} tickLine={false} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={chartConfig.rate.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.rate.color }}
              activeDot={{ r: 3 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
