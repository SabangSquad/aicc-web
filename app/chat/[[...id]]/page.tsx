import { ChatPage } from '@/pages/chat';

export async function generateMetadata({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  return {
    title: `Chat : ${id}`,
    description: 'Chat with AI',
  };
}

export default ChatPage;
