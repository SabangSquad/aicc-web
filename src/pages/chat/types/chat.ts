export type ChatMessage = {
  id: number;
  text: string;
  isAi: boolean;
  isLoginRequired?: boolean;
  isRating?: boolean;
  showReservationForm?: boolean;
  availableSlots?: Array<{ date: string; time: string }>;
};
