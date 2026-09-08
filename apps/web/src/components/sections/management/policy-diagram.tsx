/**
 * sections.policy-diagram (경영방침)
 * =================================
 * locale 다이어그램 + 강조/뎁스/럭셔리 타이포 계층
 *
 * [Main Functions]
 * - PolicyDiagram
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type PolicyDiagramProps = {
  locale: 'ko' | 'en';
};

type PolicyPrinciple = {
  emphasis?: string;
  detail?: string;
  luxury?: string;
};

// 1. PolicyDiagram
export async function PolicyDiagram({ locale }: PolicyDiagramProps) {
  setRequestLocale(locale);
  const t = await getTranslations('management');
  const principles = t.raw('pages.policy.principles') as PolicyPrinciple[];

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-3 shadow-sm sm:p-5">
        <SmartImage
          path="management.policy.diagram"
          locale={locale}
          className="w-full [&_img]:mx-auto [&_img]:h-auto [&_img]:w-full"
        />
      </div>
      <div className="mx-auto max-w-3xl space-y-10">
        {principles.map((item, index) => (
          <article key={`policy-${index}`} className="border-l-2 border-primary/20 pl-6 sm:pl-8">
            {item.emphasis ? (
              <h2 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {item.emphasis}
              </h2>
            ) : null}
            {item.detail ? (
              <p className="mt-3 pl-2 text-base leading-relaxed text-neutral-600 sm:pl-4 sm:text-lg">
                {item.detail}
              </p>
            ) : null}
            {item.luxury ? (
              <p className="mt-6 border-t border-neutral-200/80 pt-6 text-lg font-medium leading-relaxed tracking-wide text-neutral-800 sm:text-xl">
                {item.luxury}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
