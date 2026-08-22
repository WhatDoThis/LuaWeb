/**
 * env.index (환경 설정 로더)
 * ==========================
 * site, features, images, deploy JSON 빌드 타임 로드 및 zod 검증
 *
 * [Main Functions]
 * - getSite
 * - getFeatures
 * - getDeploy
 * - getImage
 * - listEmptyImageSlots
 *
 * [Dependencies]
 * - ./site.json, ./features.json, ./images.json, ./deploy.json, ./schema
 */

import deploy from './deploy.json';
import features from './features.json';
import images from './images.json';
import site from './site.json';
import {
  deployConfigSchema,
  featuresConfigSchema,
  imageAssetSchema,
  siteConfigSchema,
  type DeployConfig,
  type FeaturesConfig,
  type ImageAsset,
  type SiteConfig,
} from './schema';

// 1. getSite
export function getSite(): SiteConfig {
  return siteConfigSchema.parse(site);
}

// 2. getFeatures
export function getFeatures(): FeaturesConfig {
  return featuresConfigSchema.parse(features);
}

// 3. getDeploy
export function getDeploy(): DeployConfig {
  return deployConfigSchema.parse(deploy);
}

function isImageAsset(value: unknown): value is ImageAsset {
  return imageAssetSchema.safeParse(value).success;
}

function resolvePath(root: unknown, segments: string[]): unknown {
  return segments.reduce<unknown>((acc, segment) => {
    if (acc === null || acc === undefined) {
      return undefined;
    }
    if (Array.isArray(acc)) {
      const index = Number(segment);
      if (Number.isNaN(index)) {
        return undefined;
      }
      return acc[index];
    }
    if (typeof acc === 'object') {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, root);
}

// 4. getImage
export function getImage(path: string): ImageAsset {
  const segments = path.split('.');
  const found = resolvePath(images, segments);

  if (!isImageAsset(found)) {
    throw new Error(`[getImage] 경로 없음 또는 ImageAsset 아님: ${path}`);
  }

  return found;
}

function walkImageSlots(node: unknown, prefix: string, results: { path: string; asset: ImageAsset }[]) {
  if (isImageAsset(node)) {
    if (node.src === '') {
      results.push({ path: prefix, asset: node });
    }
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      walkImageSlots(item, prefix ? `${prefix}.${index}` : String(index), results);
    });
    return;
  }

  if (node && typeof node === 'object') {
    Object.entries(node as Record<string, unknown>).forEach(([key, value]) => {
      walkImageSlots(value, prefix ? `${prefix}.${key}` : key, results);
    });
  }
}

// 5. listEmptyImageSlots
export function listEmptyImageSlots(): { path: string; asset: ImageAsset }[] {
  const results: { path: string; asset: ImageAsset }[] = [];
  walkImageSlots(images, '', results);
  return results.sort((a, b) => a.path.localeCompare(b.path));
}

export type { DeployConfig, FeaturesConfig, ImageAsset, SiteConfig };
