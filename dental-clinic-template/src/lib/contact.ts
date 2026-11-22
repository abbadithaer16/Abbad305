import clinic from '@clinic';

/** "+962 6 500 0000" → "tel:+96265000000" */
export const telHref = (phone: string = clinic.contact.phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** Digits only, as wa.me expects ("962790000000"). */
const waNumber = clinic.contact.whatsapp.replace(/\D/g, '');

/** wa.me link with an optional prefilled message. */
export function waLink(message?: string): string {
  return `https://wa.me/${waNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
