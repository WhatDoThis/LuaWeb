/**
 * sections.history-timeline (연혁 타임라인)
 * =========================================
 * 세로 타임라인 + year badge
 *
 * [Main Functions]
 * - HistoryTimeline
 *
 * [Dependencies]
 * - @/lib/i18n
 */

import { getTranslations, setRequestLocale } from '@/lib/i18n';

type HistoryTimelineProps = {
  locale: 'ko' | 'en';
};

type HistoryEvent = { year: string; items: string[] };

// 1. HistoryTimeline
export async function HistoryTimeline({ locale }: HistoryTimelineProps) {
  setRequestLocale(locale);
  const t = await getTranslations('company');
  const events = t.raw('pages.history.events') as HistoryEvent[];

  return (
    <ol className="relative space-y-8 border-l-2 border-primary/20 pl-8">
      {events.map((event) => (
        <li key={event.year} className="relative">
          <span className="absolute -left-[2.55rem] top-0 inline-flex min-w-[3.5rem] justify-center rounded bg-primary px-2 py-1 text-sm font-bold text-white">
            {event.year}
          </span>
          <ul className="mt-1 list-disc space-y-2 pl-4 text-neutral-700">
            {event.items.map((item) => (
              <li key={item.slice(0, 20)}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
