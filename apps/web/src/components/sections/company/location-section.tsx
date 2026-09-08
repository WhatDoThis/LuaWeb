/**
 * sections.location-section (찾아오시는 길 섹션)
 * ==============================================
 * content + site.json → 단일 본사 지도·연락처 테이블
 *
 * [Main Functions]
 * - LocationSection
 *
 * [Dependencies]
 * - @repo/env, @/lib/i18n, @/lib/site-identity
 */

import { getSite } from '@repo/env';
import { getTranslations, setRequestLocale } from '@/lib/i18n';
import { luaClass } from '@/lib/site-identity';

type LocationSectionProps = {
  locale: 'ko' | 'en';
};

type OfficeLocation = {
  address: string;
  tel?: string;
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
  const mapLink = site.maps.hqLink;
  const tel = office.tel ?? site.contact.tel;
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
      {mapLink ? (
        <p className="text-sm">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {t('locationLabels.mapLink')}
          </a>
        </p>
      ) : null}
      <table className={`${luaClass('location-info')} w-full text-sm`}>
        <tbody>
          <tr className="border-b border-neutral-200">
            <th className="w-28 py-3 pr-4 text-left font-semibold text-neutral-800">
              {t('locationLabels.address')}
            </th>
            <td className="py-3 text-neutral-600">{office.address}</td>
          </tr>
          {tel ? (
            <tr className="border-b border-neutral-200">
              <th className="py-3 pr-4 text-left font-semibold text-neutral-800">
                {t('locationLabels.tel')}
              </th>
              <td className="py-3 text-neutral-600">{tel}</td>
            </tr>
          ) : null}
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
