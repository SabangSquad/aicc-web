import { storeAPI } from '@/entities/store';
import { ChatPage } from '@/pages/chat';

export async function generateMetadata({ params }: { params: Promise<{ id?: number }> }) {
  const { id } = await params;

  if (!id) {
    return {
      title: '가게를 찾을 수 없습니다',
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
