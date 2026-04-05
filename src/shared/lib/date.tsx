const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();

export const thirtyDaysAgo = new Date(todayYear, todayMonth, todayDate - 30);
