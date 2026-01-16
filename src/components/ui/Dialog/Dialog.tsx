'use client';

import {
  DialogTitle,
  Dialog as HeadlessDialog,
  Transition,
  Description,
  TransitionChild,
  DialogPanel,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: DialogSize;
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const sizes: Record<DialogSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
};

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnEsc = true,
  closeOnBackdropClick = true,
  className = '',
}: DialogProps) {
  const { t } = useTranslation();

  const handleBackdropClose = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-50"
        onClose={closeOnEsc ? onClose : handleBackdropClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`w-full ${sizes[size]} transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all ${className}`}
              >
                {showCloseButton && (
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={onClose}
                    aria-label={t('common:dialog.close')}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                )}

                {title && (
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {title}
                  </DialogTitle>
                )}

                {description && (
                  <Description className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                  </Description>
                )}

                <div className={`${title || description ? 'mt-4' : ''}`}>
                  {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}
