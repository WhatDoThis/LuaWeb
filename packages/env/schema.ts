/**
 * env.schema (환경 JSON Zod 스키마)
 * =================================
 * site, features, images ImageAsset 타입 및 검증
 *
 * [Main Functions]
 * - imageAssetSchema, siteConfigSchema, featuresConfigSchema
 *
 * [Dependencies]
 * - zod
 */

import { z } from 'zod';

export const imageAssetSchema = z.object({
  src: z.string(),
  srcEn: z.string().optional(),
  srcMobile: z.string().optional(),
  size: z.string(),
  ratio: z.string().optional(),
  where: z.string().optional(),
  alt: z
    .object({
      ko: z.string(),
      en: z.string(),
    })
    .optional(),
});

export type ImageAsset = z.infer<typeof imageAssetSchema>;

export const siteConfigSchema = z.object({
  companyName: z.object({ ko: z.string(), en: z.string() }),
  domain: z.string(),
  contact: z.object({
    tel: z.string(),
    fax: z.string(),
    email: z.string(),
  }),
  addresses: z.object({
    hq: z.object({ ko: z.string(), en: z.string(), zip: z.string() }),
  }),
  maps: z.object({
    hq: z.string(),
    hqLink: z.string().optional(),
    factory: z.string().optional(),
    factory1: z.string().optional(),
    factory2: z.string().optional(),
    lab: z.string().optional(),
    overseas: z.string().optional(),
  }),
  copyright: z.object({ ko: z.string(), en: z.string() }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const featuresConfigSchema = z.object({
  showHitCount: z.boolean(),
  showDisclosureNav: z.boolean(),
  enableNewsSearch: z.boolean(),
  newsPerPage: z.number(),
  placeholderMode: z.boolean(),
});

export type FeaturesConfig = z.infer<typeof featuresConfigSchema>;

/** Prd: Rocky Linux (iwinv). IP/domain 확정 전 placeholder */
export const deployConfigSchema = z.object({
  _readme: z.string().optional(),
  environment: z.string(),
  serverOs: z.string(),
  provider: z.string(),
  publicIp: z.string(),
  domain: z.string(),
  siteUrl: z.string(),
  deployRoot: z.string(),
  nginxConfig: z.string(),
  ssl: z.object({
    enabled: z.boolean(),
    provider: z.string(),
    _note: z.string().optional(),
  }),
});

export type DeployConfig = z.infer<typeof deployConfigSchema>;
