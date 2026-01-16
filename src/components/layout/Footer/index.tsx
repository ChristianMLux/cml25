import { siGithub, siBluesky, siInspire, siGmail } from 'simple-icons';

import { SimpleIcon } from '@/components/ui/SimpleIcon';
import { LocalizedLink } from '@/lib/i18n-navigation';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/ChristianMLux',
    icon: siGithub.path,
  },
  {
    name: 'BlueSky',
    href: 'https://bsky.app/profile/whistlemaker.bsky.social',
    icon: siBluesky.path,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/christian-m-lux/',
    icon: siInspire.path,
  },
  {
    name: 'Email',
    href: 'mailto:christian.m.lux@gmail.com',
    icon: siGmail.path,
  },
];

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const quickLinks =
    locale === 'de'
      ? ['Projekte', 'Über mich', 'Kontakt']
      : ['Projects', 'About me', 'Contact'];
  return (
    <footer className="mt-auto bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <LocalizedLink href={'/' + locale} className="text-xl font-bold">
              Christian M. Lux
            </LocalizedLink>
            <p className="mt-4 text-sm text-foreground/60">
              {locale === 'de'
                ? 'Entwicklung digitaler Erlebnisse mit modernen Technologien.'
                : 'Building digital experiences with modern web technologies.'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <LocalizedLink
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-foreground/60 transition-colors hover:text-primary"
                  >
                    {item}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 transition-colors hover:text-primary"
                  aria-label={name}
                >
                  <SimpleIcon path={icon} title={name} size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} Christian M. Lux. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
