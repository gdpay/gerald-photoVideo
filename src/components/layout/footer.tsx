import Link from 'next/link';
import Image from 'next/image';
import { SITE, LOCAL_CITIES } from '@/lib/constants';
import { Container } from '@/components/shared/container';
import { Mail, Music, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06112A] text-[#FAF7F2]">
      <Container className="py-2 lg:py-3">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[1.1fr_1.45fr_0.75fr_1.35fr] lg:gap-6">
          <div className="lg:border-r lg:border-[#C8A23D]/45 lg:pr-10">
            <Link href="/" className="inline-block">
              <Image
                src="/Gerald Photo Video-w.png"
                alt={SITE.name}
                width={200}
                height={48}
                className="h-auto w-44"
              />
            </Link>
            <p className="mt-3 max-w-xs font-heading text-sm leading-relaxed text-[#FAF7F2]/62">
              Timeless photography and cinematic films for life&apos;s most beautiful moments.
            </p>
          </div>

          <div className="lg:border-r lg:border-[#C8A23D]/45 lg:pr-10">
            <h4 className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF7F2]/85">
              Serving Nebraska & Iowa
            </h4>
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-body text-xs text-[#FAF7F2]/58">
              {LOCAL_CITIES.slice(0, 4).map((city, index) => (
                <span key={city.slug} className="inline-flex items-center gap-3">
                  <Link href={`/${city.slug}-wedding-photographer`} className="transition hover:text-[#C8A23D]">
                    {city.name}
                  </Link>
                  {index < 3 && <span className="h-1 w-1 rounded-full bg-[#C8A23D]" aria-hidden="true" />}
                </span>
              ))}
            </div>
            <p className="mt-2 font-body text-xs text-[#FAF7F2]/58">and surrounding areas.</p>
          </div>

          <div className="lg:border-r lg:border-[#C8A23D]/45 lg:pr-10">
            <h4 className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF7F2]/85">
              Connect
            </h4>
            <div className="mt-3 flex items-center gap-3">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2]/70 transition hover:text-[#C8A23D]" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 15.013 2 14.658 2 12.228v-.456c0-2.43.013-2.785.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C8.902 2.013 9.257 2 11.687 2h.628zm-.315 5.838a4.162 4.162 0 100 8.324 4.162 4.162 0 000-8.324zm0 1.459a2.703 2.703 0 110 5.406 2.703 2.703 0 010-5.406zm4.326-2.595a.973.973 0 100 1.946.973.973 0 000-1.946z" />
                </svg>
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2]/70 transition hover:text-[#C8A23D]" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03h-2.54v-2.91h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.196 2.238.196v2.476h-1.26c-1.243 0-1.63.776-1.63 1.568v1.89h2.773l-.443 2.91h-2.33V22C18.343 21.244 22 17.082 22 12.06z" />
                </svg>
              </a>
              <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2]/70 transition hover:text-[#C8A23D]" aria-label="TikTok">
                <Music className="h-5 w-5" />
              </a>
              <a href="/videography" className="text-[#FAF7F2]/70 transition hover:text-[#C8A23D]" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.5 6.2a3.02 3.02 0 00-2.13-2.14C19.49 3.56 12 3.56 12 3.56s-7.49 0-9.37.5A3.02 3.02 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3.02 3.02 0 002.13 2.14c1.88.5 9.37.5 9.37.5s7.49 0 9.37-.5a3.02 3.02 0 002.13-2.14A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.75 15.57V8.43L16 12l-6.25 3.57z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF7F2]/85">
              Get In Touch
            </h4>
            <div className="mt-3 space-y-2 font-body text-xs text-[#FAF7F2]/62">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition hover:text-[#C8A23D]">
                <Mail className="h-4 w-4 text-[#C8A23D]" />
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-3 transition hover:text-[#C8A23D]">
                <Phone className="h-4 w-4 text-[#C8A23D]" />
                {SITE.phone}
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-10 items-center justify-center border border-[#C8A23D] px-5 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C8A23D] transition hover:bg-[#C8A23D] hover:text-[#06112A]"
            >
              Check Availability
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-[#FAF7F2]/8 pt-4 text-center">
          <p className="font-body text-[10px] text-[#FAF7F2]/45">
            &copy; {currentYear} {SITE.name}. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
