import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Document from "@/public/Document.svg";
import Folders from "@/public/Folders.svg";
import Rocket from "@/public/Rocket.svg";
import Scan from "@/components/Scan/Scan";

const Search = () => {
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
          <Image className={styles.imgDocument} src={Document} alt="Картинка документа" width={91} height={111} />
          <Image className={styles.imgFolders} src={Folders} alt="Картинка папки" width={140} height={68} />
        </div>
      </div>
      <div className={styles.container}>
        <Scan />
        <Image className={styles.imgRocket} src={Rocket} alt="Картинка ракеты" width={442} height={470} />
      </div>
    </>
  );
};

export default Search;
