/**
 * sections.location-section (찾아오시는 길 섹션)
 * ==============================================
 * content + site.json → 단일 본사 지도·연락처 테이블
 *
 * [Main Functions]
 * - LocationSection
 *
 * [Dependencies]
 * - @repo/env, @/lib/i18n
 */

import { getSite } from '@repo/env';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type LocationSectionProps = {
  locale: 'ko' | 'en';
};

type OfficeLocation = {
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
  const office = t.raw('pages.location.office') as OfficeLocation;
  const mapEmbedUrl = site.maps[office.mapKey as keyof typeof site.maps] ?? site.maps.hq;
  const tel = office.tel ?? site.contact.tel;
  const fax = office.fax ?? site.contact.fax;
  const mapTitle = t('pages.location.title');

  return (
    <div className="space-y-6">
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-200">
        <iframe
          title={mapTitle}
          src={mapEmbedUrl}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <table className="location-info-table w-full text-sm">
        <tbody>
          <tr className="border-b border-neutral-200">
            <th className="w-28 py-3 pr-4 text-left font-semibold text-neutral-800">
              {t('locationLabels.address')}
            </th>
            <td className="py-3 text-neutral-600">{office.address}</td>
          </tr>
          <tr className="border-b border-neutral-200">
            <th className="py-3 pr-4 text-left font-semibold text-neutral-800">
              {t('locationLabels.tel')}
            </th>
            <td className="py-3 text-neutral-600">{tel}</td>
          </tr>
          <tr className="border-b border-neutral-200">
            <th className="py-3 pr-4 text-left font-semibold text-neutral-800">
              {t('locationLabels.fax')}
            </th>
            <td className="py-3 text-neutral-600">{fax}</td>
          </tr>
          <tr>
            <th className="py-3 pr-4 align-top text-left font-semibold text-neutral-800">
              {t('locationLabels.directions')}
            </th>
            <td className="py-3 text-neutral-600">{office.directions}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
