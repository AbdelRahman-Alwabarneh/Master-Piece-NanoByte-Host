// MetaTagsGameHosting.js
import { Helmet } from "react-helmet-async";

function MetaTags() {
  return (
    <Helmet>
      <title>خوادم الألعاب - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="استمتع بأفضل تجربة استضافة لألعابك مع خوادم نانوبايت! أداء فائق، استقرار عالي، ودعم متكامل لألعابك المفضلة."
      />
      <meta
        name="keywords"
        content="استضافة, ألعاب, سيرفرات, استضافة ألعاب, gaming, NanoByte, game hosting, gaming server, vps gaming"
      />
      <meta name="author" content="NanoByte" />

      {/* Open Graph Tags */}
      <meta property="og:title" content="خوادم الألعاب - NanoByte" />
      <meta
        property="og:description"
        content="استمتع بأفضل تجربة استضافة لألعابك مع خوادم نانوبايت! أداء فائق، استقرار عالي، ودعم متكامل لألعابك المفضلة."
      />
      <meta property="og:url" content="https://test.nanobyte.host/GameHosting" />
      <meta
        property="og:image"
        content="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NanoByte Game Hosting" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="خوادم الألعاب - NanoByte" />
      <meta
        name="twitter:description"
        content="استمتع بأفضل تجربة استضافة لألعابك مع خوادم نانوبايت! أداء فائق، استقرار عالي، ودعم متكامل لألعابك المفضلة."
      />
      <meta
        name="twitter:image"
        content="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta name="twitter:creator" content="@NanoByte" />

      {/* Canonical */}
      <link rel="canonical" href="https://test.nanobyte.host/GameHosting" />

      {/* Apple Meta Tags */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte Game Hosting" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link
        rel="apple-touch-startup-image"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
      />

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
          name: "خوادم الألعاب - NanoByte",
          description:
            "استمتع بأفضل تجربة استضافة لألعابك مع خوادم نانوبايت! أداء فائق، استقرار عالي، ودعم متكامل لألعابك المفضلة.",
          url: "https://test.nanobyte.host/GameHosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://test.nanobyte.host/GameHosting",
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

export default MetaTags;
