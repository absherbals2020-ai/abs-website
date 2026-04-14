import Script from "next/script";
import { prisma } from "@/lib/prisma";

export default async function MarketingScripts() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "site" } });
  return (
    <>
      {settings?.gtmId && (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${settings.gtmId}');
        `}</Script>
      )}
      {settings?.gaMeasurement && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurement}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${settings.gaMeasurement}');
          `}</Script>
        </>
      )}
      {settings?.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${settings.metaPixelId}');
          fbq('track', 'PageView');
        `}</Script>
      )}
    </>
  );
}
