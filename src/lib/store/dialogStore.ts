import { ReactNode } from 'react';
import { create } from 'zustand';

import { DialogSize } from '@/components/ui/Dialog/Dialog';

export interface DialogOptions {
  title?: string;
  description?: string;
  content?: ReactNode;
  size?: DialogSize;
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnBackdropClick?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
}

interface DialogState {
  isOpen: boolean;
  options: DialogOptions;
  open: (options: DialogOptions) => void;
  close: () => void;
  confirm: () => void;
  cancel: () => void;
}

export const useDialogStore = create<DialogState>((set, get) => ({
  isOpen: false,
  options: {},
  open: (options: DialogOptions) => set({ isOpen: true, options }),
  close: () => set({ isOpen: false }),
  confirm: () => {
    const { options } = get();
    if (options.onConfirm) {
      options.onConfirm();
    }
    set({ isOpen: false });
  },
  cancel: () => {
    const { options } = get();
    if (options.onCancel) {
      options.onCancel();
    }
    set({ isOpen: false });
  },
}));

export function useDialog() {
  const { open, close } = useDialogStore();

  const alert = (
    title: string,
    content: ReactNode,
    options?: Partial<DialogOptions>,
  ) => {
    open({
      title,
      content,
      showFooter: true,
      confirmText: 'OK',
      showCloseButton: true,
      closeOnEsc: true,
      closeOnBackdropClick: true,
      ...options,
    });
  };

  const confirmDialog = (
    title: string,
    content: ReactNode,
    onConfirm: () => void,
    options?: Partial<DialogOptions>,
  ) => {
    open({
      title,
      content,
      onConfirm,
      showFooter: true,
      confirmText: 'OK',
      cancelText: 'Abbrechen',
      showCloseButton: true,
      closeOnEsc: true,
      closeOnBackdropClick: true,
      ...options,
    });
  };

  const custom = (options: DialogOptions) => {
    open(options);
  };

  return {
    alert,
    confirm: confirmDialog,
    custom,
    close,
  };
}
