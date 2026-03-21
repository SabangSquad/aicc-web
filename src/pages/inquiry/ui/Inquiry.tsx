import { DUMMY_INQUIRIES } from '@/entities/inquiry/data';
import { InquiryPage } from './InquiryPage';
import { InquiryAPI } from '@/entities/inquiry';

export async function Inquiry() {
  // const items = await InquiryAPI.getListByAgent(3);
  const items = DUMMY_INQUIRIES;

  return <InquiryPage items={items} />;
}
