/**
 * app.page (루트 페이지)
 * ======================
 * 정적 export: / 접근 시 meta refresh로 /ko/ 이동 (서버 redirect 불가)
 *
 * [Main Functions]
 * - metadata
 * - RootPage
 *
 * [Dependencies]
 * - next
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

// 1. RootPage
export default function RootPage() {
  return (
    <html lang="ko">
      <head>
        <meta httpEquiv="refresh" content="0; url=/ko/" />
        <link rel="canonical" href="/ko/" />
      </head>
      <body>
        <p>
          <a href="/ko/">한국어</a>
          {' · '}
          <a href="/en/">English</a>
        </p>
      </body>
    </html>
  );
}
