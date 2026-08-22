/**
 * check-images (이미지 슬롯 발주서 생성)
 * ======================================
 * listEmptyImageSlots → docs/report/IMAGE-REQUEST.md 마크다운 테이블
 *
 * [Main Functions]
 * - main
 *
 * [Dependencies]
 * - @repo/env, node:fs, node:path
 */

import { listEmptyImageSlots } from '@repo/env';
import fs from 'node:fs';
import path from 'node:path';

const OUTPUT = path.join(process.cwd(), 'docs', 'report', 'IMAGE-REQUEST.md');

function main() {
  try {
    const slots = listEmptyImageSlots();
    const date = new Date().toISOString().slice(0, 10);

    const lines = [
      '# IMAGE-REQUEST — 이미지 발주서',
      '',
      `> 자동 생성: \`pnpm check:images\` · ${date} · **${slots.length}** 슬롯 미입력`,
      '',
      '| 키 경로 | 필요 사이즈 | 비율 | where | 모바일 별도 |',
      '| --- | --- | --- | --- | --- |',
    ];

    for (const { path: slotPath, asset } of slots) {
      const mobile = asset.srcMobile ? 'Y' : '-';
      lines.push(
        `| \`${slotPath}\` | ${asset.size} | ${asset.ratio ?? '-'} | ${asset.where ?? '-'} | ${mobile} |`,
      );
    }

    lines.push('');
    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
    fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf8');
    console.log(`[check-images] wrote ${slots.length} slots → ${OUTPUT}`);
  } catch (error) {
    console.error('[check-images]', { cause: error });
    process.exit(1);
  }
}

main();
