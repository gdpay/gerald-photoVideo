import Link from 'next/link';
import { SITE, NAV_ITEMS, SERVICES, LOCAL_CITIES } from '@/lib/constants';
import { Container } from '@/components/shared/container';
import { Heart, Music, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-cream/5">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl text-cream tracking-wider">
                Gerald<span className="text-gold">.</span>Photo
              </span>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed mb-6 max-w-xs">
              {SITE.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.185 2 11.615 2h.7zm-.08 1.802h-.7c-2.397 0-2.678.009-3.623.052-1.072.049-1.655.228-2.043.379-.514.2-.88.438-1.265.823-.385.385-.623.751-.823 1.265-.151.388-.33.971-.379 2.043-.043.945-.052 1.226-.052 3.623v.7c0 2.397.009 2.678.052 3.623.049 1.072.228 1.655.379 2.043.2.514.438.88.823 1.265.385.385.751.623 1.265.823.388.151.971.33 2.043.379.945.043 1.226.052 3.623.052h.7c2.397 0 2.678-.009 3.623-.052 1.072-.049 1.655-.228 2.043-.379.514-.2.88-.438 1.265-.823.385-.385.623-.751.823-1.265.151-.388.33-.971.379-2.043.043-.945.052-1.226.052-3.623v-.7c0-2.397-.009-2.678-.052-3.623-.049-1.072-.228-1.655-.379-2.043-.2-.514-.438-.88-.823-1.265-.385-.385-.751-.623-1.265-.823-.388-.151-.971-.33-2.043-.379-.945-.043-1.226-.052-3.623-.052zm0 1.802a4.396 4.396 0 100 8.792 4.396 4.396 0 000-8.792zm0 1.802a2.594 2.594 0 110 5.188 2.594 2.594 0 010-5.188zm5.098-.297a1.027 1.027 0 100 2.054 1.027 1.027 0 000-2.054z" />
                </svg>
              </a>
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors"
                aria-label="TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-accent text-xs uppercase tracking-[0.15em] text-gold mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-cream/50 hover:text-gold transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/portfolio"
                  className="text-cream/50 hover:text-gold transition-colors text-sm"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/investment"
                  className="text-cream/50 hover:text-gold transition-colors text-sm"
                >
                  Investment
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent text-xs uppercase tracking-[0.15em] text-gold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {['About', 'Reviews', 'FAQ', 'Blog', 'Contact'].map((label) => {
                const href = `/${label.toLowerCase()}`;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-cream/50 hover:text-gold transition-colors text-sm"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-xs uppercase tracking-[0.15em] text-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 text-gold shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 text-gold shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-cream/50 text-sm">
                  <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span>
                    Serving {SITE.address.region}
                  </span>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-accent uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
              >
                Book a Consultation →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-cream/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <p className="text-cream/20 text-xs flex items-center gap-1">
            Crafted with <Heart className="h-3 w-3 text-accent" /> in Nebraska
          </p>
        </div>
      </Container>
    </footer>
  );
}
