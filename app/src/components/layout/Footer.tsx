import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
  FOOTER_COMPANY,
  FOOTER_PRODUCTS,
  FOOTER_RESOURCES,
  SITE,
} from './nav-config';
import { NewsletterBand } from './NewsletterBand';
import { getCertifications } from '@/lib/data';

export function Footer() {
  const certs = getCertifications().slice(0, 6);
  return (
    <footer className="bg-brand-charcoal text-neutral-300">
      <NewsletterBand />
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <FooterColumn title="Company" links={FOOTER_COMPANY} />
        <FooterColumn title="Products" links={FOOTER_PRODUCTS} />
        <FooterColumn title="Resources" links={FOOTER_RESOURCES} />
        <div>
          <h3 className="mb-4 font-serif text-base font-semibold uppercase tracking-wider text-white">
            Get in touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-brand-gold" aria-hidden />
              <a href={`tel:${SITE.phone}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-brand-gold" aria-hidden />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-gold" aria-hidden />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="container-x flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-neutral-400">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="text-neutral-400 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-neutral-400 hover:text-white">
              Terms
            </Link>
            <ul className="flex flex-wrap items-center gap-3" aria-label="Certifications">
              {certs.map((c) => (
                <li
                  key={c.slug}
                  className="rounded border border-neutral-700 px-2 py-0.5 text-xs uppercase tracking-wider text-neutral-300"
                >
                  {c.shortName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-serif text-base font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
