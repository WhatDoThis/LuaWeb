/**
 * lib.cn (className 유틸)
 * =======================
 * clsx + tailwind-merge 조합
 *
 * [Main Functions]
 * - cn
 *
 * [Dependencies]
 * - clsx, tailwind-merge
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 1. cn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
