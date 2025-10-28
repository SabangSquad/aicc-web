import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';

export function RecommendAnswer() {
  return (
    <>
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle className="text-ai">AI 추천 답변</CardTitle>
        </CardHeader>
        <CardContent>
          <AnswerItem />
          <AnswerItem />
          <AnswerItem />
        </CardContent>
      </Card>
    </>
  );
}

function AnswerItem() {
  return (
    <Item variant="muted" className="mb-4">
      <ItemMedia>
        <div className="p-2 bg-ai rounded-full">📦</div>
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="text-black-primary">
          일반 배송: 2-3일, 당일 배송: 오후 6시 이전 주문시 가능, 제주/도서지역: 3-5일 추가 소요
        </ItemTitle>
        <ItemDescription>배송/정책</ItemDescription>
      </ItemContent>
    </Item>
  );
}
