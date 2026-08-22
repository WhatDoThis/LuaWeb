/**
 * content.board (뉴스 기사 로더)
 * =============================
 * board/news/{locale}/*.json 파일 로드·정렬
 *
 * [Main Functions]
 * - loadNewsArticles
 * - loadNewsArticle
 *
 * [Dependencies]
 * - node:fs, node:path, node:url
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type NewsLocale = 'ko' | 'en';

export type NewsArticleFile = {
  slug: string;
  date: string;
  category: 'notice' | 'news';
  pinned?: boolean;
  title: string;
  excerpt?: string;
  body: string;
  thumbnail?: string;
};

export type BoardArticle = Pick<
  NewsArticleFile,
  'slug' | 'date' | 'category' | 'pinned' | 'title' | 'excerpt'
>;

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const newsRoot = path.join(packageRoot, 'board', 'news');

// 1. loadNewsArticles
export function loadNewsArticles(locale: NewsLocale): NewsArticleFile[] {
  try {
    const dir = path.join(newsRoot, locale);
    const files = fs.readdirSync(dir).filter((file: string) => file.endsWith('.json'));
    const articles = files.map((file: string) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      return JSON.parse(raw) as NewsArticleFile;
    });
    return sortArticles(articles);
  } catch (error) {
    console.error('[loadNewsArticles]', { locale, cause: error });
    return [];
  }
}

// 2. loadNewsArticle
export function loadNewsArticle(locale: NewsLocale, slug: string): NewsArticleFile | null {
  return loadNewsArticles(locale).find((article) => article.slug === slug) ?? null;
}

// 3. toBoardArticle
export function toBoardArticle(article: NewsArticleFile): BoardArticle {
  return {
    slug: article.slug,
    date: article.date,
    category: article.category,
    pinned: article.pinned,
    title: article.title,
    excerpt: article.excerpt,
  };
}

function sortArticles(articles: NewsArticleFile[]): NewsArticleFile[] {
  return [...articles].sort((a, b) => {
    const pinA = a.pinned ? 1 : 0;
    const pinB = b.pinned ? 1 : 0;
    if (pinA !== pinB) {
      return pinB - pinA;
    }
    return b.date.localeCompare(a.date);
  });
}
