import { ImageResponse } from 'next/og';

export const alt = 'Gerald Photo Video — Wedding & Quinceañera Photographer Nebraska & Iowa';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1c1b1a 0%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '60px 80px',
        }}
      >
        {/* Top decorative line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            display: 'flex',
            background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
          }}
        />
        {/* Bottom decorative line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            display: 'flex',
            background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
          }}
        />
        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: '#f5f0e8',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <span>Gerald</span>
          <span style={{ color: '#c9a96e' }}>.</span>
          <span>Photo</span>
          <span> </span>
          <span>Video</span>
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(245, 240, 232, 0.6)',
            letterSpacing: '0.15em',
            fontWeight: 300,
            fontFamily: 'sans-serif',
            display: 'flex',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Timeless Storytelling for Life&apos;s Most Beautiful Moments
        </div>
        {/* Separator */}
        <div
          style={{
            width: 200,
            height: 1,
            display: 'flex',
            background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
            marginTop: 32,
            marginBottom: 32,
          }}
        />
        {/* Service area */}
        <div
          style={{
            fontSize: 18,
            color: 'rgba(245, 240, 232, 0.4)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}
        >
          Serving Nebraska &amp; Iowa
        </div>
        {/* URL watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 40,
            fontSize: 12,
            color: 'rgba(245, 240, 232, 0.2)',
            letterSpacing: '0.1em',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}
        >
          geraldphotovideo.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
