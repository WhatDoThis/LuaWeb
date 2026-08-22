/**
 * lib.board (뉴스 게시판 로더 re-export)
 * =======================================
 * @repo/content board loader 래퍼
 *
 * [Main Functions]
 * - loadNewsArticles
 * - loadNewsArticle
 * - toBoardArticle
 *
 * [Dependencies]
 * - @repo/content
 */

export {
  loadNewsArticle,
  loadNewsArticles,
  toBoardArticle,
  type BoardArticle,
  type NewsArticleFile,
} from '@repo/content';
