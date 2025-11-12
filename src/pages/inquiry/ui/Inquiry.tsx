import { InquiryType } from '@/shared/types/inquiry';
import { InquiryPage } from './InquiryPage';

export async function Inquiry() {
  const items: InquiryType[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents/3/cases`)
    .then(res => res.json())
    .then(data => data.data);
  return <InquiryPage items={items} />;
}
