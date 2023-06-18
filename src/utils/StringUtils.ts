export function formatPhone(phone: string): string {
  let trimPhone = phone.replace(/\s+/g, '');
  return [trimPhone.slice(0, 3), trimPhone.slice(3, 7), trimPhone.slice(7, 11)]
    .filter(item => !!item)
    .join(' ');
}
export function replaceBlank(phone: string): string {
  return phone ? phone.replace(/\s+/g, '') : '';
}
