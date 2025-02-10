// MetaTags.js
import { Helmet } from "react-helmet-async";

function MetaTags() {
  return (
    <Helmet>
      <title>خوادم الألعاب - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="استمتع بأفضل خطط استضافة الألعاب لدينا بأداء عالي واستقرار ممتاز."
      />
      
      <meta
        name="keywords"
        content="استضافة, ألعاب, سيرفرات, استضافة ألعاب, gaming, NanoByte, game hosting, gaming server, vps gaming"
      />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content="خوادم الألعاب - NanoByte" />
      <meta
        property="og:description"
        content="استمتع بأفضل خطط استضافة الألعاب لدينا بأداء عالي واستقرار ممتاز."
      />
      <meta property="og:url" content="http://localhost:1000/GameHosting" />
      <meta
        property="og:image"
        content="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NanoByte Game Hosting" />
      <meta property="og:locale" content="ar_AR" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="خوادم الألعاب - NanoByte" />
      <meta
        name="twitter:description"
        content="استمتع بأفضل خطط استضافة الألعاب لدينا بأداء عالي واستقرار ممتاز."
      />
      <meta
        name="twitter:image"
        content="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png"
      />
      <meta name="twitter:creator" content="@NanoByte" />
      
      {/* Canonical */}
      <link rel="canonical" href="http://localhost:1000/GameHosting" />
      
      {/* Apple Meta Tags */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte Game Hosting" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="nano-primary-300"
      />
      <link
        rel="apple-touch-startup-image"
        href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png"
      />
      
      {/* Mask Icon */}
      <link
        rel="mask-icon"
        href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png"
        color="#1F3A5F"
      />
      
      {/* Favicon */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/favicon-32x32.png"
      />
      <meta name="theme-color" content="#1F3A5F" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "خوادم الألعاب - NanoByte",
          description: "استمتع بأفضل خطط استضافة الألعاب لدينا بأداء عالي واستقرار ممتاز.",
          url: "http://localhost:1000/GameHosting",
          publisher: {
            "@type": "Organization",
            name: "NanoByte",
            logo: "https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png",
          },
        })}
      </script>
    </Helmet>
  );
}

export default MetaTags;