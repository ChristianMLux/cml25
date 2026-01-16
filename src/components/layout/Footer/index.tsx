/**
 * @component Footer
 * @description Site footer with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Structural Integrity" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Semantic structure, accessible links.
 */

import { siGithub, siBluesky, siInspire, siGmail } from "simple-icons";

import { SimpleIcon } from "@/components/ui/SimpleIcon";
import { LocalizedLink } from "@/lib/i18n-navigation";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ChristianMLux",
    icon: siGithub.path,
  },
  {
    name: "BlueSky",
    href: "https://bsky.app/profile/whistlemaker.bsky.social",
    icon: siBluesky.path,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/christian-m-lux/",
    icon: siInspire.path,
  },
  {
    name: "Email",
    href: "mailto:christian.m.lux@gmail.com",
    icon: siGmail.path,
  },
];

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const quickLinks =
    locale === "de"
      ? ["Projekte", "Über mich", "Kontakt"]
      : ["Projects", "About me", "Contact"];
  return (
    <footer className="mt-auto bg-background border-t border-glass-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <LocalizedLink
              href={"/" + locale}
              className="text-xl font-bold text-foreground hover:text-cyber-neon transition-colors duration-200"
            >
              Christian M. Lux
            </LocalizedLink>
            <p className="mt-4 text-sm text-muted-foreground">
              {locale === "de"
                ? "Entwicklung digitaler Erlebnisse mit modernen Technologien."
                : "Building digital experiences with modern web technologies."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <LocalizedLink
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-cyber-neon"
                  >
                    {item}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="mt-4 flex space-x-3">
              {socialLinks.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-glass-low border border-glass-border text-muted-foreground transition-all duration-200 ease-spring hover:border-cyber-neon hover:text-cyber-neon hover:shadow-lg hover:shadow-cyber-neon/20"
                  aria-label={name}
                >
                  <SimpleIcon path={icon} title={name} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-glass-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Christian M. Lux. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
