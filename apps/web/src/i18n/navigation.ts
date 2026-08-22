/**
 * i18n.navigation (locale-aware 네비게이션)
 * ========================================
 * Link, redirect, usePathname, useRouter re-export
 *
 * [Main Functions]
 * - Link, redirect, usePathname, useRouter
 *
 * [Dependencies]
 * - next-intl/navigation, ./routing
 */

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// 1. createNavigation
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
