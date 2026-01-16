"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { LoadingOverlay } from "./LoadingOverlay";

type LoadingContextType = {
  showLoading: (id?: string) => void;
  hideLoading: (id?: string) => void;
  isLoading: (id?: string) => boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    global: false,
  });

  const showLoading = useCallback((id = "global") => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
  }, []);

  const hideLoading = useCallback((id = "global") => {
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  }, []);

  const isLoading = useCallback(
    (id = "global") => loadingStates[id] || false,
    [loadingStates],
  );

  const isAnyLoading = Object.values(loadingStates).some(Boolean);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      {children}
      {isAnyLoading && <LoadingOverlay />}
    </LoadingContext.Provider>
  );
}
