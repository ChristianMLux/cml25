import { Skeleton } from '../Skeleton';

export default function FooterSkeleton() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Skeleton className="h-6 w-40 mb-4 md:mb-0" />
        <div className="flex space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </footer>
  );
}
