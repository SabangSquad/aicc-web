import { emotionMap } from '@/shared/lib/emotion';
import { InquiryType } from '@/shared/types/inquiry';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/shared/ui/item';

export function AIAssist({ inquiry }: { inquiry: InquiryType }) {
  const emo = emotionMap[inquiry.emotion];

  return (
    <>
      <div>
        <h3 className="mb-3 text-lg font-medium text-ai">AI 상담 요약</h3>
        <Item variant="muted" className="mb-4">
          <ItemContent>
            <ItemTitle className="text-black-primary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur in illo velit voluptatem consectetur
              ut ad reprehenderit veniam omnis distinctio et sequi, molestiae, quam dolore, nostrum minima tenetur
              perspiciatis eveniet.
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex-1">
          <h3 className="mb-3 text-lg font-medium text-ai">AI 감정 분석</h3>
          <div className="p-4 rounded-lg text-black-primary" style={{ backgroundColor: emo.color }}>
            <div className="flex mb-2 font-bold text-lg">
              {emo.emoji} {inquiry.emotion}
            </div>
            <div className="text-sm bg-white p-2 rounded-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, harum? Hic maiores sit eius cum!
              Fugiat nam ea temporibus, fuga voluptatem molestias amet modi aliquam corporis sequi eligendi nobis
              repudiandae!
            </div>
          </div>
        </div>
        <div className="flex-1">
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
