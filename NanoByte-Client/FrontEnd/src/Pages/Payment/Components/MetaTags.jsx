// PaymentMetaTags.js
import { Helmet } from "react-helmet-async";

function PaymentMetaTags() {
  return (
    <Helmet>
      <title>الدفع - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="قم بإتمام عملية الدفع بأمان وسهولة عبر NanoByte."
      />
      <meta
        name="keywords"
        content="الدفع, شراء, فواتير, استضافة, نانوبايت, دفع آمن, NanoByte, payment, checkout, pay"
      />
      <meta name="author" content="NanoByte" />

      {/* Open Graph Tags */}
      <meta property="og:title" content="الدفع - NanoByte" />
      <meta
        property="og:description"
        content="قم بإتمام عملية الدفع بأمان وسهولة عبر NanoByte."
      />
      <meta property="og:url" content="https://test.nanobyte.host/Payment" />
      <meta property="og:image" content="https://test.nanobyte.host/Logo_NanoByte.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NanoByte" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="الدفع - NanoByte" />
      <meta
        name="twitter:description"
        content="قم بإتمام عملية الدفع بأمان وسهولة عبر NanoByte."
      />
      <meta name="twitter:image" content="https://test.nanobyte.host/Logo_NanoByte.png" />
      <meta name="twitter:creator" content="@NanoByte" />

      {/* Canonical */}
      <link rel="canonical" href="https://test.nanobyte.host/Payment" />

      {/* Apple Meta Tags */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte Payment" />
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
          name: "الدفع - NanoByte",
          description: "قم بإتمام عملية الدفع بأمان وسهولة عبر NanoByte.",
          url: "https://test.nanobyte.host/Payment",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://test.nanobyte.host/Payment",
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

export default PaymentMetaTags;
