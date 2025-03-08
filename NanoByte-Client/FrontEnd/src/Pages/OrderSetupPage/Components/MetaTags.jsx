import { Helmet } from "react-helmet-async";

function MetaTags() {
  return (
    <Helmet>
      <title>إعداد الطلب - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Tags */}
      <meta property="og:title" content="إعداد الطلب - NanoByte" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="إعداد الطلب - NanoByte" />

      {/* Apple Meta Tags */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://test.nanobyte.host/assets/Logo_NanoByte-ZZ38TVGA.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte" />

      {/* Favicon */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/favicon-32x32.png"
      />
      <meta name="theme-color" content="#1F3A5F" />
    </Helmet>
  );
}

export default MetaTags;
