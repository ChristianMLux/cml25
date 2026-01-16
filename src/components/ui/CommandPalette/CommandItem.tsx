'use client';

import { forwardRef } from 'react';

import { Command } from './index';

interface CommandItemProps {
  command: Command;
  isActive: boolean;
  onClick: () => void;
}

export const CommandItem = forwardRef<HTMLLIElement, CommandItemProps>(
  ({ command, isActive, onClick }, ref) => {
    const Icon = command.icon;

    return (
      <li
        ref={ref}
        onClick={onClick}
        className={`
          flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors
          ${
      isActive
        ? 'bg-blue-500 text-white'
        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
      }
        `}
        aria-selected={isActive}
        role="option"
      >
        <div className="flex items-center flex-1">
          <span
            className={`mr-3 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span>{command.label}</span>
        </div>

        {command.shortcut && (
          <div className="text-xs font-mono">
            <kbd
              className={`px-1.5 py-0.5 rounded ${
                isActive
                  ? 'bg-blue-600 text-blue-100'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}
            >
              {command.shortcut}
            </kbd>
          </div>
        )}
      </li>
    );
  },
);

CommandItem.displayName = 'CommandItem';
