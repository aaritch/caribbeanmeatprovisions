import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components';

export function NewsletterConfirmationEmail({ confirmUrl }: { confirmUrl: string }) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your subscription to Caribbean Meat Provisions</Preview>
      <Body style={{ fontFamily: 'Inter, Arial, sans-serif', backgroundColor: '#F5F1E8', padding: 24 }}>
        <Container style={{ backgroundColor: '#fff', maxWidth: 640, padding: 32, borderRadius: 8 }}>
          <Heading as="h1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Almost there.
          </Heading>
          <Text>Click the button below to confirm your newsletter subscription.</Text>
          <Button
            href={confirmUrl}
            style={{
              backgroundColor: '#8B0000',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Confirm subscription
          </Button>
          <Hr />
          <Text style={{ fontSize: 12, color: '#666' }}>
            If the button doesn’t work, paste this link into your browser: {confirmUrl}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default NewsletterConfirmationEmail;
