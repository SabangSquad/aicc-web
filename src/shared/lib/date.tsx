const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();

export function isToday(dateString: string) {
  const date = new Date(dateString);
  return date.getFullYear() === todayYear && date.getMonth() === todayMonth && date.getDate() === todayDate;
}

export const thirtyDaysAgo = new Date(todayYear, todayMonth, todayDate - 30);
export const sevenDaysAgo = new Date(todayYear, todayMonth, todayDate - 7);
