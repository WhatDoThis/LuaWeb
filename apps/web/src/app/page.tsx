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
import { PRETENDARD_FONT_PRECONNECT, PRETENDARD_FONT_URL } from '@/lib/pretendard-font';

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
        <link rel="preconnect" href={PRETENDARD_FONT_PRECONNECT} crossOrigin="anonymous" />
        <link rel="stylesheet" href={PRETENDARD_FONT_URL} crossOrigin="anonymous" />
        <meta httpEquiv="refresh" content="0; url=/ko/" />
        <link rel="canonical" href="/ko/" />
      </head>
      <body className="font-sans antialiased">
        <p>
          <a href="/ko/">한국어</a>
          {' · '}
          <a href="/en/">English</a>
        </p>
      </body>
    </html>
  );
}
