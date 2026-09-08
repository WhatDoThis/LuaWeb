/**
 * app.not-found (404 페이지)
 * ===========================
 * 정적 export → out/404.html (루트 layout이 html/body 미제공)
 *
 * [Main Functions]
 * - NotFound
 *
 * [Dependencies]
 * - next/link, @/lib/pretendard-font, @/styles/globals.css
 */

import { PRETENDARD_FONT_PRECONNECT, PRETENDARD_FONT_URL } from '@/lib/pretendard-font';
import Link from 'next/link';
import '@/styles/globals.css';

// 1. NotFound
export default function NotFound() {
  return (
    <html lang="ko">
      <head>
        <title>페이지를 찾을 수 없습니다</title>
        <link rel="preconnect" href={PRETENDARD_FONT_PRECONNECT} crossOrigin="anonymous" />
        <link rel="stylesheet" href={PRETENDARD_FONT_URL} crossOrigin="anonymous" />
      </head>
      <body className="p-8 font-sans antialiased">
        <h1 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h1>
        <p className="mt-2 text-gray-600">요청하신 주소가 없거나 이동되었습니다.</p>
        <p className="mt-4">
          <Link href="/ko/" className="text-blue-600 underline">
            홈으로 이동
          </Link>
        </p>
      </body>
    </html>
  );
}
