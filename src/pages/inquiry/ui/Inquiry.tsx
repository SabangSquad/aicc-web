import { DUMMY_INQUIRIES } from '@/entities/inquiry/data';
import { InquiryPage } from './InquiryPage';
import { InquiryAPI } from '@/entities/inquiry';
import { storeAPI } from '@/entities/store/api/api';

export async function Inquiry() {
  // const items = await InquiryAPI.getListByAgent(3);
  const items = await storeAPI.getCases(1);

  return <InquiryPage items={items} />;
}
