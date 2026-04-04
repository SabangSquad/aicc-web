import { storeAPI } from '@/entities/store';
import { ChatPage } from '@/pages/chat';

export async function generateMetadata({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  if (!id) {
    return {
      title: '다시 접속해주세요 ',
      description: 'Chat with AI',
    };
  }
  const storeData = await storeAPI.getStoreInfomation(id);

  return {
    title: `${storeData.name} 챗봇 페이지`,
    description: 'Chat with AI',
  };
}

export default ChatPage;
