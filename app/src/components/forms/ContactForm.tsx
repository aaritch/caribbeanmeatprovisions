'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { FormField } from '@/components/forms/FormField';
import { FormError } from '@/components/forms/FormError';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';

export function ContactForm() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [honeypot, setHoneypot] = React.useState('');
  const [token, setToken] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, honeypot, turnstileToken: token }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        if (data.error === 'rate_limited') {
          setSubmitError(`Rate limit reached. Try again in ${data.retryAfter ?? 60} seconds.`);
        } else if (data.error === 'turnstile_failed') {
          setSubmitError('Spam check failed. Reload and try again.');
        } else if (data.error === 'validation_failed') {
          setSubmitError('Please fix the highlighted fields.');
        } else {
          setSubmitError('Something went wrong. Try again or email us.');
        }
        return;
      }
      router.push('/contact/thank-you');
    } catch {
      setSubmitError('Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <FormField label="Your name" htmlFor="c-name" required error={errors.name}>
        <Input
          id="c-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          invalid={!!errors.name}
          required
        />
      </FormField>
      <FormField label="Email" htmlFor="c-email" required error={errors.email}>
        <Input
          id="c-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          invalid={!!errors.email}
          required
        />
      </FormField>
      <FormField label="Subject" htmlFor="c-subject" required error={errors.subject}>
        <Input
          id="c-subject"
          value={subject}
          onChange={(e) => setSubject(e.currentTarget.value)}
          invalid={!!errors.subject}
          required
        />
      </FormField>
      <FormField label="Message" htmlFor="c-message" required error={errors.message}>
        <Textarea
          id="c-message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          invalid={!!errors.message}
          required
        />
      </FormField>

      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="c-website">Company website</label>
        <input
          id="c-website"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.currentTarget.value)}
        />
      </div>

      <TurnstileWidget onToken={setToken} />

      {submitError ? <FormError message={submitError} /> : null}

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
