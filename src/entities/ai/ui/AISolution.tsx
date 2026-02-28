import { useMemo } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { InquiryType } from '@/shared/types/inquiry';
import { isToday } from '@/shared/lib/date';

interface AIInquirySolutionProps {
  items: InquiryType[];
}

export function AISolution({ items }: AIInquirySolutionProps) {
  // 간단한 데이터 분석 로직 (AI 시뮬레이션)
  const analysis = useMemo(() => {
    const total = items.length;
    const pending = items.filter(i => i.status === '대기');
    const urgent = pending.filter(i => !isToday(i.created_at)); // 오늘 생성되지 않은 대기 건 (지연)
    const emotions = items.filter(i => i.emotion === '화남' || i.emotion === '짜증'); // 부정 감정

    // 가장 많은 카테고리 찾기
    const categories = items.reduce(
      (acc, item) => {
        const catName = item.category || '기타'; // category 구조에 따라 수정 필요
        acc[catName] = (acc[catName] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

    return {
      pendingCount: pending.length,
      urgentCount: urgent.length,
      negativeCount: emotions.length,
      topCategoryName: topCategory ? topCategory[0] : '없음',
      topCategoryCount: topCategory ? topCategory[1] : 0,
    };
  }, [items]);

  return (
    <div className="flex-1">
      <div className="pb-3">
        <h2 className="text-2xl  text-ai font-semibold tracking-tight">AI Insight & Solution</h2>
        <p className="mt-1 text-sm text-muted-foreground">현재 접수된 문의 데이터를 분석하여 최적의 해결책을 제안합니다.</p>
      </div>

      <div className="grid gap-4">
        {analysis.urgentCount > 0 ? (
          <div className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-900/20">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
            <div className="grid gap-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-200">답변 지연 리스크 감지</p>
              <p className="text-xs text-red-700 dark:text-red-300">
                24시간 이상 답변 대기 중인 건이 <span className="font-bold">{analysis.urgentCount}건</span> 있습니다. 고객 만족도 하락이 우려됩니다.
              </p>
              <Button size="sm" variant="outline" className="mt-2 h-7 w-fit border-red-200 text-red-700 hover:bg-red-100 hover:text-red-900">
                지연 건 우선 처리하기 <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 p-3 dark:border-green-900/50 dark:bg-green-900/20">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800 dark:text-green-200">현재 지연 중인 문의가 없습니다. 훌륭해요!</p>
          </div>
        )}

        {/* 2. 트렌드 분석 및 제안 */}
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-violet-900 dark:text-violet-100">주요 트렌드 분석</h4>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{analysis.topCategoryName}</span> 관련 문의 급증 ({analysis.topCategoryCount}건)
              </span>
            </div>
            {analysis.negativeCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-red-500" />
                <span className="text-muted-foreground">
                  부정 감정(불만/화남) 문의 비율 <span className="font-medium text-red-600">{((analysis.negativeCount / items.length) * 100).toFixed(1)}%</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
