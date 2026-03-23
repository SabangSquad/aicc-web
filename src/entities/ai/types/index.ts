export type AISolutionResponse = {
  type: string;
  lastUpdated: string;
  score: number; // 0~40 위험 / 40~70 주의 / 70~100 정상
  headline: string;
  trends: Array<{
    id: number;
    title: string;
    content: string;
  }>;
  solutions: Array<{
    id: number;
    priority: '긴급' | '보통';
    title: string;
    content: string;
  }>;
  rawState: {
    categoryStats: Record<string, number>;
    emotionStats: Record<string, number>;
  };
};
