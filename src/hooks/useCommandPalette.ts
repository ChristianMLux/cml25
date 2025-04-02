import { useCallback, useEffect } from 'react';
import { useCommandPaletteStore } from '@/lib/store/uiStore';

interface UseCommandPaletteOptions {
  enableGlobalShortcut?: boolean;
}

/**
 * Hook for easy access to the Command Palette functionality
 * 
 * @param options Configuration options for the Command Palette
 * @returns Command Palette API functions
 */
export function useCommandPalette(options: UseCommandPaletteOptions = {}) {
  const { enableGlobalShortcut = true } = options;
  const { 
    isOpen, 
    open, 
    close, 
    recentCommands, 
    addRecentCommand 
  } = useCommandPaletteStore();


  const openCommandPalette = useCallback(() => {
    open();
  }, [open]);


  const closeCommandPalette = useCallback(() => {
    close();
  }, [close]);


  const trackCommand = useCallback((commandId: string) => {
    addRecentCommand(commandId);
  }, [addRecentCommand]);


  const toggleCommandPalette = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);


  useEffect(() => {
    if (!enableGlobalShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openCommandPalette();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableGlobalShortcut, openCommandPalette]);

  return {
    isOpen,
    open: openCommandPalette,
    close: closeCommandPalette,
    toggle: toggleCommandPalette,
    trackCommand,
    recentCommands
  };
}