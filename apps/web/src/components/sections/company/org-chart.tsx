/**
 * sections.org-chart (조직도)
 * ===========================
 * PC/MO 이미지 스왑 (chart + chartMobile)
 *
 * [Main Functions]
 * - OrgChart
 *
 * [Dependencies]
 * - ui/image-asset-view, @repo/env
 */

import { ImageAssetView } from '@/components/ui/image-asset-view';
import { getImage } from '@repo/env';

type OrgChartProps = {
  locale: 'ko' | 'en';
};

// 1. OrgChart
export function OrgChart({ locale }: OrgChartProps) {
  const chart = getImage('company.organizations.chart');
  const mobile = getImage('company.organizations.chartMobile');
  const asset = {
    ...chart,
    srcMobile: mobile.src || chart.srcMobile,
    alt: chart.alt ?? mobile.alt,
  };

  return (
    <ImageAssetView
      asset={asset}
      locale={locale}
      path="company.organizations.chart"
      className="w-full"
    />
  );
}
