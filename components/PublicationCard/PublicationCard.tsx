import React from "react";
import styles from "./PublicationCard.module.css";
import Image from "next/image";
import ImgNews from "@/public/ArtboardNews.png";
import * as xmljs from "xml-js";
import { PublicationCardProps, XmlContent } from "@/types/types";

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const { title, issueDate, source, url, content, attributes } = publication;
  const formattedDate = new Date(issueDate).toLocaleDateString("ru-RU");
  const [sourceName, sourceUrl] = source.name.split(" ");

  let newsText = "";

  if (content.markup) {
    const contentXml = xmljs.xml2js(content.markup, { compact: true }) as XmlContent;
    if (contentXml.scandoc && contentXml.scandoc.sentence) {
      newsText = Array.isArray(contentXml.scandoc.sentence) ? contentXml.scandoc.sentence.map((sentence) => sentence._text).join(" ") : contentXml.scandoc.sentence._text;
      newsText = typeof newsText === "string" ? newsText.replace(/<[^>]*>/g, "") : newsText; // Проверка типа newsText перед вызовом replace
    }
  } else if (content.text) {
    newsText = content.text;
  }

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <p className={styles.date}>{formattedDate}</p>
        <p className={styles.source}>
          {sourceName} {sourceUrl}
        </p>
      </div>
      <h2 className={styles.title}>{title.text}</h2>
      <Image className={styles.img} src={ImgNews} alt="Картинка новости" width={581} height={158} />
      <p className={styles.content}>{typeof newsText === "string" ? newsText.replace(/\s+/g, " ") : newsText}</p> {/* Проверка типа newsText перед вызовом replace */}
      <div className={styles.container}>
        <button className={styles.url}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Читать в источнике
          </a>
        </button>
        <p className={styles.wordCount}>{attributes.wordCount} слова</p>
      </div>
    </div>
  );
};

export default React.memo(PublicationCard);
