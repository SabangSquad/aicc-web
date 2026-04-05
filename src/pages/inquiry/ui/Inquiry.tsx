import { InquiryPage } from './InquiryPage';
import { storeAPI } from '@/entities/store';

export async function Inquiry() {
  const items = await storeAPI.getCases(1);

  // '대기' 상태인 항목을 먼저 정렬하고, 그 다음에 생성 날짜를 기준으로 내림차순으로 정렬
  const sortedItems = [...items].sort((a, b) => {
    if (a.status === '대기' && b.status !== '대기') return -1;
    if (a.status !== '대기' && b.status === '대기') return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return <InquiryPage items={sortedItems} />;
}
