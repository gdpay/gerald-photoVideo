'use client';

import dynamic from 'next/dynamic';

const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#1c1b1a', color: '#f5f0e8', fontFamily: 'sans-serif' }}>
      <p>Loading Studio...</p>
    </div>
  ),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let config: any = null;

try {
  config = require('../../../../sanity.config').default;
} catch {
  // Config not available
}

export default function StudioClient() {
  if (!config) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#1c1b1a', color: '#f5f0e8', fontFamily: 'sans-serif' }}>
        <p>Studio configuration is not available.</p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}