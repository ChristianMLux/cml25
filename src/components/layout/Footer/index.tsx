import Link from 'next/link';
import { siGithub, siBluesky, siInspire, siGmail } from 'simple-icons';



const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: siGithub.svg,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: siBluesky.svg,
  },

  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: siInspire.svg,
  },
  {
    name: 'Email',
    href: 'mailto:your.email@example.com',
    icon: siGmail.svg,
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Description */}
          <div>
            <Link href="/" className="text-xl font-bold">
              YourName
            </Link>
            <p className="mt-4 text-sm text-foreground/60">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {['Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-foreground/60 transition-colors hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 transition-colors hover:text-primary"
                  aria-label={name}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} YourName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}