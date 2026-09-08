/**
 * sections.link-cards (홈 바로가기 카드)
 * ======================================
 * 3 cards — SmartImage + Link
 *
 * [Main Functions]
 * - LinkCards
 *
 * [Dependencies]
 * - ui/smart-image, @/i18n/navigation
 */

import { Link } from '@/i18n/navigation';
import { SmartImage } from '@/components/ui/smart-image';

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

// 1. LinkCards
export function LinkCards({ cards, locale }: LinkCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((card) => {
        const content = (
          <>
            <div className="aspect-[44/30] w-full overflow-hidden">
              <SmartImage
                path={card.imagePath}
                locale={locale}
                className="h-full w-full"
                fit="cover"
              />
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
              className="group overflow-hidden rounded-lg border border-neutral-200 transition-shadow hover:shadow-md"
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={card.title}
            href={card.href}
            className="group overflow-hidden rounded-lg border border-neutral-200 transition-shadow hover:shadow-md"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
