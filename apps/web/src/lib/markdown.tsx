/**
 * lib.markdown (Markdown 본문 렌더)
 * ===================================
 * react-markdown으로 뉴스 본문 HTML 변환
 *
 * [Main Functions]
 * - MarkdownBody
 *
 * [Dependencies]
 * - react-markdown, @/lib/site-identity
 */

import { luaClass } from '@/lib/site-identity';
import ReactMarkdown from 'react-markdown';

export type MarkdownBodyProps = {
  content: string;
};

// 1. MarkdownBody
export function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <div
      className={`${luaClass('board-markdown')} space-y-4 text-neutral-700 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-primary [&_li]:ml-4 [&_ol]:list-decimal [&_ul]:list-disc`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
