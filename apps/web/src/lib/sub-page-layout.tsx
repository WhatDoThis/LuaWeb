/**
 * lib.sub-page-layout (서브 페이지 골격)
 * ======================================
 * IntroHero + LnbBar + SpHead + PageContainer 조합 (본문 하단 pb-[60px])
 *
 * [Main Functions]
 * - SubPageLayout
 *
 * [Dependencies]
 * - sections/common/*, @/lib/i18n, @/lib/lnb
 */

import { IntroHero } from '@/components/sections/common/intro-hero';
import { LnbBar, type ContentNamespace } from '@/components/sections/common/lnb-bar';
import { PageContainer } from '@/components/sections/common/page-container';
import { SpHead } from '@/components/sections/common/sp-head';
import { getTranslations, setRequestLocale } from '@/lib/i18n';
import type { LnbSection } from '@/lib/lnb';

export type SubPageLayoutProps = {
  locale: 'ko' | 'en';
  section: LnbSection;
  namespace: ContentNamespace;
  imagePath: string;
  currentPath: string;
  pageKey: string;
  staticMode?: boolean;
  children?: React.ReactNode;
};

// 1. SubPageLayout
export async function SubPageLayout({
  locale,
  section,
  namespace,
  imagePath,
  currentPath,
  pageKey,
  staticMode = false,
  children,
}: SubPageLayoutProps) {
  setRequestLocale(locale);
  const t = await getTranslations(namespace);
  const pageBase = `pages.${pageKey}`;

  const tag = t(`${pageBase}.tag` as never);
  const title = t(`${pageBase}.title` as never);
  const desc = t(`${pageBase}.desc` as never);
  const descText = desc && desc.length > 0 ? desc : undefined;

  return (
    <>
      <IntroHero imagePath={imagePath} locale={locale} />
      <LnbBar
        section={section}
        namespace={namespace}
        currentPath={currentPath}
        locale={locale}
        staticMode={staticMode}
      />
      <PageContainer className="pb-[60px]">
        <SpHead tag={tag} title={title} desc={descText} />
        {children}
      </PageContainer>
    </>
  );
}
