/**
 * ui.modal (모달)
 * ===============
 * 개인정보처리방침 등 — focus trap, ESC, overlay click, 포커스 복원
 *
 * [Main Functions]
 * - Modal
 *
 * [Dependencies]
 * - @/lib/cn, @/lib/focus-trap, @/lib/site-identity
 */

'use client';

import { cn } from '@/lib/cn';
import { handleFocusTrapKeyDown } from '@/lib/focus-trap';
import { useEffect, useRef } from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeLabel: string;
  overlayCloseLabel: string;
};

// 1. Modal
export function Modal({
  open,
  onClose,
  title,
  children,
  closeLabel,
  overlayCloseLabel,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (panelRef.current) {
        handleFocusTrapKeyDown(event, panelRef.current);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
        onKeyDown={() => undefined}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lua-modal-title"
        className={cn(
          'relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="lua-modal-title" className="text-lg font-semibold text-primary">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-neutral-500 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={closeLabel}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="prose prose-sm max-w-none text-neutral-700">{children}</div>
        <span className="sr-only">{overlayCloseLabel}</span>
      </div>
    </div>
  );
}
