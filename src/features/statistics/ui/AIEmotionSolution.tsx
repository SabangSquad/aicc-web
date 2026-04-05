'use client';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer } from '@/shared/ui/chart';
import { CaseType } from '@/shared/types/case';
import { EmotionType } from '@/shared/types/emotion';

const EMOTION_SCORE_MAP: Record<EmotionType, number> = {
  기쁨: 100, // -> 100°C
  평온: 50, // -> 36.5°C (기준)
  슬픔: 30, // -> 약 22°C
  짜증: 15, // -> 약 11°C
  화남: 0, // -> 0°C
};

export function AIEmotionSolution({ items }: { items: CaseType[] }) {
  const totalInquiries = items.length;

  // 1. 평균 점수 계산 (0~100)
  const totalScore = items.reduce((acc, item) => acc + (EMOTION_SCORE_MAP[item.emotion] ?? 50), 0);
  const avgScore = totalInquiries > 0 ? totalScore / totalInquiries : 50;

  // 2. 점수를 온도로 변환 (Piecewise Linear Scaling)
  // 0~50점 구간: 0°C ~ 36.5°C (기울기 0.73)
  // 50~100점 구간: 36.5°C ~ 100°C (기울기 1.27)
  let currentTemperature: number;
  if (avgScore <= 50) {
    currentTemperature = avgScore * 0.73;
  } else {
    currentTemperature = 36.5 + (avgScore - 50) * 1.27;
  }

  const displayTemp = parseFloat(currentTemperature.toFixed(1));

  // 3. 온도별 색상 전략
  let tempColor = '#3b82f6'; // 저온: 블루
  if (displayTemp >= 70) {
    tempColor = '#ef4444'; // 고온(매우 좋음): 레드
  } else if (displayTemp >= 36.5) {
    tempColor = '#10b981'; // 적정~훈훈: 그린/에메랄드
  } else if (displayTemp >= 20) {
    tempColor = '#f59e0b'; // 미지근(주의): 앰버
  }

  const chartData = [{ name: '마음 온도', value: avgScore, fill: tempColor }];

  return (
    <div className="flex h-full flex-col" data-testid="emotion-temp-card">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">감정 분석 온도</h2>
        <p className="text-md text-muted-foreground mt-1">
          {totalInquiries > 0 ? '챗봇과의 채팅을 분석한 고객의 감정온도입니다.' : '데이터가 쌓이길 기다리고 있어요.'}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <ChartContainer config={{}} className="mx-auto aspect-square w-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 + avgScore * 1.8} // 바의 길이는 점수(0~100)에 비례
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-zinc-100 last:fill-white" polarRadius={[86, 74]} />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-zinc-800 text-4xl font-bold">
                          {displayTemp}°C
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-zinc-400 text-xs font-medium">
                          {displayTemp >= 60
                            ? '열정적인 핫플 🔥'
                            : displayTemp >= 36.5
                              ? '훈훈한 분위기 🌿'
                              : displayTemp >= 20
                                ? '조금 서늘해요 ☁️'
                                : '영하권 주의보 ❄️'}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
