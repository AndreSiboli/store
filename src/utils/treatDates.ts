export function formatDate(date: string | Date) {
  const d = new Date(date);
  const formatedMonth = formatMonth(d.getMonth());
  const formatedDay = formatDay(d.getDate());

  return `${d.getFullYear()}/${formatedMonth}/${formatedDay}`;
}

function formatMonth(month: number) {
  if (isNaN(month)) return `00`;

  if (month < 10) return `0${month}`;
  return month;
}

function formatDay(day: number) {
  if (isNaN(day)) return `00`;

  if (day < 10) return `0${day}`;
  return day;
}
