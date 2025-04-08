import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

function MetaTags() {
  const { productLink } = useParams();

  const fullUrl = `https://test.nanobyte.host/OrderSetup/GameHosting/${productLink}`;

  return (
    <Helmet>
      <title>إعداد الطلب - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="قم بإعداد طلبك بكل سهولة مع نانوبايت."
      />
      <meta
        name="keywords"
        content="طلب, إعداد الطلب, نانوبايت, استضافة, شراء سيرفر, order setup, NanoByte"
      />
      <meta name="author" content="NanoByte" />

      {/* Open Graph Tags */}
      <meta property="og:title" content="إعداد الطلب - NanoByte" />
      <meta
        property="og:description"
        content="قم بإعداد طلبك بكل سهولة مع نانوبايت."
      />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content="https://test.nanobyte.host/Logo_NanoByte.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NanoByte" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="إعداد الطلب - NanoByte" />
      <meta
        name="twitter:description"
        content="قم بإعداد طلبك بكل سهولة مع نانوبايت."
      />
      <meta name="twitter:image" content="https://test.nanobyte.host/Logo_NanoByte.png" />
      <meta name="twitter:creator" content="@NanoByte" />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* Apple Meta Tags */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte Order Setup" />
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
          name: "إعداد الطلب - NanoByte",
          description: "قم بإعداد طلبك بكل سهولة مع نانوبايت.",
          url: fullUrl,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": fullUrl,
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
