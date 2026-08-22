/**
 * content.index (콘텐츠 로더)
 * =========================
 * locale별 JSON namespace 메시지 로드
 *
 * [Main Functions]
 * - loadMessages
 *
 * [Dependencies]
 * - packages/content/{ko,en}/*.json
 */

import koCareer from './ko/career.json';
import koCommon from './ko/common.json';
import koCompany from './ko/company.json';
import koHome from './ko/home.json';
import koManagement from './ko/management.json';
import koPrCenter from './ko/prCenter.json';
import koTechnology from './ko/technology.json';
import enCareer from './en/career.json';
import enCommon from './en/common.json';
import enCompany from './en/company.json';
import enHome from './en/home.json';
import enManagement from './en/management.json';
import enPrCenter from './en/prCenter.json';
import enTechnology from './en/technology.json';
export {
  loadNewsArticle,
  loadNewsArticles,
  toBoardArticle,
  type BoardArticle,
  type NewsArticleFile,
} from './board';

export type Locale = 'ko' | 'en';

export type AllMessages = {
  common: typeof koCommon;
  home: typeof koHome;
  company: typeof koCompany;
  technology: typeof koTechnology;
  management: typeof koManagement;
  prCenter: typeof koPrCenter;
  career: typeof koCareer;
};

const koMessages: AllMessages = {
  common: koCommon,
  home: koHome,
  company: koCompany,
  technology: koTechnology,
  management: koManagement,
  prCenter: koPrCenter,
  career: koCareer,
};

const enMessages: AllMessages = {
  common: enCommon,
  home: enHome,
  company: enCompany,
  technology: enTechnology,
  management: enManagement,
  prCenter: enPrCenter,
  career: enCareer,
};

// 1. loadMessages
export async function loadMessages(locale: Locale): Promise<AllMessages> {
  if (locale === 'ko') {
    return koMessages;
  }
  return enMessages;
}
