import Link from 'next/link';
import Image from 'next/image';
import { SITE, LOCAL_CITIES } from '@/lib/constants';
import { Container } from '@/components/shared/container';
import { Mail, Phone } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Footer({ settings }: { settings?: any }) {
  const currentYear = new Date().getFullYear();

  const name = settings?.title || SITE.name;
  const email = settings?.email || SITE.email;
  const phone = settings?.phone || SITE.phone;
  const phoneRaw = settings?.phone?.replace(/[^+\d]/g, '') || SITE.phoneRaw;
  const socials = {
    instagram: settings?.socialLinks?.instagram || SITE.social.instagram,
    facebook: settings?.socialLinks?.facebook || SITE.social.facebook,
    tiktok: settings?.socialLinks?.tiktok || SITE.social.tiktok,
    youtube: settings?.socialLinks?.youtube || SITE.social.youtube,
  };
  const footerTagline = settings?.footerTagline || 'Timeless photography and cinematic films for life&apos;s most beautiful moments.';
  const footerNote = settings?.footerNote || 'and surrounding areas.';
  const availabilityLabel = settings?.availabilityButtonLabel || 'Check Availability';

  return (
    <footer className="relative overflow-hidden bg-[#06112A] text-[#FAF7F2]">
      <Container className="py-3 lg:py-2">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:min-h-[56px] lg:grid-cols-[200px_minmax(260px,1fr)_130px_180px_180px] lg:items-stretch lg:gap-0">
          <div className="flex h-full flex-col items-center justify-center text-center lg:pr-6">
            <Link href="/" className="inline-flex justify-center">
              <Image
                src="/Gerald Photo Video-w.png"
                alt={name}
                width={200}
                height={48}
                className="h-auto w-32 lg:w-32"
              />
            </Link>
            <p className="mt-1.5 max-w-[190px] text-center font-heading text-[11px] leading-snug text-[#FAF7F2]/72">
              {footerTagline}
            </p>
          </div>

          <div className="flex h-full flex-col justify-center lg:border-l lg:border-[#9C7A35] lg:px-6">
            <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF7F2]">
              Serving {settings?.addressRegion || 'Nebraska & Iowa'}
            </h4>
            <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 font-body text-[11px] text-[#FAF7F2]/82 xl:flex-nowrap">
              {LOCAL_CITIES.slice(0, 4).map((city, index) => (
                <span key={city.slug} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Link href={`/${city.slug}-wedding-photographer`} className="transition hover:text-[#C8A23D]">
                    {city.name}
                  </Link>
                  {index < 3 && <span className="h-1 w-1 rounded-full bg-[#C8A23D]" aria-hidden="true" />}
                </span>
              ))}
            </div>
            <p className="mt-1 font-body text-[11px] text-[#FAF7F2]/82">{footerNote}</p>
          </div>

          <div className="flex h-full flex-col items-center justify-center lg:px-5">
            <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF7F2]">
              Connect
            </h4>
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2] transition hover:text-[#C8A23D]" aria-label="Instagram">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 15.013 2 14.658 2 12.228v-.456c0-2.43.013-2.785.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C8.902 2.013 9.257 2 11.687 2h.628zm-.315 5.838a4.162 4.162 0 100 8.324 4.162 4.162 0 000-8.324zm0 1.459a2.703 2.703 0 110 5.406 2.703 2.703 0 010-5.406zm4.326-2.595a.973.973 0 100 1.946.973.973 0 000-1.946z" />
                </svg>
              </a>
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2] transition hover:text-[#C8A23D]" aria-label="Facebook">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03h-2.54v-2.91h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.196 2.238.196v2.476h-1.26c-1.243 0-1.63.776-1.63 1.568v1.89h2.773l-.443 2.91h-2.33V22C18.343 21.244 22 17.082 22 12.06z" />
                </svg>
              </a>
              <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2] transition hover:text-[#C8A23D]" aria-label="TikTok">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.6 5.82a5.28 5.28 0 003.28 1.1V10a8.37 8.37 0 01-3.28-.68v5.68A5.02 5.02 0 1111.58 10c.35 0 .69.04 1.02.11v3.18a2.05 2.05 0 00-1.02-.27 2.01 2.01 0 102.01 2.01V2h3.01v3.82z" />
                </svg>
              </a>
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2] transition hover:text-[#C8A23D]" aria-label="YouTube">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.5 6.2a3.02 3.02 0 00-2.13-2.14C19.49 3.56 12 3.56 12 3.56s-7.49 0-9.37.5A3.02 3.02 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3.02 3.02 0 002.13 2.14c1.88.5 9.37.5 9.37.5s7.49 0 9.37-.5a3.02 3.02 0 002.13-2.14A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.75 15.57V8.43L16 12l-6.25 3.57z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex h-full flex-col items-center justify-center lg:border-l lg:border-[#9C7A35] lg:px-5">
            <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF7F2]">
              Get In Touch
            </h4>
            <div className="mt-1.5 flex flex-col items-start gap-1 font-body text-[11px] text-[#E3D6B8]">
              <a href={`mailto:${email}`} className="flex items-center gap-2 transition hover:text-[#C8A23D]">
                <Mail className="h-3 w-3 text-[#FAF7F2]" />
                {email}
              </a>
              <a href={`tel:${phoneRaw}`} className="flex items-center gap-2 transition hover:text-[#C8A23D]">
                <Phone className="h-3 w-3 text-[#FAF7F2]" />
                {phone}
              </a>
            </div>
          </div>

          <div className="flex h-full items-center lg:justify-end lg:pl-4">
            <Link
              href="/contact"
              className="inline-flex h-8 items-center justify-center border border-[#C8A23D] px-5 font-body text-[9px] font-bold uppercase tracking-[0.15em] text-[#C8A23D] transition hover:bg-[#C8A23D] hover:text-[#06112A]"
            >
              {availabilityLabel}
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-t border-[#9C7A35]/45">
        <Container className="flex min-h-5 items-center justify-center py-1">
          <p className="font-body text-[8px] text-[#FAF7F2]/70">
            &copy; {currentYear} {name}. All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
