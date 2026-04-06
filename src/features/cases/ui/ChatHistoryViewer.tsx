'use client';
import { Bot, User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { useCaseMessage } from '@/entities/cases';

export function ChatHistoryViewer({ caseId }: { caseId: number }) {
  const { data } = useCaseMessage(caseId);

  if (!data || data.length === 0) {
    return <div className="text-muted-foreground p-4 text-center text-sm">챗봇/보이스봇 대화 내역이 없습니다.</div>;
  }

  return (
    // 💡 부모 컴포넌트에서 이 컨테이너의 높이를 제한해주어야 스크롤이 발생합니다.
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex-shrink-0 p-4">
        <h3 className="font-semibold">챗봇/보이스봇 이력 ({data.length})</h3>
      </div>

      {/* 💡 flex-1과 min-h-0을 조합하여 남은 공간을 채우고 스크롤을 유도합니다. */}
      <ScrollArea className="min-h-0 w-full flex-1 px-4">
        <div className="flex flex-col gap-4 pb-4">
          {data.map(msg => (
            <ChatMessageBubble key={msg.message_id} message={msg} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ChatMessageBubble({ message }: { message: ReturnType<typeof useCaseMessage>['data'][number] }) {
  const isUser = message.speaker === '고객';

  return (
    <div className={cn('flex items-start gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="bg-primary text-primary-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div className={cn('max-w-[80%] rounded-lg p-3 text-sm', isUser ? 'rounded-br-none bg-black text-white' : 'bg-muted rounded-bl-none')}>
        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className={cn('mt-1.5 text-xs', isUser ? 'text-zinc-200' : 'text-muted-foreground')}>
          {new Date(message.occurred_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {isUser && (
        <div className="bg-muted flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
