"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HistogramCarousel from "@/components/Search/HistogramCarousel/HistogramCarousel";
import PublicationList from "@/components/Search/PublicationList/PublicationList";
import styles from "./page.module.css";
import Image from "next/image";
import SearchResult from "@/public/SearchResults.svg";

const SearchResults = () => {
  const searchParams = useSelector((state: RootState) => state.search.params);
  const [error, setError] = useState(false);

  return (
    <div className={styles.containerBig}>
      <div className={styles.container}>
        <div className={styles.containerText}>
          <h2 className={styles.title}>Ищем. Скоро будут результаты</h2>
          <p className={styles.subTitle}>
            Поиск может занять некоторое время, <br /> просим сохранять терпение.
          </p>
        </div>
        <div className={styles.containerImage}>
          <Image className={styles.img} src={SearchResult} alt="Результат поиска" width={552} height={369} />
        </div>
      </div>
      <div className={styles.containerResult}>
        <div className={styles.containerSmall}>
          <h3 className={styles.titleSmall}>Общая сводка</h3>
          <HistogramCarousel />
          <h3 className={styles.titleSmall}>Список документов</h3>
          <PublicationList setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
