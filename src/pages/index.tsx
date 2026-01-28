import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodePlayground from '@site/src/components/CodePlayground/CodePlayground';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The language of spec-driven development">
      <main className={styles.heroWrapper}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            ***plain, the language of spec-driven development
          </h1>
          <p className={styles.heroSubtitle}>
            ***plain is a specification language that combines the efficiency of natural language with the control and precision of code.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/docs/intro" className={styles.primaryButton}>
              GET STARTED
            </a>
            {/* <a href="#demo" className={styles.secondaryButton}>
              WATCH DEMO
            </a> */}
          </div>
        </div>
      </main>
      
      {/* <section className={styles.playgroundSection}>
        <CodePlayground />
      </section> */}
    </Layout>
  );
}
