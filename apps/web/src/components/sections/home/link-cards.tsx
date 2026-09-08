/**
 * sections.link-cards (홈 바로가기)
 * ==================================
 * 이미지 없으면 프리미엄 버튼 링크, 있으면 카드
 *
 * [Main Functions]
 * - LinkCards
 *
 * [Dependencies]
 * - ui/smart-image, @repo/env, @/i18n/navigation, @/lib/cn
 */

import { Link } from '@/i18n/navigation';
import { SmartImage } from '@/components/ui/smart-image';
import { resolveImageSrc, getImage } from '@repo/env';
import { cn } from '@/lib/cn';

export type LinkCardData = {
  title: string;
  desc: string;
  href: string;
  imagePath: string;
  external?: boolean;
};

export type LinkCardsProps = {
  cards: LinkCardData[];
  locale: 'ko' | 'en';
};

function LinkButton({
  card,
  className,
}: {
  card: LinkCardData;
  className?: string;
}) {
  const inner = (
    <>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
        {card.desc}
      </span>
      <span className="mt-2 block text-lg font-semibold text-primary group-hover:text-secondary">
        {card.title}
      </span>
      <span
        className="mt-4 inline-flex items-center text-sm font-medium text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-primary"
        aria-hidden="true"
      >
        →
      </span>
    </>
  );

  const baseClass = cn(
    'group flex min-h-[120px] flex-col justify-between rounded-xl border border-neutral-200/90 bg-white p-6 shadow-sm transition-all hover:border-primary/25 hover:shadow-md',
    className,
  );

  if (card.external) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={card.href} className={baseClass}>
      {inner}
    </Link>
  );
}

// 1. LinkCards
export function LinkCards({ cards, locale }: LinkCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => {
        const asset = getImage(card.imagePath);
        const hasImage = Boolean(resolveImageSrc(asset, locale));

        if (!hasImage) {
          return <LinkButton key={card.title} card={card} />;
        }

        const content = (
          <>
            <div className="aspect-[44/30] w-full overflow-hidden">
              <SmartImage path={card.imagePath} locale={locale} className="h-full w-full" fit="cover" />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-neutral-800">{card.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{card.desc}</p>
            </div>
          </>
        );

        if (card.external) {
          return (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-neutral-200 transition-shadow hover:shadow-md"
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={card.title}
            href={card.href}
            className="group overflow-hidden rounded-xl border border-neutral-200 transition-shadow hover:shadow-md"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
