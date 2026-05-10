import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components';

interface Props {
  contactName: string;
  companyName: string;
}

export function QuoteAcknowledgmentEmail({ contactName, companyName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>We received your quote request — Caribbean Meat Provisions</Preview>
      <Body style={{ fontFamily: 'Inter, Arial, sans-serif', backgroundColor: '#F5F1E8', padding: 24 }}>
        <Container style={{ backgroundColor: '#fff', maxWidth: 640, padding: 32, borderRadius: 8 }}>
          <Heading as="h1" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#1A1A1A' }}>
            Thanks, {contactName}.
          </Heading>
          <Text>
            We received your quote request for {companyName}. A member of our sales team will
            respond within one business day with availability, pricing, and lead time.
          </Text>
          <Text>
            If your need is urgent — under 24 hours — call our sales line directly at the number
            in your purchase records, or reply to this email.
          </Text>
          <Hr />
          <Text style={{ color: '#888', fontSize: 12 }}>
            Caribbean Meat Provisions LLC. You received this email because you requested a quote
            on our website.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default QuoteAcknowledgmentEmail;
