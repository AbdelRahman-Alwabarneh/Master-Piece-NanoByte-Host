// MetaTagsDedicated.js
import { Helmet } from "react-helmet-async";

function MetaTagsDedicated() {
  return (
    <Helmet>
      <title>الخوادم المركزية - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="استعد لأداء استثنائي مع نانوبايت هوست! خوادم مخصصة بسرعة عالية واستقرار مضمون لتناسب جميع احتياجاتك."
      />
      <meta
        name="keywords"
        content="خوادم, استضافة, خادم مخصص, NanoByte, استضافة مخصصة, سيرفر, dedicated hosting, server, hosting"
      />
      <meta name="author" content="NanoByte" />

      {/* Open Graph Tags */}
      <meta property="og:title" content="الخوادم المركزية - NanoByte" />
      <meta
        property="og:description"
        content="استعد لأداء استثنائي مع نانوبايت هوست! خوادم مخصصة بسرعة عالية واستقرار مضمون لتناسب جميع احتياجاتك."
      />
      <meta property="og:url" content="https://test.nanobyte.host/DedicatedServer" />
      <meta property="og:image" content="https://test.nanobyte.host/Logo_NanoByte.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NanoByte" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="الخوادم المركزية - NanoByte" />
      <meta
        name="twitter:description"
        content="استعد لأداء استثنائي مع نانوبايت هوست! خوادم مخصصة بسرعة عالية واستقرار مضمون لتناسب جميع احتياجاتك."
      />
      <meta name="twitter:image" content="https://test.nanobyte.host/Logo_NanoByte.png" />
      <meta name="twitter:creator" content="@NanoByte" />

      {/* Canonical */}
      <link rel="canonical" href="https://test.nanobyte.host/DedicatedServer" />

      {/* Apple Meta Tags */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte Dedicated Server" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Favicon and Mask */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <link
        rel="mask-icon"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
        color="#1F3A5F"
      />
      <meta name="theme-color" content="#1F3A5F" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "الخوادم المركزية - NanoByte",
          description:
            "استعد لأداء استثنائي مع نانوبايت هوست! خوادم مخصصة بسرعة عالية واستقرار مضمون لتناسب جميع احتياجاتك.",
          url: "https://test.nanobyte.host/DedicatedServer",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://test.nanobyte.host/DedicatedServer",
          },
          publisher: {
            "@type": "Organization",
            name: "NanoByte",
            logo: {
              "@type": "ImageObject",
              url: "https://test.nanobyte.host/Logo_NanoByte.png",
            },
          },
        })}
      </script>
    </Helmet>
  );
}

export default MetaTagsDedicated;
