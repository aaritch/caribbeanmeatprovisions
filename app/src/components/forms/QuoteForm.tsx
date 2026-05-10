'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { FormField } from '@/components/forms/FormField';
import { FormError } from '@/components/forms/FormError';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';
import type { Country, Product } from '@/types';

interface Props {
  countries: Country[];
  products: Product[];
}

const COMPANY_TYPES = [
  { value: 'hotels-resorts', label: 'Hotel / Resort' },
  { value: 'restaurants', label: 'Restaurant / Bar' },
  { value: 'distributors', label: 'Distributor' },
  { value: 'supermarkets', label: 'Supermarket / Retail' },
  { value: 'cruise-lines', label: 'Cruise Line' },
  { value: 'institutional', label: 'Institutional' },
  { value: 'other', label: 'Other' },
];

const URGENCIES = [
  { value: 'standard', label: 'Standard (7+ days)' },
  { value: 'expedited', label: 'Expedited (3-5 days)' },
  { value: 'jit', label: 'Just-in-time (urgent)' },
];

interface State {
  companyName: string;
  companyType: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  country: string;
  destinationPort: string;
  productSlugs: string[];
  otherProductsText: string;
  estimatedVolume: string;
  requiredByDate: string;
  urgency: 'standard' | 'expedited' | 'jit';
  halalRequired: boolean;
  additionalNotes: string;
  marketingConsent: boolean;
  honeypot: string;
}

const initial: State = {
  companyName: '',
  companyType: '',
  contactName: '',
  jobTitle: '',
  email: '',
  phone: '',
  country: '',
  destinationPort: '',
  productSlugs: [],
  otherProductsText: '',
  estimatedVolume: '',
  requiredByDate: '',
  urgency: 'standard',
  halalRequired: false,
  additionalNotes: '',
  marketingConsent: false,
  honeypot: '',
};

export function QuoteForm({ countries, products }: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const presetProduct = search.get('product');

  const [state, setState] = React.useState<State>(() => ({
    ...initial,
    productSlugs: presetProduct ? [presetProduct] : [],
  }));
  const [token, setToken] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const productsByCategory = React.useMemo(() => {
    const map: Record<string, Product[]> = {};
    for (const p of products) {
      (map[p.category] ??= []).push(p);
    }
    return map;
  }, [products]);

  const productKey = (p: Product) => `${p.category}-${p.slug}`;

  const toggleProduct = (key: string, checked: boolean) => {
    setState((s) => ({
      ...s,
      productSlugs: checked
        ? Array.from(new Set([...s.productSlugs, key]))
        : s.productSlugs.filter((k) => k !== key),
    }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...state, turnstileToken: token }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        if (data.error === 'rate_limited') {
          setSubmitError(
            `Rate limit reached. Please try again in ${data.retryAfter ?? 60} seconds.`,
          );
        } else if (data.error === 'turnstile_failed') {
          setSubmitError('Spam check failed. Reload the page and try again.');
        } else if (data.error === 'validation_failed') {
          setSubmitError('Please correct the highlighted fields.');
        } else {
          setSubmitError('Something went wrong. Try again or email us directly.');
        }
        return;
      }
      router.push('/quote/thank-you');
    } catch {
      setSubmitError('Network error. Try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Company name" htmlFor="companyName" required error={errors.companyName}>
          <Input
            id="companyName"
            name="companyName"
            value={state.companyName}
            onChange={(e) => set('companyName', e.currentTarget.value)}
            invalid={!!errors.companyName}
            required
          />
        </FormField>
        <FormField label="Company type" htmlFor="companyType" required error={errors.companyType}>
          <Select
            id="companyType"
            name="companyType"
            value={state.companyType}
            onChange={(e) => set('companyType', e.currentTarget.value)}
            invalid={!!errors.companyType}
            required
          >
            <option value="">Select…</option>
            {COMPANY_TYPES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Contact name" htmlFor="contactName" required error={errors.contactName}>
          <Input
            id="contactName"
            name="contactName"
            value={state.contactName}
            onChange={(e) => set('contactName', e.currentTarget.value)}
            invalid={!!errors.contactName}
            required
          />
        </FormField>
        <FormField label="Job title" htmlFor="jobTitle" error={errors.jobTitle}>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={state.jobTitle}
            onChange={(e) => set('jobTitle', e.currentTarget.value)}
          />
        </FormField>
        <FormField label="Email" htmlFor="email" required error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={state.email}
            onChange={(e) => set('email', e.currentTarget.value)}
            invalid={!!errors.email}
            required
          />
        </FormField>
        <FormField
          label="Phone (with country code)"
          htmlFor="phone"
          required
          error={errors.phone}
          helper="Include country code, e.g. +1 305 555 0140"
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={state.phone}
            onChange={(e) => set('phone', e.currentTarget.value)}
            invalid={!!errors.phone}
            required
          />
        </FormField>
        <FormField label="Country" htmlFor="country" required error={errors.country}>
          <Select
            id="country"
            name="country"
            value={state.country}
            onChange={(e) => set('country', e.currentTarget.value)}
            invalid={!!errors.country}
            required
          >
            <option value="">Select…</option>
            {countries.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Destination port / city" htmlFor="destinationPort" required error={errors.destinationPort}>
          <Input
            id="destinationPort"
            name="destinationPort"
            value={state.destinationPort}
            onChange={(e) => set('destinationPort', e.currentTarget.value)}
            invalid={!!errors.destinationPort}
            required
          />
        </FormField>
      </div>

      <fieldset className="space-y-3">
        <legend className="font-serif text-lg text-brand-charcoal">Products of interest</legend>
        {errors.productSlugs ? <p className="text-xs text-red-600">{errors.productSlugs}</p> : null}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(productsByCategory).map(([cat, items]) => (
            <div key={cat} className="rounded-md border border-neutral-200 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-700">
                {cat}
              </p>
              <ul className="space-y-1.5">
                {items.map((p) => {
                  const key = productKey(p);
                  return (
                    <li key={key} className="flex items-start gap-2">
                      <Checkbox
                        id={`p-${key}`}
                        checked={state.productSlugs.includes(key)}
                        onChange={(e) => toggleProduct(key, e.currentTarget.checked)}
                      />
                      <label htmlFor={`p-${key}`} className="cursor-pointer text-sm">
                        {p.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <FormField
          label="Other products / custom request"
          htmlFor="otherProductsText"
          error={errors.otherProductsText}
          helper="Describe anything not in the list above — we may be able to source it."
        >
          <Textarea
            id="otherProductsText"
            name="otherProductsText"
            rows={3}
            value={state.otherProductsText}
            onChange={(e) => set('otherProductsText', e.currentTarget.value)}
          />
        </FormField>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-3">
        <FormField label="Estimated volume" htmlFor="estimatedVolume" helper="e.g. 2 containers/month, 500kg/week">
          <Input
            id="estimatedVolume"
            name="estimatedVolume"
            value={state.estimatedVolume}
            onChange={(e) => set('estimatedVolume', e.currentTarget.value)}
          />
        </FormField>
        <FormField label="Required by date" htmlFor="requiredByDate" error={errors.requiredByDate}>
          <Input
            id="requiredByDate"
            name="requiredByDate"
            type="date"
            value={state.requiredByDate}
            onChange={(e) => set('requiredByDate', e.currentTarget.value)}
            invalid={!!errors.requiredByDate}
          />
        </FormField>
        <FormField label="Urgency" htmlFor="urgency" required error={errors.urgency}>
          <Select
            id="urgency"
            name="urgency"
            value={state.urgency}
            onChange={(e) => set('urgency', e.currentTarget.value as State['urgency'])}
            required
          >
            {URGENCIES.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-2 text-sm">
          <Checkbox
            checked={state.halalRequired}
            onChange={(e) => set('halalRequired', e.currentTarget.checked)}
          />
          <span>Halal-certified products required</span>
        </label>
      </div>

      <FormField label="Additional notes" htmlFor="additionalNotes" error={errors.additionalNotes}>
        <Textarea
          id="additionalNotes"
          name="additionalNotes"
          rows={4}
          value={state.additionalNotes}
          onChange={(e) => set('additionalNotes', e.currentTarget.value)}
        />
      </FormField>

      <label className="flex items-start gap-2 text-sm">
        <Checkbox
          checked={state.marketingConsent}
          onChange={(e) => set('marketingConsent', e.currentTarget.checked)}
        />
        <span>I’d like to receive periodic specials and industry updates.</span>
      </label>

      {/* Honeypot — hidden from users, off the tab order */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="honeypot"
          type="text"
          autoComplete="off"
          value={state.honeypot}
          onChange={(e) => set('honeypot', e.currentTarget.value)}
          tabIndex={-1}
        />
      </div>

      <TurnstileWidget onToken={setToken} />

      {submitError ? <FormError message={submitError} /> : null}

      <Button type="submit" disabled={submitting} className="w-full md:w-auto">
        {submitting ? 'Submitting…' : 'Send quote request'}
      </Button>
    </form>
  );
}
