/**
 * lib.site-identity (사이트 식별 상수)
 * ====================================
 * HTML data-/id/class 접두 — 벤치마크 사이트와 DOM 식별자 혼동 방지
 *
 * [Main Functions]
 * - LUA_SITE_ID
 * - luaClass
 *
 * [Dependencies]
 * - 없음
 */

export const LUA_SITE_ID = 'lua';

// 1. luaClass
export function luaClass(name: string): string {
  return `lua-${name}`;
}
