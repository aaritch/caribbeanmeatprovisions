import { LinkButton } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">404</p>
      <h1 className="mt-2 font-serif text-h1 text-brand-charcoal">Page not found</h1>
      <p className="mx-auto mt-4 max-w-prose text-neutral-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/" variant="primary">Back home</LinkButton>
        <LinkButton href="/products" variant="secondary">Browse products</LinkButton>
        <LinkButton href="/contact" variant="ghost">Contact us</LinkButton>
      </div>
    </section>
  );
}
