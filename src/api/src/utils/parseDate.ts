export function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${year}-${month}-${day}`);
}