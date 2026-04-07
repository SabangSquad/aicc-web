'use client';
import { chatAPI } from '@/entities/chat';
import { Calendar, Check, Star, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ChatMessage } from '../types/chat';
import { AnimatePresence, motion } from 'motion/react';
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

interface ReservationFormProps {
  availableTimes?: string[];
}
export const ReservationForm = ({
  availableTimes = ['04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
}: ReservationFormProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-4 border-t border-zinc-100 pt-6">
      <AnimatePresence mode="wait">
        {!selectedTime ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-zinc-500" />
              <p className="text-[15px] font-semibold text-zinc-700">방문 예정 시간을 선택해 주세요</p>
            </div>

            <div className="grid w-full grid-cols-4 gap-2">
              {availableTimes.map(time => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(time)}
                  className="flex cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white py-3 text-[14px] font-medium text-zinc-600 transition-all hover:border-zinc-800 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  {time}
                </motion.button>
              ))}
            </div>

            <div className="flex w-full items-center justify-start pt-1">
              <p className="text-[11px] font-medium text-zinc-400">* 버튼을 클릭하면 예약이 확정됩니다.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-2 text-center"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center text-emerald-500">
              <Check size={24} />
            </div>
            <p className="text-[15px] font-semibold text-zinc-700">{selectedTime} 예약이 완료되었습니다! </p>
            <p className="mt-1 text-[13px] text-zinc-500">방문 시간에 맞춰 와주세요.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
