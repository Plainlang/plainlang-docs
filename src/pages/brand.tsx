import type {ReactNode} from 'react';
import {useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './brand.module.css';

function ColorSwatch({name, hex, textColor}: {name: string; hex: string; textColor: string}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      className={styles.colorSwatch}
      style={{backgroundColor: hex, color: textColor}}
      onClick={copy}
      aria-label={`Copy ${hex}`}
    >
      <span className={styles.colorName}>{name}</span>
      <span className={styles.colorHex}>{copied ? 'Copied!' : hex}</span>
    </button>
  );
}

function LogoCard({src, alt, bg, filename, icon = false}: {
  src: string;
  alt: string;
  bg: 'light' | 'dark';
  filename: string;
  icon?: boolean;
}) {
  return (
    <div className={styles.logoCard} data-bg={bg}>
      <img
        src={src}
        alt={alt}
        className={icon ? styles.logoImageIcon : styles.logoImage}
      />
      <div className={styles.logoCardFooter}>
        <a
          href={src}
          download={filename}
          className={bg === 'dark' ? styles.downloadBtnDark : styles.downloadBtn}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Download ${alt}`}
        >
          Download SVG
        </a>
      </div>
    </div>
  );
}

export default function Brand(): ReactNode {
  return (
    <Layout title="plain | brand guidelines" description="Resources for presenting the ***plain brand consistently and professionally.">
      <Head>
        <meta property="og:title" content="plain | brand guidelines" />
        <meta property="og:description" content="Resources for presenting the ***plain brand consistently and professionally." />
        <meta property="og:image" content="/img/plain_og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="plain | brand guidelines" />
        <meta name="twitter:description" content="Resources for presenting the ***plain brand consistently and professionally." />
        <meta name="twitter:image" content="/img/plain_og.png" />
      </Head>
      <div className={styles.page}>

        {/* Hero */}
        <section className={styles.hero}>
          <span className={styles.label}>BRAND</span>
          <h1 className={styles.heroTitle}>***plain brand guidelines</h1>
          <p className={styles.heroDesc}>
            Brand identity is a fragile thing and it needs to be treated as such. These
            guidelines are the owner's manual for our brand. They exist to keep
            ***plain consistent and loved, by everyone who touches it.
          </p>
          <a href="/plain_brand_assets.zip" download className={styles.ctaButton}>
            Download brand assets
          </a>
        </section>

        {/* Logo */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>LOGO</div>
            <div className={styles.logoIntro}>
              <h2 className={styles.sectionTitle}>***plain logo</h2>
              <p className={styles.sectionDesc}>
                The logo features three asterisks ***, arranged in a clean, minimal,
                and intentional layout. This iconic symbol represents our core
                values — Logic, Power, and Progress — and is a direct nod to our
                foundation in programming and technology.
              </p>
              <p className={styles.sectionDesc}>
                Sophisticated yet minimal. The *** is not just a design — it's a
                signature of our programming roots, our methodical thinking, and our
                bold vision for the future of the ***plain language.
              </p>
            </div>

            <h3 className={styles.logoSubtitle}>***plain wordmark</h3>
            <div className={styles.logoGrid}>
              <LogoCard
                src="/img/plain_logo.png"
                alt="***plain wordmark"
                bg="light"
                filename="plain_wordmark.png"
              />
              <LogoCard
                src="/img/plain_logo_white.png"
                alt="***plain wordmark — dark"
                bg="dark"
                filename="plain_wordmark_white.png"
              />
            </div>

            <h3 className={styles.logoSubtitle}>***plain icon</h3>
            <div className={styles.logoGrid}>
              <LogoCard
                src="/img/plain_icon.png"
                alt="***plain icon"
                bg="light"
                filename="plain_icon.png"
                icon
              />
              <LogoCard
                src="/img/plain_icon_white.png"
                alt="***plain icon — dark"
                bg="dark"
                filename="plain_icon_white.png"
                icon
              />
            </div>

            <div className={styles.logoUsage}>
              <h3 className={styles.usageTitle}>Text logo</h3>
              <p className={styles.sectionDesc}>
                In all written content, use three asterisks followed by the word
                "plain" in small caps — <code>***plain</code>. This standardized
                marker distinguishes the text logo from surrounding text and
                strengthens our identity across all platforms.
              </p>
            </div>

            <div className={styles.doNotUse}>
              <h3 className={styles.usageTitle}>Do not use</h3>
              <ul className={styles.doNotList}>
                <li>Do not add an outline or alter the wordmark in any way.</li>
                <li>Do not change the logo's orientation or proportions.</li>
                <li>Do not use a gradient or add special effects.</li>
                <li>Do not distort proportions or change letter spacing.</li>
                <li>Do not use color combinations not specified in these guidelines.</li>
                <li>Do not crop, divide, or use the logo in gray or transparent versions.</li>
              </ul>
              <p className={styles.sectionDesc}>
                The logo must always be surrounded by generous white space. The minimum
                clear space equals the height of the *** symbol on all sides.
              </p>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>COLOR</div>
            <div className={styles.colorIntro}>
              <h2 className={styles.sectionTitle}>Color</h2>
              <p className={styles.sectionDesc}>
                Consistent use of color helps the brand establish relationships
                between emotions, abilities, experiences, and people. Our colors
                reflect our position as a canvas — functional yet expressive.
                Click any swatch to copy the hex value.
              </p>
            </div>
            <div className={styles.colorGrid}>
              <ColorSwatch name="Green" hex="#79FC96" textColor="#1A1A1A" />
              <ColorSwatch name="Dark Green" hex="#223936" textColor="#C5DCD9" />
              <ColorSwatch name="Light Green" hex="#C5DCD9" textColor="#223936" />
              <ColorSwatch name="Black" hex="#1A1A1A" textColor="#FFFFFF" />
              <ColorSwatch name="White" hex="#FFFFFF" textColor="#1A1A1A" />
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionLabel}>TYPOGRAPHY</div>
            <h2 className={styles.sectionTitle}>***plain typography</h2>
            <div className={styles.typeGrid}>
              <div className={styles.typeCard}>
                <div className={styles.typeLabel}>PRIMARY</div>
                <div className={styles.typeName}>Neue Montreal</div>
                <p className={styles.typeDesc}>
                  A versatile grotesque font with the spirit of a display face.
                  14 weights (7 uprights, 7 italics), slightly tighter kerning,
                  and Cyrillic support. Our champion typeface.
                </p>
                <div className={styles.typeSample} style={{fontFamily: 'var(--font-base)'}}>
                  Aa Bb Cc 123
                </div>
              </div>
              <div className={styles.typeCard}>
                <div className={styles.typeLabel}>MONOSPACE</div>
                <div className={styles.typeName}>Neue Montreal Mono</div>
                <p className={styles.typeDesc}>
                  The perfect fusion of style and functionality. A monospace
                  version of Neue Montreal with coding ligatures — used for
                  code, labels, and UI elements.
                </p>
                <div className={styles.typeSample} style={{fontFamily: 'var(--font-mono)'}}>
                  ***plain 1234
                </div>
              </div>
              <div className={styles.typeCard}>
                <div className={styles.typeLabel}>FALLBACK</div>
                <div className={styles.typeName}>Roboto Mono / Arial</div>
                <p className={styles.typeDesc}>
                  Roboto Mono is the monospace fallback for digital assets.
                  Arial is the sans-serif fallback when Neue Montreal is
                  unavailable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className={styles.closingSection}>
          <p className={styles.closingText}>
            If you're in doubt how to use the brand, feel free to {' '}
            <a href="mailto:kaja@codeplain.ai" className={styles.closingLink}>
              reach out
            </a>{' '}
            and we'll help.
          </p>
        </section>

      </div>
    </Layout>
  );
}
