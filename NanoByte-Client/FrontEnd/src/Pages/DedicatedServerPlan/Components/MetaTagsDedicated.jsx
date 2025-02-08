// MetaTagsDedicated.js
import { Helmet } from "react-helmet-async";

function MetaTagsDedicated() {
  return (
    <Helmet>
      <title>الخوادم المركزية - NanoByte</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="استعد لتجربة استثنائية ومتميزة مع نانوبايت هوست.\nنقدم لك خدماتنا عالية الجودة لتلبية احتياجاتك بكفاءة واحترافية." />

      <meta
        name="keywords"
        content="خوادم, استضافة, خطط استضافة, NanoByte, خوادم مركزية, خادم, سيرفر, hosting, dedicated hosting, server"
      />

      {/* Open Graph Tags */}
      <meta property="og:title" content="الخوادم المركزية - NanoByte" />
      <meta property="og:description" content="استعد لتجربة استثنائية ومتميزة مع نانوبايت هوست.\nنقدم لك خدماتنا عالية الجودة لتلبية احتياجاتك بكفاءة واحترافية." />
      <meta property="og:url" content="http://localhost:1000/DedicatedServer" />
      <meta property="og:image" content="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NanoByte Dedicated Server" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="الخوادم المركزية - NanoByte" />
      <meta name="twitter:description" content="استعد لتجربة استثنائية ومتميزة مع نانوبايت هوست.\nنقدم لك خدماتنا عالية الجودة لتلبية احتياجاتك بكفاءة واحترافية." />
      <meta name="twitter:image" content="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png" />
      <meta name="twitter:creator" content="@NanoByte" />

      {/* Canonical */}
      <link rel="canonical" href="http://localhost:1000/DedicatedServer" />

      {/* Apple Meta Tags */}
      <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="NanoByte Dedicated Server" />
      <meta name="apple-mobile-web-app-status-bar-style" content="nano-primary-300" />
      <link rel="apple-touch-startup-image" href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png" />

      {/* Mask Icon */}
      <link rel="mask-icon" href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/android-chrome-512x512.png" color="#1F3A5F" />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.discordapp.com/attachments/993570904544124972/1331705166105149521/favicon-32x32.png" />
      <meta name="theme-color" content="#1F3A5F" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "الخوادم المركزية - NanoByte",
          description: "استعد لتجربة استثنائية ومتميزة مع نانوبايت هوست.\nنقدم لك خدماتنا عالية الجودة لتلبية احتياجاتك بكفاءة واحترافية.",
          url: "http://localhost:1000/DedicatedServer",
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

export default MetaTagsDedicated;
