import { Emotion } from '../types/emotion';
import { InquiryType } from '../types/inquiry';

const EMOTION_PHRASES: Record<Emotion, string[]> = {
  기쁨: [
    '매우 긍정적인 상태이며, 활발히 반응하고 있습니다.',
    '기분이 좋아 문의에 적극적으로 참여할 가능성이 높습니다.',
  ],
  평온: [
    '차분하고 안정적인 상태이며, 일관된 반응을 보입니다.',
    '안정적인 감정 상태로 문의가 원활하게 진행될 것으로 보입니다.',
  ],
  화남: [
    '불만을 느끼며 다소 공격적인 반응이 있을 수 있습니다.',
    '즉각적인 해결책을 원하며, 반응이 강하게 나올 수 있습니다.',
  ],
  슬픔: ['실망하거나 우울한 상태로, 소극적인 반응이 예상됩니다.', '감정이 낮아 공감과 이해가 필요합니다.'],
  짜증: [
    '불편함을 느끼며 짧고 날카로운 반응이 나올 수 있습니다.',
    '조금 성급하거나 짜증이 섞인 반응이 있을 수 있습니다.',
  ],
};

const ACTION_PHRASES = [
  '조치가 필요해 보입니다.',
  '신속한 대응이 권장됩니다.',
  '적절한 안내와 해결책이 요구됩니다.',
  '즉시 확인 후 조치를 권장합니다.',
];

const OPENING_PHRASES = ['고객이', '문의자가', '사용자가'];

export function generateDummySummary(inquiry: InquiryType) {
  const { title, emotion, content } = inquiry;

  const opening = OPENING_PHRASES[Math.floor(Math.random() * OPENING_PHRASES.length)];
  const emotionDescArr = EMOTION_PHRASES[emotion] || ['감정 상태를 파악할 수 없습니다.'];
  const emotionDesc = emotionDescArr[Math.floor(Math.random() * emotionDescArr.length)];
  const action = ACTION_PHRASES[Math.floor(Math.random() * ACTION_PHRASES.length)];

  return `${opening} "${title}"에 대한 문제 해결을 원하고 있습니다. "${content}"에 대한 ${action} 고객은 현재 ${emotion} 상태로 보이며, ${emotionDesc}`;
}
