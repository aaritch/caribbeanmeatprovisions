import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { QuoteRequestInput } from '@/lib/validation';
import type { Product } from '@/types';

interface Props {
  quote: QuoteRequestInput;
  quoteId: string;
  products: Product[];
}

export function SalesNotificationEmail({ quote, quoteId, products }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`New quote request — ${quote.companyName} (${quote.country})`}</Preview>
      <Body style={{ fontFamily: 'Inter, Arial, sans-serif', backgroundColor: '#F5F1E8', padding: 24 }}>
        <Container style={{ backgroundColor: '#fff', maxWidth: 640, padding: 32, borderRadius: 8 }}>
          <Heading as="h1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>
            New Quote Request
          </Heading>
          <Text>
            <strong>{quote.companyName}</strong> ({quote.companyType}) — {quote.country} ·{' '}
            {quote.destinationPort}
          </Text>
          <Text>
            <strong>Urgency:</strong> {quote.urgency}
            {quote.halalRequired ? ' · Halal required' : ''}
          </Text>
          <Hr />
          <Section>
            <Heading as="h2" style={{ fontSize: 18 }}>Contact</Heading>
            <Text>
              {quote.contactName}
              {quote.jobTitle ? `, ${quote.jobTitle}` : ''}
              <br />
              {quote.email}
              <br />
              {quote.phone}
            </Text>
          </Section>
          <Section>
            <Heading as="h2" style={{ fontSize: 18 }}>Requested products</Heading>
            {products.length ? (
              <ul>
                {products.map((p) => (
                  <li key={`${p.category}-${p.slug}`}>
                    {p.name} ({p.cutType}) — /products/{p.category}/{p.slug}
                  </li>
                ))}
              </ul>
            ) : null}
            {quote.otherProductsText ? <Text>Other: {quote.otherProductsText}</Text> : null}
            {quote.estimatedVolume ? <Text>Volume: {quote.estimatedVolume}</Text> : null}
            {quote.requiredByDate ? <Text>Required by: {quote.requiredByDate}</Text> : null}
            {quote.additionalNotes ? <Text>Notes: {quote.additionalNotes}</Text> : null}
          </Section>
          <Hr />
          <Text style={{ color: '#888', fontSize: 12 }}>Quote ID: {quoteId}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default SalesNotificationEmail;
