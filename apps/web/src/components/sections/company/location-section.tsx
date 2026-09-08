/**
 * sections.location-section (찾아오시는 길 섹션)
 * ==============================================
 * Google Maps embed + 네이버 지도 링크 + 연락처 테이블
 *
 * [Main Functions]
 * - LocationSection
 * - toTelHref
 * - buildGoogleEmbedUrl
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

// 1. toTelHref
function toTelHref(tel: string): string {
  return `tel:${tel.replace(/\s/g, '')}`;
}

// 2. buildGoogleEmbedUrl
function buildGoogleEmbedUrl(base: string, locale: 'ko' | 'en'): string {
  if (!base.trim()) {
    return '';
  }
  const hl = locale === 'ko' ? 'ko' : 'en';
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}hl=${hl}`;
}

// 3. LocationSection
export async function LocationSection({ locale }: LocationSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations('company');
  const site = getSite();
  const office = t.raw('pages.location.office') as OfficeLocation;
  const mapEmbedBase = site.maps[office.mapKey as keyof typeof site.maps] ?? site.maps.hq;
  const mapEmbedUrl =
    typeof mapEmbedBase === 'string' ? buildGoogleEmbedUrl(mapEmbedBase, locale) : '';
  const mapLink = site.maps.hqLink;
  const tel = office.tel ?? site.contact.tel;
  const mapTitle = t('pages.location.title');

  return (
    <div className="space-y-6">
      {mapEmbedUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm">
          <iframe
            title={mapTitle}
            src={mapEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      ) : null}
      {mapLink ? (
        <p className="text-sm">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-2 hover:underline"
          >
            {t('locationLabels.mapCta')}
            <span aria-hidden="true">→</span>
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
              <td className="py-3 text-neutral-600">
                <a href={toTelHref(tel)} className="hover:text-primary hover:underline">
                  {tel}
                </a>
              </td>
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
