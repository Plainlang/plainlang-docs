import styles from './WhitepaperRow.module.css';

type Props = {
  number: string;
  title: string;
  excerpt: string;
  topics: string[];
  readingTime: string;
  href: string;
};

export default function WhitepaperRow({number, title, excerpt, topics, readingTime, href}: Props) {
  return (
    <a href={href} className={styles.row}>
      <div className={styles.left}>
        <span className={styles.number}>{number}</span>
      </div>
      <div className={styles.center}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.topics}>
          {topics.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.time}>{readingTime}</span>
        <span className={styles.arrow}>→</span>
      </div>
    </a>
  );
}
