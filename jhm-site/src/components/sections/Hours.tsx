import { hoursRows } from '@/lib/site';
import { cn } from '@/lib/phone';

export function HoursList({ className, inline = false }: { className?: string; inline?: boolean }) {
  return (
    <dl className={cn('grid gap-1.5', className)}>
      {hoursRows().map((row) => (
        <div key={row.days} className={cn('flex flex-wrap gap-x-6', inline ? 'justify-between sm:justify-start sm:gap-x-3' : 'justify-between')}>
          <dt>{row.days}</dt>
          <dd className={row.closed ? 'text-muted' : 'font-semibold text-fg'}>{row.hours}</dd>
        </div>
      ))}
    </dl>
  );
}
