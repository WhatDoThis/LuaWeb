/**
 * sections.disclosure-list (공시정보 목록)
 * ========================================
 * 선구현 only — GNB/route 미연결
 *
 * [Main Functions]
 * - DisclosureList
 *
 * [Dependencies]
 * - 없음
 */

export type DisclosureItem = {
  date: string;
  title: string;
  url: string;
  type: 'dart' | 'pdf';
};

export type DisclosureListProps = {
  items: DisclosureItem[];
  locale: 'ko' | 'en';
  typeLabels: {
    dart: string;
    pdf: string;
  };
};

// 1. DisclosureList
export function DisclosureList({ items, typeLabels }: DisclosureListProps) {
  return (
    <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-medium text-neutral-500">{item.date}</span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block font-medium text-neutral-800 hover:text-primary"
            >
              {item.title}
            </a>
          </div>
          <span className="shrink-0 text-xs font-semibold uppercase text-primary">
            {item.type === 'dart' ? typeLabels.dart : typeLabels.pdf}
          </span>
        </li>
      ))}
    </ul>
  );
}
