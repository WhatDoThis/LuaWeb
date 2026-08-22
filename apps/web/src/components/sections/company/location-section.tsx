/**
 * sections.location-section (찾아오시는 길 섹션)
 * ==============================================
 * content + site.json → LocationTabs props 조립
 *
 * [Main Functions]
 * - LocationSection
 *
 * [Dependencies]
 * - sections/company/location-tabs, @repo/env, @/lib/i18n
 */

import {
  LocationTabs,
  type LocationTabData,
} from '@/components/sections/company/location-tabs';
import { getSite } from '@repo/env';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type LocationSectionProps = {
  locale: 'ko' | 'en';
};

type RawLocationTab = {
  id: string;
  label: string;
  address: string;
  tel?: string;
  fax?: string;
  directions: string;
  mapKey: string;
};

// 1. LocationSection
export async function LocationSection({ locale }: LocationSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations('company');
  const site = getSite();
  const rawTabs = t.raw('pages.location.tabs') as RawLocationTab[];

  const tabs: LocationTabData[] = rawTabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    address: tab.address,
    tel: tab.tel ?? site.contact.tel,
    fax: tab.fax ?? site.contact.fax,
    directions: tab.directions,
    mapEmbedUrl: site.maps[tab.mapKey as keyof typeof site.maps] ?? site.maps.hq,
  }));

  return (
    <LocationTabs
      tabs={tabs}
      labels={{
        address: t('locationLabels.address'),
        tel: t('locationLabels.tel'),
        fax: t('locationLabels.fax'),
        directions: t('locationLabels.directions'),
        tabsAria: t('locationLabels.tabsAria'),
      }}
    />
  );
}
