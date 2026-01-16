'use client';

import { useTranslation } from 'react-i18next';

import { useDialogStore } from '@/lib/store/dialogStore';

import { Button } from '../Button/button';

import { Dialog } from './Dialog';

export function DialogProvider() {
  const { isOpen, options, close, confirm, cancel } = useDialogStore();
  const { t } = useTranslation();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={close}
      title={options.title}
      description={options.description}
      size={options.size || 'md'}
      showCloseButton={options.showCloseButton}
      closeOnEsc={options.closeOnEsc}
      closeOnBackdropClick={options.closeOnBackdropClick}
    >
      {options.content}

      {options.showFooter && (
        <div className="mt-6 flex justify-end space-x-3">
          {options.cancelText && (
            <Button variant="secondary" onClick={cancel}>
              {options.cancelText || t('common:dialog.cancel')}
            </Button>
          )}
          {options.confirmText && (
            <Button variant="default" onClick={confirm}>
              {options.confirmText || t('common:dialog.confirm')}
            </Button>
          )}
        </div>
      )}
    </Dialog>
  );
}
