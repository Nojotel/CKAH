import React from "react";
import styles from "./SectionMain.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import ImgMain from "@/public/SectionMain.jpg";

const SectionMain: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.containerText}>
        <h1 className={styles.title}>
          сервис по поиску <br />
          публикаций <br />
          о компании <br />
          по его ИНН
        </h1>
        <h3 className={styles.subTitle}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</h3>
        <Button buttonText="Запросить данные" className={styles.buttonMain} />
      </div>
      <div className={styles.containerImage}>
        <Image className={styles.img} src={ImgMain} alt="Логотип" width={629} height={593} priority />
      </div>
    </section>
  );
};

export default SectionMain;
