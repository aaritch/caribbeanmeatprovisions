import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { readContentFile, renderMarkdown } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Caribbean Meat Provisions LLC.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  const html = renderMarkdown(readContentFile('privacy'));
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <article className="container-x py-12">
        <div
          className="prose prose-neutral max-w-prose [&_h1]:font-serif [&_h1]:text-h2 [&_h2]:font-serif [&_h2]:mt-8 [&_h2]:text-2xl [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-gold [&_blockquote]:bg-brand-cream [&_blockquote]:px-4 [&_blockquote]:py-2 [&_blockquote]:text-sm [&_blockquote]:text-neutral-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  );
}
