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
  description?: string;
};

const ORG_ALTERNATE_NAMES = ['LUA', 'LUA Corporation', 'luacorp', '루아', '루아주식회사'];

// 1. JsonLdOrganization
export function JsonLdOrganization({ locale, description }: JsonLdOrganizationProps) {
  const site = getSite();
  const baseUrl = site.domain?.startsWith('http') ? site.domain.replace(/\/$/, '') : 'https://example.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.companyName[locale],
    alternateName: ORG_ALTERNATE_NAMES,
    url: `${baseUrl}/${locale}/`,
    ...(description ? { description } : {}),
    email: site.contact.email,
    ...(site.contact.tel ? { telephone: site.contact.tel } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addresses.hq[locale],
      postalCode: site.addresses.hq.zip,
      addressCountry: 'KR',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
