type Category = "web" | "mobile" | "design" | string;
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  content?: string;
  technologies: string[];
  blurDataUrl?: string;
  category: Category;
  tags: string[];
  link: string | undefined;
}

export type Theme = "light" | "dark" | "system";

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface CommandPaletteState {
  isOpen: boolean;
  recentCommands: string[];
  open: () => void;
  close: () => void;
  addRecentCommand: (command: string) => void;
}

export interface Locale {
  locale: string;
  name: string;
  flag: string;
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}
