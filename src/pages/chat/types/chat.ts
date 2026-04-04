export type ChatMessage = {
  id: number;
  text: string;
  isAi: boolean;
  isLoginRequired?: boolean;
  isRating?: boolean;
};
