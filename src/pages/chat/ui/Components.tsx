'use client';
import { chatAPI } from '@/entities/chat';
import { Calendar, Check, Star, XCircle, Loader2, Users, Minus, Plus, Clock } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { useReservationAction } from '@/entities/reservation';
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

export const StarRatingUI = ({ store_id, case_id }: { store_id: number; case_id: number }) => {
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
      toast.message(notice, {
        duration: 5000,
      });
    }
  }, [notice]);

  return <></>;
};

interface AvailableSlot {
  date: string;
  time: string;
}
interface ReservationFormProps {
  availableSlots?: AvailableSlot[];
  store_id?: number;
  customer_id?: number;
}
export const ReservationForm = ({ availableSlots = [{ date: '2026-04-21', time: '10:00' }], store_id, customer_id }: ReservationFormProps) => {
  const groupedSlots = useMemo(() => {
    return availableSlots.reduce(
      (acc, slot) => {
        if (!acc[slot.date]) {
          acc[slot.date] = [];
        }
        acc[slot.date].push(slot);
        return acc;
      },
      {} as Record<string, AvailableSlot[]>
    );
  }, [availableSlots]);

  const availableDates = Object.keys(groupedSlots).sort();

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0] || '');
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [headcount, setHeadcount] = useState<number>(2);
  const [isCompleted, setIsCompleted] = useState(false);

  const { addMutation } = useReservationAction();

  // availableDates가 변경될 경우 초기 선택 날짜 설정
  useEffect(() => {
    if (availableDates.length > 0 && !availableDates.includes(selectedDate)) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null); // 날짜가 바뀌면 선택된 시간 초기화
  };

  const handleSelectTime = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async () => {
    if (!selectedSlot) return;
    addMutation.mutate(
      {
        store_id: Number(store_id),
        customer_id: customer_id || null,
        reserved_at: `${selectedSlot.date}T${selectedSlot.time}:00`,
        headcount,
      },
      {
        onSuccess: () => {
          setIsCompleted(true);
        },
      }
    );
  };

  const timesForSelectedDate = groupedSlots[selectedDate] || [];

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-6 border-t border-zinc-100 pt-6">
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex w-full flex-col gap-6"
          >
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-zinc-500" />
                <p className="text-[12px] font-semibold text-zinc-700 sm:text-[15px]">방문 예정 날짜를 선택해 주세요</p>
              </div>

              <div className="grid w-full grid-cols-2 gap-2 pb-2 sm:flex sm:flex-wrap">
                {availableDates.map(date => {
                  const isSelected = selectedDate === date;
                  const formattedDate = new Date(date)
                    .toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })
                    .replace(/\./g, '/')
                    .replace(/ /g, '')
                    .slice(0, -1);

                  return (
                    <motion.button
                      key={date}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectDate(date)}
                      className={`min-w-[80px] shrink-0 cursor-pointer rounded-xl border py-2.5 text-[14px] font-medium transition-all ${
                        isSelected
                          ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50'
                      }`}
                    >
                      {formattedDate}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-zinc-500" />
                <p className="text-[12px] font-semibold text-zinc-700 sm:text-[15px]">시간을 선택해 주세요</p>
              </div>

              {timesForSelectedDate.length > 0 ? (
                <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                  {timesForSelectedDate.map((slot, index) => {
                    const isSelected = selectedSlot?.time === slot.time && selectedSlot?.date === slot.date;

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSelectTime(slot)}
                        className={`flex min-w-[80px] cursor-pointer items-center justify-center rounded-xl border py-3 text-[14px] font-medium transition-all ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50'
                        }`}
                      >
                        {slot.time}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex w-full items-center justify-center rounded-xl bg-zinc-50 py-8 text-[14px] text-zinc-500">선택 가능한 시간이 없습니다.</div>
              )}
            </div>

            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-zinc-500" />
                <p className="text-[12px] font-semibold text-zinc-700 sm:text-[15px]">방문 인원을 선택해 주세요</p>
              </div>

              <div className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-2">
                <Button
                  variant="ghost"
                  onClick={() => setHeadcount(prev => Math.max(1, prev - 1))}
                  disabled={headcount <= 1}
                  className="h-10 w-10 shrink-0 rounded-lg text-zinc-500 hover:bg-white hover:text-zinc-900 disabled:opacity-30"
                >
                  <Minus size={18} />
                </Button>

                <span className="text-[16px] font-bold text-zinc-800">{headcount}명</span>

                <Button
                  variant="ghost"
                  onClick={() => setHeadcount(prev => Math.min(20, prev + 1))}
                  className="h-10 w-10 shrink-0 rounded-lg text-zinc-500 hover:bg-white hover:text-zinc-900"
                >
                  <Plus size={18} />
                </Button>
              </div>
            </div>

            <div className="mt-2 w-full space-y-2">
              <Button
                onClick={handleSubmit}
                disabled={!selectedSlot || addMutation.isPending}
                className={`h-12 w-full rounded-xl text-[15px] font-bold transition-all ${
                  selectedSlot ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                {addMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : selectedSlot ? (
                  `${selectedSlot.time} / ${headcount}명 예약하기`
                ) : (
                  '시간을 선택해주세요'
                )}
              </Button>
              <div className="flex w-full items-center justify-center">
                <p className="text-[12px] font-medium text-zinc-400">선택 후 예약하기를 눌러 확정해주세요.</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-emerald-500">
              <Check size={28} />
            </div>
            <p className="text-[16px] font-bold text-zinc-800">
              {selectedSlot?.date} {selectedSlot?.time} / {headcount}명 예약 확정
            </p>
            <p className="mt-1.5 text-[14px] text-zinc-500">방문 시간에 맞춰 방문해주세요.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
