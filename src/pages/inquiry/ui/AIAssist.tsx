import { InquiryType } from '@/shared/types/inquiry';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';

export function AIAssist({ inquiry }: { inquiry: InquiryType }) {
  return (
    <>
      <div>
        <h3 className="mb-3 text-lg font-medium text-ai">AI 상담 요약</h3>
        <Item variant="muted" className="mb-4">
          <ItemContent>
            <ItemTitle className="text-black-primary">{inquiry.aiSummary}</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex flex-row gap-6">
        <div>
          <h3 className="mb-3 text-lg font-medium text-ai">AI 감정 분석</h3>
          <div className="bg-light-red p-4 rounded-lg text-black-primary">
            <div className="flex mb-2 font-bold text-lg ">
              <span>🤬 화남</span>
            </div>
            <div className="mt-4 flex flex-col gap-1 text-sm bg-white p-2 rounded-lg">
              <span>분석</span>
              <span className="text-black-secondary">
                고객의 톤에서 약간의 불안감이 감지됩니다. 친근하고 안심시키는 톤으로 응답하세요.
              </span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-medium text-ai">AI 답변 추천</h3>
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
        </div>
      </div>
    </>
  );
}
