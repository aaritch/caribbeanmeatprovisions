import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components';
import type { ContactMessageInput } from '@/lib/validation';

export function ContactNotificationEmail({
  message,
  messageId,
}: {
  message: ContactMessageInput;
  messageId: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>{`New contact message — ${message.subject}`}</Preview>
      <Body style={{ fontFamily: 'Inter, Arial, sans-serif', backgroundColor: '#F5F1E8', padding: 24 }}>
        <Container style={{ backgroundColor: '#fff', maxWidth: 640, padding: 32, borderRadius: 8 }}>
          <Heading as="h1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            New Contact Message
          </Heading>
          <Text>
            <strong>From:</strong> {message.name} &lt;{message.email}&gt;
            <br />
            <strong>Subject:</strong> {message.subject}
          </Text>
          <Hr />
          <Text style={{ whiteSpace: 'pre-wrap' }}>{message.message}</Text>
          <Hr />
          <Text style={{ color: '#888', fontSize: 12 }}>Message ID: {messageId}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
