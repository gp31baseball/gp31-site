import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ---------- BASIC META ---------- */}
        <meta name="theme-color" content="#0A1A3F" />
        <meta
          name="description"
          content="GP31 Baseball – Faith. Family. Baseball. Built on Romans 8:31."
        />
        <link rel="icon" href="/gp31-logo.png" />

        {/* ---------- OPEN GRAPH (Facebook, Instagram, etc.) ---------- */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GP31 Baseball" />
        <meta property="og:title" content="GP31 Baseball | Romans 8:31" />
        <meta
          property="og:description"
          content="Faith. Family. Baseball. GP31 Baseball represents the next generation of players built on discipline and belief."
        />
        <meta property="og:url" content="https://www.gp31baseball.com" />
        <meta
          property="og:image"
          content="https://www.gp31baseball.com/gallery/social-preview.jpg"
        />
        <meta
          property="og:image:alt"
          content="GP31 Baseball – Navy and Gold logo with Romans 8:31"
        />

        {/* ---------- TWITTER / X TAGS ---------- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@GP31Baseball" />
        <meta name="twitter:title" content="GP31 Baseball | Romans 8:31" />
        <meta
          name="twitter:description"
          content="Faith. Family. Baseball. GP31 Baseball represents the next generation of players built on discipline and belief."
        />
        <meta
          name="twitter:image"
          content="https://www.gp31baseball.com/gallery/social-preview.jpg"
        />
      </Head>
      <body className="bg-[#0A1A3F] text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
