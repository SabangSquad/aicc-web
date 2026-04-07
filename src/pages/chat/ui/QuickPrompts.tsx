import { motion } from 'framer-motion';
import { Clock, MapPin, Star, ArrowUpRight, Megaphone, Accessibility } from 'lucide-react';
import { StoreType } from '@/entities/store';

export const QUICK_PROMPTS = [
  { id: 1, type: 'hours', icon: <Clock size={18} />, text: '영업 시간 알려줘' },
  { id: 2, type: 'location', icon: <MapPin size={18} />, text: '어떻게 찾아가?' },
  { id: 3, type: 'wifi', icon: <Star size={18} />, text: '와이파이 사용 가능해?' },
  { id: 4, type: 'wheelchair', icon: <Accessibility size={18} />, text: '휠체어 사용할 수 있어?' },
  { id: 5, type: 'notice', icon: <Megaphone size={18} />, text: '공지사항 다시 보여줘' },
  { id: 6, type: 'parking', icon: <Star size={18} />, text: '주차 공간 있어?' },
] as const;

export type QuickPromptType = (typeof QUICK_PROMPTS)[number];

const formatBusinessHours = (hours: Record<string, string>) => {
  const dayMap: Record<string, string> = {
    mon: '월요일',
    tue: '화요일',
    wed: '수요일',
    thu: '목요일',
    fri: '금요일',
    sat: '토요일',
    sun: '일요일',
  };

  const schedule = Object.entries(hours).map(([day, time]) => ({
    day: dayMap[day] || day,
    time: time.toLowerCase() === 'off' ? '휴무' : time,
  }));

  const groups: { days: string[]; time: string }[] = [];

  schedule.forEach(item => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.time === item.time) {
      lastGroup.days.push(item.day);
    } else {
      groups.push({ days: [item.day], time: item.time });
    }
  });

  return groups
    .map(group => {
      const daysText = group.days.length > 1 ? `${group.days[0]}~${group.days[group.days.length - 1]}` : group.days[0];
      return `${daysText}: ${group.time}`;
    })
    .join('\n');
};

interface QuickPromptsProps {
  storeData: StoreType;
  onAction: (userText: string, aiText: string) => void;
}

export const QuickPrompts = ({ storeData, onAction }: QuickPromptsProps) => {
  console.log('Store Data in QuickPrompts:', storeData);
  const handleClick = (prompt: QuickPromptType) => {
    let answer = '';

    switch (prompt.type) {
      case 'hours':
        if (storeData.business_hours) {
          const formattedHours = formatBusinessHours(storeData.business_hours);
          answer = `저희 매장의 영업 시간은 다음과 같습니다.\n\n${formattedHours}`;
        } else {
          answer = '현재 영업 시간 정보가 등록되어 있지 않습니다.';
        }
        break;
      case 'location':
        answer = storeData.address ? `저희 매장은 "${storeData.address}"에 위치하고 있습니다.` : '현재 주소 정보가 등록되어 있지 않습니다.';
        break;
      case 'wifi':
        answer = storeData.facilities?.wifi ? '네, 매장 내에서 무료 와이파이를 사용하실 수 있습니다!' : '죄송합니다. 현재 와이파이를 제공하고 있지 않습니다.';
        break;
      case 'wheelchair':
        const hasWheelchair = storeData.facilities?.['휠체어'];
        answer = hasWheelchair
          ? '네, 저희 병원은 휠체어 이용이 가능하도록 시설이 갖춰져 있습니다. 편하게 방문해 주세요! 😊'
          : '죄송합니다. 현재 저희 병원은 휠체어 전용 시설이나 진입로가 미비하여 이용이 어려울 수 있습니다. ';
        break;
      case 'notice':
        answer = storeData.notice ? `📢 최근 공지사항입니다.\n\n"${storeData.notice}"` : '현재 등록된 특별한 공지사항이 없습니다.';
        break;
      case 'parking':
        answer = storeData.facilities?.['주차']
          ? '네, 주차 공간이 마련되어 있습니다.'
          : '죄송합니다. 주차 공간이 마련되어 있지 않습니다. 대중교통 이용을 권장합니다.';
        break;
    }

    onAction(prompt.text, answer);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 w-full max-w-[340px]">
      <p className="mb-3 px-2 text-[13px] font-medium text-zinc-500">클릭하면 바로 물어볼 수 있어요</p>

      <div className="flex w-full flex-col gap-2">
        {QUICK_PROMPTS.map(prompt => (
          <motion.button
            key={prompt.id}
            whileHover={{ scale: 1.01, backgroundColor: '#fafafa' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(prompt)}
            className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-100 bg-white px-4 py-3 text-left shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="text-zinc-800">{prompt.icon}</div>
              <span className="text-[14.5px] font-medium text-zinc-700">{prompt.text}</span>
            </div>
            <ArrowUpRight size={16} className="text-zinc-300 transition-colors group-hover:text-zinc-400" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
