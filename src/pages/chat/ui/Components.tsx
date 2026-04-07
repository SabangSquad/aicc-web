'use client';
import { chatAPI } from '@/entities/chat';
import { Star, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ChatMessage } from '../types/chat';
import { motion } from 'motion/react';
import { casesAPI } from '@/entities/cases';

interface ChatCloseButtonProps {
  currentCaseId: number | null;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}
export const ChatCloseButton = ({ currentCaseId, setMessages }: ChatCloseButtonProps) => {
  const handleCloseChat = async () => {
    if (!currentCaseId) return;

    try {
      await chatAPI.postChatClose(currentCaseId);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: '상담이 종료되었습니다. 이용해 주셔서 감사합니다.',
          isAi: true,
          isLoginRequired: false,
          isRating: true,
        },
      ]);
    } catch {
      toast.error('채팅 종료 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {currentCaseId && (
        <button
          onClick={handleCloseChat}
          className="absolute top-4 right-4 z-10 flex cursor-pointer items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
        >
          <XCircle size={16} />
          상담 종료
        </button>
      )}
    </>
  );
};

export const StarRatingUI = ({ store_id, case_id }: { store_id: string; case_id: number }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateScore = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    return isLeftHalf ? index - 0.5 : index;
  };

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-3">
      {!isSubmitted ? (
        <>
          <p className="text-[15px] font-semibold text-zinc-700">상담은 만족스러우셨나요?</p>
          <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map(index => {
              const displayScore = hover || rating;
              const isFull = displayScore >= index;
              const isHalf = displayScore >= index - 0.5 && displayScore < index;

              return (
                <div
                  key={index}
                  className="relative h-9 w-9 cursor-pointer transition-transform hover:scale-110"
                  onClick={e => {
                    if (!isSubmitted) setRating(calculateScore(e, index));
                  }}
                  onMouseMove={e => {
                    if (!isSubmitted) setHover(calculateScore(e, index));
                  }}
                >
                  <Star size={36} className="absolute top-0 left-0 text-zinc-200" strokeWidth={1} />
                  {isHalf && (
                    <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
                      <Star size={36} className="min-w-[36px] fill-yellow-400 text-yellow-400" strokeWidth={1} />
                    </div>
                  )}
                  {isFull && <Star size={36} className="absolute top-0 left-0 fill-yellow-400 text-yellow-400" strokeWidth={1} />}
                </div>
              );
            })}
          </div>

          <div className="flex w-full items-center justify-end pt-2">
            <button
              onClick={async () => {
                setIsSubmitted(true);
                await casesAPI.postSatisfaction({ case_id, score: rating, store_id });
              }}
              disabled={rating === 0}
              className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:bg-zinc-300"
            >
              제출하기
            </button>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-3 text-center">
          <p className="text-[15px] font-semibold text-zinc-700">소중한 의견 감사합니다! ✨</p>
        </motion.div>
      )}
    </div>
  );
};

export const ChatNotice = ({ notice }: { notice: string | null }) => {
  useEffect(() => {
    if (notice) {
      toast.success(notice, {
        duration: 5000,
      });
    }
  }, [notice]);

  return <></>;
};
