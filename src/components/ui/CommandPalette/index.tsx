"use client";

import {
  HomeIcon,
  UserIcon,
  EnvelopeIcon,
  RectangleGroupIcon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import {
  useEffect,
  useState,
  useRef,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useTranslation } from "react-i18next";

import { useThemeStore } from "@/lib/store/themeStore";
import { useCommandPaletteStore } from "@/lib/store/uiStore";

import { Dialog } from "../Dialog/Dialog";

import { CommandItem } from "./CommandItem";

const SEARCH_INPUT_ID = "command-palette-search-input";

export interface Command {
  id: string;
  label: string;
  icon: React.ElementType;
  category: "navigation" | "action" | "settings";
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useThemeStore();
  const { isOpen, open, close, recentCommands, addRecentCommand } =
    useCommandPaletteStore();

  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<HTMLUListElement>(null);

  const navigateTo = (path: string) => {
    close();
    setTimeout(() => {
      try {
        window.location.href = path;
      } catch (error) {
        console.error("Navigation fehlgeschlagen:", error);
      }
    }, 10);
  };

  const switchLanguage = () => {
    try {
      const currentLang = i18n.language;
      const newLang = currentLang === "de" ? "en" : "de";
      const currentPath = window.location.pathname;
      const pathMatch = currentPath.match(/^\/[^\/]+(.*)$/);
      const pathWithoutLang = pathMatch ? pathMatch[1] : "";
      const newPath = `/${newLang}${pathWithoutLang}`;

      close();
      setTimeout(() => {
        window.location.href = newPath;
      }, 10);
    } catch (error) {
      console.error("Sprachwechsel fehlgeschlagen:", error);
      close();
    }
  };

  const allCommands: Command[] = [
    {
      id: "home",
      label: t("command:navigation.home"),
      icon: HomeIcon,
      category: "navigation",
      shortcut: "g h",
      action: () => {
        navigateTo(`/${i18n.language}`);
        handleCommandSelect("home");
      },
    },
    {
      id: "projects",
      label: t("command:navigation.projects"),
      icon: RectangleGroupIcon,
      category: "navigation",
      shortcut: "g p",
      action: () => {
        navigateTo(`/${i18n.language}/projects`);
        handleCommandSelect("projects");
      },
    },
    {
      id: "about",
      label: t("command:navigation.about"),
      icon: UserIcon,
      category: "navigation",
      shortcut: "g a",
      action: () => {
        navigateTo(`/${i18n.language}/about`);
        handleCommandSelect("about");
      },
    },
    {
      id: "contact",
      label: t("command:navigation.contact"),
      icon: EnvelopeIcon,
      category: "navigation",
      shortcut: "g c",
      action: () => {
        navigateTo(`/${i18n.language}/contact`);
        handleCommandSelect("contact");
      },
    },
    {
      id: "theme-toggle",
      label:
        theme === "dark"
          ? t("command:actions.switchLightTheme")
          : t("command:actions.switchDarkTheme"),
      icon: theme === "dark" ? MoonIcon : SunIcon,
      category: "action",
      shortcut: "t t",
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        handleCommandSelect("theme-toggle");
        close();
      },
    },
    {
      id: "language-toggle",
      label:
        i18n.language === "de"
          ? t("command:actions.switchToEnglish")
          : t("command:actions.switchToGerman"),
      icon: LanguageIcon,
      category: "action",
      shortcut: "l l",
      action: () => {
        switchLanguage();
        handleCommandSelect("language-toggle");
      },
    },
  ];

  const filteredCommands = allCommands.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase()),
  );

  const recentCommandObjects = recentCommands
    .map((id) => allCommands.find((cmd) => cmd.id === id))
    .filter(Boolean) as Command[];
  const handleCommandSelect = (id: string) => {
    addRecentCommand(id);
  };

  const getNavigableCommands = () => {
    const navigableCommands: Command[] = [];

    if (search === "" && recentCommandObjects.length > 0) {
      navigableCommands.push(...recentCommandObjects);
    }

    navigableCommands.push(...filteredCommands);

    return navigableCommands;
  };

  const navigableCommands = getNavigableCommands();

  const isCommandActive = (
    command: Command,
    categoryIndex: number,
    section: "recent" | "filtered",
  ) => {
    if (navigableCommands.length === 0) return false;

    let absoluteIndex = -1;

    if (section === "recent") {
      absoluteIndex = categoryIndex;
    } else {
      const recentOffset =
        search === "" && recentCommandObjects.length > 0
          ? recentCommandObjects.length
          : 0;
      absoluteIndex = recentOffset + categoryIndex;
    }

    return absoluteIndex === activeIndex;
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < navigableCommands.length - 1 ? prev++ : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : navigableCommands.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (navigableCommands[activeIndex]) {
          navigableCommands[activeIndex].action();
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (e.key === "ArrowDown") {
          setActiveIndex((prev) =>
            prev < navigableCommands.length - 1 ? prev + 1 : 0,
          );
        } else {
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : navigableCommands.length - 1,
          );
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (navigableCommands[activeIndex]) {
          navigableCommands[activeIndex].action();
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, activeIndex, navigableCommands]);

  useEffect(() => {
    if (!isOpen) return;
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }

      const inputElement = document.getElementById(SEARCH_INPUT_ID);
      if (inputElement instanceof HTMLInputElement) {
        inputElement.focus();
      }
    };

    focusInput();

    const timers = [
      setTimeout(focusInput, 10),
      setTimeout(focusInput, 50),
      setTimeout(focusInput, 150),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    const activeElement = document.querySelector(
      '.command-palette [aria-selected="true"]',
    ) as HTMLElement;
    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const groupedCommands = filteredCommands.reduce<Record<string, Command[]>>(
    (acc, command) => {
      const category = command.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(command);
      return acc;
    },
    {},
  );

  return (
    <Dialog
      isOpen={isOpen}
      onClose={close}
      size="md"
      showCloseButton={false}
      className="command-palette-dialog"
    >
      <div className="command-palette">
        <div className="relative">
          <input
            id={SEARCH_INPUT_ID}
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t("command:searchPlaceholder")}
            className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
            autoComplete="off"
            autoFocus={true}
            tabIndex={0}
            aria-label={t("command:searchLabel")}
          />
          <div className="absolute right-3 top-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded font-mono">
            {t("command:shortcutHint")}
          </div>
        </div>

        <div className="mt-4 overflow-y-auto max-h-[60vh]">
          {recentCommandObjects.length > 0 && search === "" && (
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                {t("command:recentlyUsed")}
              </h3>
              <ul className="space-y-1">
                {recentCommandObjects.map((command, index) => (
                  <CommandItem
                    key={command.id}
                    command={command}
                    isActive={isCommandActive(command, index, "recent")}
                    onClick={() => command.action()}
                  />
                ))}
              </ul>
            </div>
          )}

          {Object.entries(groupedCommands).map(([category, commands]) => (
            <div key={category} className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                {t(`command:categories.${category}`)}
              </h3>
              <ul ref={commandListRef} className="space-y-1">
                {commands.map((command) => {
                  let globalCategoryIndex = 0;

                  for (let i = 0; i < filteredCommands.indexOf(command); i++) {
                    if (filteredCommands[i].category === category) {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      globalCategoryIndex++;
                    }
                  }

                  return (
                    <CommandItem
                      key={command.id}
                      command={command}
                      isActive={isCommandActive(
                        command,
                        filteredCommands.indexOf(command),
                        "filtered",
                      )}
                      onClick={() => command.action()}
                    />
                  );
                })}
              </ul>
            </div>
          ))}

          {filteredCommands.length === 0 && (
            <div className="py-6 text-center text-gray-500 dark:text-gray-400">
              {t("command:noResults")}
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between items-center">
            <span>{t("command:tip")}</span>
            <button
              onClick={close}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {t("command:dismiss")}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
