/**
 * sections.link-cards (홈 바로가기)
 * ==================================
 * 이미지 없으면 그라데이션·아이콘 버튼, 있으면 카드
 *
 * [Main Functions]
 * - LinkCards
 * - LinkButton
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

function LinkCardIcon({ imagePath }: { imagePath: string }) {
  const isLocation = imagePath.includes('location');

  if (isLocation) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-primary" aria-hidden="true">
        <path
          d="M12 2.5a5.25 5.25 0 0 0-5.25 5.25c0 3.94 5.25 10.25 5.25 10.25s5.25-6.31 5.25-10.25A5.25 5.25 0 0 0 12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="7.75" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-primary" aria-hidden="true">
      <path
        d="M4 6.5h16M4 12h10M4 17.5h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LinkButton({
  card,
  className,
}: {
  card: LinkCardData;
  className?: string;
}) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <LinkCardIcon imagePath={card.imagePath} />
        <span
          className="text-lg text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-primary"
          aria-hidden="true"
        >
          →
        </span>
      </div>
      <div className="mt-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{card.desc}</span>
        <span className="lua-fluid-card-title mt-2 block text-primary group-hover:text-secondary">
          {card.title}
        </span>
      </div>
    </>
  );

  const baseClass = cn(
    'group flex min-h-[140px] flex-col justify-between rounded-xl border border-primary/10 bg-gradient-to-br from-white via-primary/[0.03] to-accent/[0.08] p-6 shadow-sm transition-all hover:border-primary/25 hover:shadow-md',
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
              <h3 className="lua-fluid-card-title text-neutral-800">{card.title}</h3>
              <p className="lua-fluid-card-desc mt-2">{card.desc}</p>
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
