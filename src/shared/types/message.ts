export interface MessageType {
  readonly message_id: number;
  readonly case_id: number;
  readonly occurred_at: string;
  content: string;
  speaker: '고객' | '챗봇';
}
