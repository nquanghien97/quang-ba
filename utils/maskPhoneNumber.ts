export function maskPhoneNumber(phone?: string): string {
  if(!phone) return 'Chưa có số điện thoại'
  if (phone.length < 10) return phone;

  const visiblePart = phone.slice(0, 4);
  return `${visiblePart}.xxx.xxx`;
}