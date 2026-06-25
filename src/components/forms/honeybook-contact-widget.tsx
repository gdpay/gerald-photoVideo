'use client';

import Script from 'next/script';

export function HoneyBookContactWidget() {
  return (
    <>
      <div className="hb-p-6114bdf5ebea570007a102fd-1" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.honeybook.com/p.png?pid=6114bdf5ebea570007a102fd"
        alt=""
      />
      <Script id="honeybook-contact-widget" strategy="afterInteractive">
        {`
          (function(h,b,s,n,i,p,e,t) {
            h._HB_ = h._HB_ || {};
            h._HB_.pid = i;
            t = b.createElement(s);
            t.type = "text/javascript";
            t.async = true;
            t.src = n;
            e = b.getElementsByTagName(s)[0];
            e.parentNode.insertBefore(t,e);
          })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","6114bdf5ebea570007a102fd");
        `}
      </Script>
    </>
  );
}
