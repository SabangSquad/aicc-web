'use client';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { SendHorizontal } from 'lucide-react';

interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
}

export function Chatting() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'other', text: '안녕하세요! 무엇을 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) {
      return;
    }
    setMessages(prev => [...prev, { id: Date.now(), sender: 'me', text: input }]);
    setInput('');
  };

  useEffect(() => {
    const scrollViewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollViewport) {
      scrollViewport.scrollTo({
        top: scrollViewport.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle>채팅</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col h-full">
        <ScrollArea ref={scrollRef} className="flex-1 w-full overflow-hidden">
          <div className="space-y-3 py-2 pr-2 w-full">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[75%] break-all text-sm whitespace-pre-wrap flex-shrink-0 ${
                    msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 mt-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
