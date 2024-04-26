import React from "react";
import styles from "./PublicationCard.module.css";

interface Publication {
  id: string;
  title: { text: string };
  issueDate: string;
  source: { name: string };
  url: string;
  content: { text: string };
  attributes: any;
}

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const { title, issueDate, source, url, content, attributes } = publication;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title.text}</h2>
      <p className={styles.date}>{issueDate}</p>
      <p className={styles.source}>{source.name}</p>
      <p className={styles.url}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content.text }} />
      <pre>{JSON.stringify(attributes, null, 2)}</pre>
    </div>
  );
};

export default React.memo(PublicationCard);
