import { useState, useEffect, useCallback } from 'react';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface UseLoadingOptions {
  /**
   * Initial loading state
   * @default 'idle'
   */
  initialState?: LoadingState;

  /**
   * Delay before showing loading state (in ms)
   * Prevents flickering for fast operations
   * @default 200
   */
  loadingDelay?: number;

  /**
   * Minimum display time for loading state (in ms)
   * Prevents too quick flashes of loading states
   * @default 300
   */
  minDisplayTime?: number;
}

/**
 * Hook for managing loading states with delayed showing and minimum display time
 * to prevent flickering UI.
 */
export function useLoading({
  initialState = 'idle',
  loadingDelay = 200,
  minDisplayTime = 300,
}: UseLoadingOptions = {}) {
  const [state, setState] = useState<LoadingState>(initialState);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (state === 'loading') {
      if (!loadingStartTime) {
        setLoadingStartTime(Date.now());
      }

      timeoutId = setTimeout(() => {
        setShowLoading(true);
      }, loadingDelay);
    } else {
      setShowLoading(false);
      setLoadingStartTime(null);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [state, loadingDelay, loadingStartTime]);

  const wrapAsync = useCallback(
    <T>(asyncFn: () => Promise<T>): Promise<T> => {
      setState('loading');
      const startTime = Date.now();

      return new Promise<T>((resolve, reject) => {
        asyncFn()
          .then((result) => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
              setState('success');
              resolve(result);
            }, remainingTime);
          })
          .catch((error) => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

            setTimeout(() => {
              setState('error');
              reject(error);
            }, remainingTime);
          });
      });
    },
    [minDisplayTime],
  );

  const setLoading = useCallback(() => setState('loading'), []);
  const setSuccess = useCallback(() => setState('success'), []);
  const setError = useCallback(() => setState('error'), []);
  const reset = useCallback(() => setState('idle'), []);

  return {
    isIdle: state === 'idle',
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    showLoading,
    state,
    setLoading,
    setSuccess,
    setError,
    reset,
    wrapAsync,
  };
}
