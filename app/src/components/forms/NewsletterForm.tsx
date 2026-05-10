'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';

export function NewsletterForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = React.useState('');
  const [honeypot, setHoneypot] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = React.useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot, turnstileToken: '' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus('error');
        setMessage(
          data.error === 'rate_limited'
            ? 'Try again later.'
            : data.error === 'validation_failed'
              ? 'Enter a valid email.'
              : 'Something went wrong.',
        );
        return;
      }
      setStatus('sent');
      setMessage('Check your inbox to confirm.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error.');
    }
  }

  const inputClass =
    variant === 'dark'
      ? 'h-11 flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-base text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
      : 'h-11 flex-1 rounded-md border border-neutral-300 bg-white px-3 text-base text-brand-charcoal placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary';

  const helperClass = variant === 'dark' ? 'text-xs text-neutral-400' : 'text-xs text-neutral-500';

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2" aria-label="Newsletter signup">
      <div className="flex gap-2">
        <label htmlFor="nl-email" className="sr-only">Email</label>
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="you@company.com"
          className={inputClass}
        />
        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.currentTarget.value)}
          className="hidden"
        />
        <Button type="submit" disabled={status === 'sending'} variant="primary">
          {status === 'sending' ? 'Sending…' : 'Subscribe'}
        </Button>
      </div>
      <p className={helperClass} role="status" aria-live="polite">
        {status === 'sent' || status === 'error' ? message : 'Unsubscribe any time. We don’t share emails.'}
      </p>
    </form>
  );
}
