// MetaTagsInvoicePage.js
import { Helmet } from "react-helmet-async";

function MetaTagsInvoicePage() {
  return (
    <Helmet>
      <title>الفاتورة - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="اعرض تفاصيل الفاتورة الخاصة بك مع نانوبايت. جميع المعلومات المتعلقة بالمدفوعات، المبالغ المستحقة، وتواريخ الدفع متاحة بسهولة."
      />
      <meta
        name="keywords"
        content="فاتورة, نانوبايت, مدفوعات, تفاصيل الفاتورة, استضافة, خدمة الزبائن, حسابات الدفع"
      />
      <meta name="author" content="NanoByte" />

      {/* Open Graph Tags */}
      <meta property="og:title" content="الفاتورة - NanoByte" />
      <meta
        property="og:description"
        content="اعرض تفاصيل الفاتورة الخاصة بك مع نانوبايت. جميع المعلومات المتعلقة بالمدفوعات، المبالغ المستحقة، وتواريخ الدفع متاحة بسهولة."
      />
      <meta property="og:url" content="https://test.nanobyte.host/InvoicePage" />
      <meta
        property="og:image"
        content="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NanoByte Invoice Page" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="الفاتورة - NanoByte" />
      <meta
        name="twitter:description"
        content="اعرض تفاصيل الفاتورة الخاصة بك مع نانوبايت. جميع المعلومات المتعلقة بالمدفوعات، المبالغ المستحقة، وتواريخ الدفع متاحة بسهولة."
      />
      <meta
        name="twitter:image"
        content="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta name="twitter:creator" content="@NanoByte" />

      {/* Canonical */}
      <link rel="canonical" href="https://test.nanobyte.host/InvoicePage" />

      {/* Apple Meta Tags */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://test.nanobyte.host/Logo_NanoByte.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte Invoice Page" />
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
          name: "الفاتورة - NanoByte",
          description:
            "اعرض تفاصيل الفاتورة الخاصة بك مع نانوبايت. جميع المعلومات المتعلقة بالمدفوعات، المبالغ المستحقة، وتواريخ الدفع متاحة بسهولة.",
          url: "https://test.nanobyte.host/InvoicePage",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://test.nanobyte.host/InvoicePage",
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

export default MetaTagsInvoicePage;