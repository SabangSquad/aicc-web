type InquiryStatus = 'pending' | 'completed';
type InquiryGrade = '브론즈' | '실버' | '골드';
type InquiryCategory = '배송' | '결제' | '제품' | '기타';

export interface InquiryType {
  id: string;
  customerName: string;
  email: string;
  title: string;
  content: string;
  status: InquiryStatus;
  aiSummary: string;
  createdAt: string;
  phone: string;
  category: InquiryCategory;
  grade: InquiryGrade;
  joinedAt: string;
  birthday: string;
  points: string;
}

export const items: InquiryType[] = [
  {
    id: 'q12',
    customerName: '최민준',
    email: 'minjun.choi@example.com',
    title: '배송 지연 문의 (주문번호: 20231025-001)',
    content: '어제 도착 예정이었던 상품이 아직도 배송 준비 중입니다. 확인 부탁드립니다. 주문번호 20231025-001 입니다.',
    status: 'pending',
    aiSummary: '고객(최민준)이 주문(20231025-001)의 배송 지연에 대해 문의함. 예정일이 지났으나 아직 배송 준비 중.',
    createdAt: '2023-10-28T09:15:00Z',
    phone: '010-9876-5432',
    category: '배송',
    grade: '골드',
    joinedAt: '2021-03-15T00:00:00Z',
    birthday: '1990-05-20',
    points: '15000',
  },
  {
    id: 'q13',
    customerName: '정수빈',
    email: 'soobin.jeong@example.com',
    title: '제품 A와 제품 B의 스펙 차이',
    content:
      '안녕하세요, 제품 A와 제품 B의 상세 스펙 차이가 궁금합니다. 특히 배터리 시간이 얼마나 차이 나는지 알려주세요.',
    status: 'completed',
    aiSummary: '고객(정수빈)이 제품 A와 B의 스펙 비교, 특히 배터리 시간 차이에 대해 문의함 (완료됨).',
    createdAt: '2023-10-27T18:00:00Z',
    phone: '010-1111-2222',
    category: '제품',
    grade: '실버',
    birthday: '1992-08-15',
    joinedAt: '2022-11-01T00:00:00Z',
    points: '3500',
  },
  {
    id: 'q14',
    customerName: '윤서아',
    email: 'seoa.yoon@example.com',
    title: '환불 요청 건',
    content: '주문 취소했는데 아직 환불이 안 들어왔어요. 언제쯤 처리되나요? 주문번호: 20231024-005',
    status: 'pending',
    aiSummary: '고객(윤서아)이 취소한 주문(20231024-005)의 환불 처리 일정을 문의함.',
    createdAt: '2023-10-28T11:00:00Z',
    phone: '010-3333-4444',
    category: '결제',
    grade: '브론즈',
    birthday: '1995-11-30',
    points: '500',
    joinedAt: '2023-06-20T00:00:00Z',
  },
  {
    id: 'q15',
    customerName: '강지후',
    email: 'jihoo.kang@example.com',
    title: '[긴급] 배송지 변경 요청합니다',
    content:
      '오늘 주문한 상품(주문번호: 20231028-002) 배송지를 A가 아니라 B로 변경해주세요. 아직 발송 전인 것 같습니다.',
    status: 'completed',
    aiSummary: '고객(강지후)이 당일 주문 건의 배송지 변경을 요청함 (처리 완료).',
    createdAt: '2023-10-28T09:30:00Z',
    phone: '010-5555-6666',
    category: '배송',
    grade: '실버',
    joinedAt: '2023-01-10T00:00:00Z',
    points: '1200',
    birthday: '1998-04-05',
  },
  {
    id: 'q16',
    customerName: '김철수', // 기존 고객과 동일인
    email: 'chulsoo.kim@example.com',
    title: '제품 불량인 것 같습니다 (사진 첨부)',
    content:
      '배송받은 제품이 파손되어 있습니다. 박스는 멀쩡했는데 내부 제품이 깨져있네요. 교환 신청합니다. 사진은 메일로 다시 보냈습니다.',
    status: 'pending',
    aiSummary: '고객(김철수)이 배송받은 제품의 파손(불량)을 보고하며 교환을 요청함.',
    createdAt: '2023-10-28T13:30:00Z',
    phone: '010-1234-5678',
    category: '제품',
    grade: '골드', // q1의 김철수와 동일인이라고 가정
    joinedAt: '2020-07-20T00:00:00Z',
    birthday: '1988-02-10',
    points: '21000',
  },
  {
    id: 'q17',
    customerName: '이하은',
    email: 'haeun.lee@example.com',
    title: '회원 정보 수정이 안돼요',
    content: '마이페이지에서 생년월일 수정을 하려고 하는데 버튼이 비활성화되어 있습니다. 수정 부탁드립니다.',
    status: 'completed',
    aiSummary: '고객(이하은)이 마이페이지에서 생년월일 수정이 불가능한 오류를 보고함 (처리 완료).',
    createdAt: '2023-10-25T16:45:00Z',
    phone: '010-7777-8888',
    category: '기타',
    grade: '브론즈',
    joinedAt: '2023-09-01T00:00:00Z',
    birthday: '2001-12-25',
    points: '250',
  },
  {
    id: 'q18',
    customerName: '박도윤',
    email: 'doyoon.park@example.com',
    title: '결제 영수증 발급 문의',
    content: '어제 결제한 건에 대해 세금계산서 발행이 가능한가요? 사업자 정보 보내드립니다.',
    status: 'pending',
    aiSummary: '고객(박도윤)이 결제 건에 대한 세금계산서 발행 가능 여부를 문의함.',
    createdAt: '2023-10-28T14:00:00Z',
    phone: '010-8888-9999',
    category: '결제',
    grade: '실버',
    joinedAt: '2022-05-05T00:00:00Z',
    points: '4200',
    birthday: '1985-09-10',
  },
];
