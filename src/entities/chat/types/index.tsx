import { EmotionType } from '@/shared/types/emotion';

interface ChatStream {
  type: 'thinking';
  message: string;
}
interface ChatOk {
  ok: true;
  type: 'answer';
  answer: string;
  reason: string;
  suggestions: string[];
  readonly caseId: number;
}
interface ChatError {
  ok: false;
  type: 'error';
  error: string;
}
export type ChatResponse = ChatStream | ChatOk | ChatError;

interface ChatSummaryOk {
  ok: true;
  case_id: number;
  emotion: EmotionType;
  summary: string;
  suggested_answer: string;
}
export type ChatSummary = ChatSummaryOk | { ok: false; error: string };
