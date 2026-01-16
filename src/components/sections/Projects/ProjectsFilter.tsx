"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const categories = [
  { id: "all", label: "Alle" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "design", label: "Design" },
];

export default function ProjectsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (category: string) => {
    router.push(`${pathname}?${createQueryString("category", category)}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm ${
            currentCategory === category.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
