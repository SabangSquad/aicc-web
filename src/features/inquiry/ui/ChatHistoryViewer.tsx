'use client';
import { cn } from '@/shared/lib/utils';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Bot, User } from 'lucide-react';
import { Message } from '@/entities/inquiry';
import { useCaseMessages } from '@/entities/inquiry/hooks/useInquiryQuery';

export function ChatHistoryViewer({ caseId }: { caseId: number | string }) {
  const { data: chatLogs } = useCaseMessages(caseId);
  if (!chatLogs || chatLogs.length === 0) {
    return <div className="p-4 text-center text-sm text-muted-foreground">챗봇/보이스봇 대화 내역이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-4">
        <h3 className="font-semibold">챗봇/보이스봇 이력 ({chatLogs.length})</h3>
      </div>
      <ScrollArea className="flex-1 h-0">
        <div className="space-y-6 p-4">
          <div className="flex flex-col gap-3">
            {chatLogs.map(msg => (
              <ChatMessageBubble key={msg.message_id} message={msg} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function ChatMessageBubble({ message }: { message: Message }) {
  const isUser = message.speaker === '고객';

  return (
    <div className={cn('flex items-start gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}

      {/* 말풍선 */}
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3 text-sm',
          isUser
            ? 'rounded-br-none bg-blue-600 text-white' // 유저 말풍선
            : 'rounded-bl-none bg-muted' // 봇 말풍선
        )}
      >
        <p className="leading-relaxed">{message.content}</p>
        <p className={cn('mt-1.5 text-xs', isUser ? 'text-blue-200' : 'text-muted-foreground')}>
          {new Date(message.occurred_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
