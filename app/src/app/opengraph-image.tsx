import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Caribbean Meat Provisions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2a0a0a 100%)',
          color: '#fff',
          padding: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 60, height: 6, background: '#8B0000', marginBottom: 24 }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: '#C9A961',
              textTransform: 'uppercase',
            }}
          >
            Caribbean Meat Provisions
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Importers & Distributors
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            of Beef, Pork, Poultry,
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>Lamb & Mutton</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 22, color: '#cccccc', fontFamily: 'sans-serif' }}>
            Caribbean coverage · Short lead-times · Certified cold-chain
          </div>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 2,
              color: '#C9A961',
              fontFamily: 'sans-serif',
            }}
          >
            HACCP · USDA · ISO 22000 · BRC · FSSC 22000 · HALAL · FDA
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
