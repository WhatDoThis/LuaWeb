/**
 * seo.json-ld-organization (Organization JSON-LD)
 * ===============================================
 * site.json companyName, contact, address
 *
 * [Main Functions]
 * - JsonLdOrganization
 *
 * [Dependencies]
 * - @repo/env
 */

import { getSite } from '@repo/env';

type JsonLdOrganizationProps = {
  locale: 'ko' | 'en';
};

// 1. JsonLdOrganization
export function JsonLdOrganization({ locale }: JsonLdOrganizationProps) {
  const site = getSite();
  const baseUrl = site.domain?.startsWith('http') ? site.domain.replace(/\/$/, '') : 'https://example.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.companyName[locale],
    url: `${baseUrl}/${locale}/`,
    email: site.contact.email,
    telephone: site.contact.tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addresses.hq[locale],
      postalCode: site.addresses.hq.zip,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
