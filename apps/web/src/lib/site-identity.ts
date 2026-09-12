/**
 * lib.site-identity (사이트 식별 상수)
 * ====================================
 * HTML data-/id/class 접두 — Lua 사이트 전용 DOM 식별자
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
