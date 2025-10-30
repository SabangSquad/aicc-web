export interface ChatMessage {
  id: string;
  role: 'user' | 'bot'; // 사용자인지 봇인지
  message: string;
  timestamp: string;
}

export interface ChatLogType {
  logId: string;
  customerEmail: string; // 고객 식별자
  channel: 'chatbot' | 'voicebot'; // 발생 채널
  messages: ChatMessage[]; // 대화 내역
  createdAt: string;
}

// 챗봇 더미 데이터
export const mockChatLogs: ChatLogType[] = [
  {
    logId: 'cl-001',
    customerEmail: 'chulsoo.kim@example.com',
    channel: 'chatbot',
    createdAt: '2023-10-27T10:00:00Z',
    messages: [
      { id: 'm1', role: 'user', message: '월간 구독 결제가 안 돼요.', timestamp: '2023-10-27T10:00:15Z' },
      {
        id: 'm2',
        role: 'bot',
        message: '안녕하세요, 김철수님. 결제 수단 확인을 도와드릴게요. 혹시 카드 한도 초과 알림을 받으셨나요?',
        timestamp: '2023-10-27T10:00:30Z',
      },
      {
        id: 'm3',
        role: 'user',
        message: '아니요, 한도는 문제 없어요. 그냥 실패라고만 떠요.',
        timestamp: '2023-10-27T10:01:00Z',
      },
      {
        id: 'm4',
        role: 'bot',
        message: '불편을 드려 죄송합니다. 상담원 연결을 도와드릴까요?',
        timestamp: '2023-10-27T10:01:15Z',
      },
      { id: 'm5', role: 'user', message: '네, 연결해주세요.', timestamp: '2023-10-27T10:01:20Z' },
    ],
  },
  {
    logId: 'cl-002',
    customerEmail: 'younghee.lee@example.com', // q2 고객
    channel: 'voicebot',
    createdAt: '2023-10-26T14:00:00Z',
    messages: [
      { id: 'm1', role: 'user', message: '기능 에이 사용법 알려줘.', timestamp: '2023-10-26T14:00:05Z' },
      {
        id: 'm2',
        role: 'bot',
        message: '새로 추가된 기능 A의 리포트 생성 방법을 말씀하시는 것이 맞나요?',
        timestamp: '2023-10-26T14:00:15Z',
      },
      { id: 'm3', role: 'user', message: '응, 맞아.', timestamp: '2023-10-26T14:00:20Z' },
      {
        id: 'm4',
        role: 'bot',
        message: '해당 기능은 매뉴얼이 준비되어 있습니다. 이메일로 매뉴얼 링크를 보내드릴까요?',
        timestamp: '2023-10-26T14:00:30Z',
      },
      { id: 'm5', role: 'user', message: '아니, 그냥 사이트에 문의 남길게.', timestamp: '2023-10-26T14:00:45Z' },
    ],
  },
  {
    logId: 'cl-003',
    customerEmail: 'jisung.park@example.com', // q3~q11 고객
    channel: 'chatbot',
    createdAt: '2023-10-27T11:00:00Z',
    messages: [
      { id: 'm1', role: 'user', message: '비밀번호 찾기', timestamp: '2023-10-27T11:00:10Z' },
      {
        id: 'm2',
        role: 'bot',
        message: '비밀번호 재설정 이메일을 jisung.park@example.com (으)로 발송했습니다. 확인해주세요.',
        timestamp: '2023-10-27T11:00:25Z',
      },
      { id: 'm3', role: 'user', message: '이메일이 안 와요.', timestamp: '2023-10-27T11:03:00Z' },
      {
        id: 'm4',
        role: 'bot',
        message: '스팸 메일함을 확인해 보셨나요? 5분 정도 소요될 수 있습니다.',
        timestamp: '2023-10-27T11:03:15Z',
      },
      { id: 'm5', role: 'user', message: '계속 안 오네요. 상담원 연결.', timestamp: '2023-10-27T11:04:30Z' },
    ],
  },
];

// (가상) 이메일로 챗봇/보이스봇 로그를 가져오는 비동기 함수
export async function getChatLogsByEmail(email: string): Promise<ChatLogType[]> {
  console.log(`[API Call] Fetching chat logs for: ${email}`);
  // 실제로는 API 호출이겠지만, 여기서는 mockChatLogs를 필터링합니다.
  // 비동기 API를 시뮬레이션하기 위해 500ms 지연을 줍니다.
  await new Promise(resolve => setTimeout(resolve, 500));

  return mockChatLogs
    .filter(log => log.customerEmail === email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
