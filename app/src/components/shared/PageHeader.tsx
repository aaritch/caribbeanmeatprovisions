import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  className?: string;
}

export function PageHeader({ eyebrow, title, subtitle, imageUrl, className }: Props) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-neutral-200 bg-brand-charcoal text-white',
        className,
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      ) : null}
      <div className="container-x relative py-16 md:py-24">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-serif text-h1">{title}</h1>
        {subtitle ? (
          <p className="mt-4 max-w-prose text-base text-neutral-200 md:text-lg">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
