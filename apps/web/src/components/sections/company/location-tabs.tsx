/**
 * sections.location-tabs (찾아오시는 길)
 * ======================================
 * Tabs + iframe 지도 + 정보 테이블
 *
 * [Main Functions]
 * - LocationTabs
 *
 * [Dependencies]
 * - ui/tabs
 */

'use client';

import { Tabs } from '@/components/ui/tabs';

export type LocationTabData = {
  id: string;
  label: string;
  mapEmbedUrl: string;
  address: string;
  tel: string;
  fax: string;
  directions: string;
};

export type LocationTabsProps = {
  tabs: LocationTabData[];
  labels: {
    address: string;
    tel: string;
    fax: string;
    directions: string;
    tabsAria: string;
  };
};

// 1. LocationTabs
export function LocationTabs({ tabs, labels }: LocationTabsProps) {
  const items = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    content: (
      <div className="space-y-6">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-200">
          <iframe
            title={tab.label}
            src={tab.mapEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <table className="location-info-table w-full text-sm">
          <tbody>
            <tr className="border-b border-neutral-200">
              <th className="w-28 py-3 pr-4 text-left font-semibold text-neutral-800">
                {labels.address}
              </th>
              <td className="py-3 text-neutral-600">{tab.address}</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <th className="py-3 pr-4 text-left font-semibold text-neutral-800">{labels.tel}</th>
              <td className="py-3 text-neutral-600">{tab.tel}</td>
            </tr>
            <tr className="border-b border-neutral-200">
              <th className="py-3 pr-4 text-left font-semibold text-neutral-800">{labels.fax}</th>
              <td className="py-3 text-neutral-600">{tab.fax}</td>
            </tr>
            <tr>
              <th className="py-3 pr-4 align-top text-left font-semibold text-neutral-800">
                {labels.directions}
              </th>
              <td className="py-3 text-neutral-600">{tab.directions}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  }));

  return <Tabs items={items} defaultTab={tabs[0]?.id} ariaLabel={labels.tabsAria} />;
}
