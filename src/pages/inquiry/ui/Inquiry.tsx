import { InquiryPage } from './InquiryPage';
import { InquiryAPI } from '@/entities/inquiry';

export async function Inquiry() {
  const items = await InquiryAPI.getListByAgent(3);

  if (!items) {
    return null;
  }
  return <InquiryPage items={items} />;
}
