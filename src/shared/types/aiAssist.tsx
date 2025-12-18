import { Emotion } from './emotion';

export type AIAssistType = {
  ok: boolean;
  case_id: number;
  emotion: Emotion;
  summary: string;
  suggested_answer: string;
};
