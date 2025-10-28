import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function Summary() {
  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle className="text-ai">AI 상담 요약</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="bg-light-purple px-3 py-2 rounded-xl mb-2">
          <span className="text-black-primary ">현재상담</span>
          <p className="text-black-secondary text-sm">상담 요약 내용이 여기에 표시됩니다.</p>
        </div>
        <div className="bg-light-gray px-3 py-2 rounded-xl mb-2">
          <span className="text-black-primary">핵심 키워드 추출</span>
          <p className="text-black-secondary text-sm">상담 요약 내용이 여기에 표시됩니다.</p>
        </div>
        <div className="bg-light-green px-3 py-2 rounded-xl mb-2">
          <span className="text-black-primary">권장 액션</span>
          <p className="text-black-secondary text-sm">상담 요약 내용이 여기에 표시됩니다.</p>
        </div>
      </CardContent>
    </Card>
  );
}
