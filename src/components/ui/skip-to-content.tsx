'use client';

import { useEffect, useState } from 'react';

export default function SkipToContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <a
      href="#main-content"
      className="absolute left-0 p-3 bg-blue-600 text-white z-50 transform -translate-y-full focus:translate-y-0 focus:outline-none transition-transform"
    >
      Skip to content
    </a>
  );
}
