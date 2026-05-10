'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: Props) {
  const [active, setActive] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(false);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!lightbox) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [lightbox, images.length]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative block aspect-square w-full overflow-hidden rounded-lg bg-neutral-100"
        aria-label={`Open image of ${productName}`}
      >
        <Image
          src={images[active] ?? images[0]}
          alt={productName}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </button>

      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, idx) => (
            <li key={`${src}-${idx}`}>
              <button
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Show image ${idx + 1} of ${images.length}`}
                className={cn(
                  'relative block aspect-square w-full overflow-hidden rounded-md border-2',
                  idx === active ? 'border-brand-primary' : 'border-transparent',
                )}
              >
                <Image src={src} alt="" fill sizes="100px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {lightbox ? (
        <div role="dialog" aria-modal="true" aria-label={`${productName} image viewer`} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
                aria-label="Previous image"
                className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setActive((a) => (a + 1) % images.length)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </>
          ) : null}
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={images[active] ?? images[0]}
              alt={productName}
              fill
              sizes="80vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
