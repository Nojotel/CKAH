"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import DocumentIcon from "@/public/Document.svg";
import FoldersIcon from "@/public/Folders.svg";
import RocketIcon from "@/public/Rocket.svg";
import Scan from "@/components/Scan/Scan";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();

  const handleSearch = () => {
    router.push("/search-results");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerText}>
          <h2 className={styles.title}>Найдите необходимые данные в пару кликов.</h2>
          <p className={styles.subTitle}>
            Задайте параметры поиска. <br />
            Чем больше заполните, тем точнее поиск
          </p>
        </div>
        <div className={styles.containerImage}>
          <Image className={styles.imgDocument} src={DocumentIcon} alt="Иконка документа" width={91} height={111} />
          <Image className={styles.imgFolders} src={FoldersIcon} alt="Иконка папки" width={140} height={68} />
        </div>
      </div>
      <div className={styles.container}>
        <Scan />
        <Image className={styles.imgRocket} src={RocketIcon} alt="Иконка ракеты" width={442} height={470} />
      </div>
    </>
  );
};

export default Search;
