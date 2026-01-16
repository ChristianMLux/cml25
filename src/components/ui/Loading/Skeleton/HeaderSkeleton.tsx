import { Skeleton } from '../Skeleton';

export default function HeaderSkeleton() {
  return (
    <header className="py-4 px-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
        <div className="hidden md:flex space-x-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full md:hidden" />
      </div>
    </header>
  );
}
