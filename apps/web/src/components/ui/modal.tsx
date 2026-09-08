/**
 * ui.modal (모달)
 * ===============
 * 개인정보처리방침 등 — focus trap, ESC, overlay click
 *
 * [Main Functions]
 * - Modal
 *
 * [Dependencies]
 * - @/lib/cn
 */

'use client';

import { cn } from '@/lib/cn';
import { useEffect, useRef } from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

// 1. Modal
export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close modal overlay"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lua-modal-title"
        tabIndex={-1}
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
            type="button"
            className="text-neutral-500 hover:text-primary"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="prose prose-sm max-w-none text-neutral-700">{children}</div>
      </div>
    </div>
  );
}
