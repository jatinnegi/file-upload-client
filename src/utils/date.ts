export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = date.getMonth();
  const dd = date.getDate();
  let ddStr;

  if (dd < 10) ddStr = `0${dd}`;
  else ddStr = dd;

  return `${ddStr} ${getMonthName(mm)} ${yyyy}`;
}

export const getMonthName = (index: number) => monthNames[index];
