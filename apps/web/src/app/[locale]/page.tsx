/**
 * locale.page (홈 페이지)
 * =======================
 * HeroSlider → BizCardSlider → BizFieldScroller → HomeNewsList → LinkCards
 *
 * [Main Functions]
 * - HomePage
 *
 * [Dependencies]
 * - sections/home/*, sections/common/section-head, @/lib/board, @repo/env
 */

import { SectionHead } from '@/components/sections/common/section-head';
import { PageContainer } from '@/components/sections/common/page-container';
import { BizCardSlider } from '@/components/sections/home/biz-card-slider';
import { BizFieldScroller } from '@/components/sections/home/biz-field-scroller';
import { HeroSlider } from '@/components/sections/home/hero-slider';
import { HomeNewsList } from '@/components/sections/home/home-news-list';
import { LinkCards } from '@/components/sections/home/link-cards';
import { loadNewsArticles, toBoardArticle } from '@/lib/board';
import { getTranslations, setRequestLocale } from '@/lib/i18n';
import { getImage } from '@repo/env';

type HomePageProps = {
  params: Promise<{ locale: 'ko' | 'en' }>;
};

type HeroSlideContent = { title: string; subtitle?: string };
type TechCardContent = { title: string; href: string };
type BizFieldContent = { title: string; desc: string };
type LinkCardContent = { title: string; desc: string; href: string };

// 1. HomePage
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  const heroSlidesRaw = t.raw('hero.slides') as HeroSlideContent[];
  const heroSlides = heroSlidesRaw.map((slide, index) => ({
    ...slide,
    asset: getImage(`home.heroSlides.${index}`),
    imagePath: `home.heroSlides.${index}`,
  }));

  const techCardsRaw = t.raw('techCards') as TechCardContent[];
  const techCards = techCardsRaw.map((card, index) => ({
    ...card,
    asset: getImage(`home.techCards.${index}`),
    imagePath: `home.techCards.${index}`,
  }));

  const bizFields = t.raw('bizFields') as BizFieldContent[];
  const newsArticles = loadNewsArticles(locale).map(toBoardArticle);

  const linkCardKeys = ['prCenter', 'irCenter', 'location'] as const;
  const linkCards = linkCardKeys.map((key) => {
    const card = t.raw(`linkCards.${key}`) as LinkCardContent;
    return {
      ...card,
      imagePath: `home.linkCards.${key}`,
      external: card.href.startsWith('http'),
    };
  });

  return (
    <main>
      <HeroSlider
        slides={heroSlides}
        locale={locale}
        prevLabel={t('hero.prev')}
        nextLabel={t('hero.next')}
      />

      <PageContainer className="py-16">
        <SectionHead tag={t('sections.technology.tag')} title={t('sections.technology.title')} />
        <BizCardSlider cards={techCards} locale={locale} />
      </PageContainer>

      <div className="bg-neutral-50 py-16">
        <PageContainer>
          <BizFieldScroller items={bizFields} />
        </PageContainer>
      </div>

      <PageContainer className="py-16">
        <SectionHead tag={t('sections.news.tag')} title={t('sections.news.title')} />
        <HomeNewsList
          articles={newsArticles}
          limit={3}
          moreHref="/pr-center/news"
          moreLabel={t('sections.news.more')}
          noticeLabel={tCommon('board.notice')}
          newsLabel={tCommon('board.news')}
        />
      </PageContainer>

      <div className="bg-neutral-50 py-16">
        <PageContainer>
          <SectionHead tag={t('sections.links.tag')} title={t('sections.links.title')} />
          <LinkCards cards={linkCards} locale={locale} />
        </PageContainer>
      </div>
    </main>
  );
}
