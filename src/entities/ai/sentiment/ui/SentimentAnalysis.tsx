import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function SentimentAnalysis() {
  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle className="text-ai">AI 감정 분석</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-light-red p-4 rounded-xl text-black-primary">
          <div className="flex justify-between mb-2 font-bold text-lg ">
            <span>🤬 화남</span>
            <span>70%</span>
          </div>
          <div className="text-sm">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col flex-1 bg-white rounded-xl p-2">
                <span>음성 톤</span>
                <span className="text-black-secondary">높음</span>
              </div>
              <div className="flex flex-col flex-1 bg-white rounded-xl p-2">
                <span>응답속도</span>
                <span className="text-black-secondary">중간</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1 text-sm bg-white p-2 rounded-lg">
            <span>분석</span>
            <span className="text-black-secondary">
              고객의 톤에서 약간의 불안감이 감지됩니다. 친근하고 안심시키는 톤으로 응답하세요.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
