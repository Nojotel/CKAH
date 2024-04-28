"use client";
import React, { useEffect } from "react";
import HistogramCarousel from "@/components/Search/HistogramCarousel/HistogramCarousel";
import PublicationList from "@/components/Search/PublicationList/PublicationList";
import styles from "./page.module.css";
import Image from "next/image";
import SearchResult from "@/public/SearchResults.svg";
import axios from "axios";

interface SearchParams {
  [key: string]: any;
}

const SearchResults = () => {
  useEffect(() => {
    const searchParams: SearchParams = JSON.parse(window.localStorage.getItem("searchParams") || "{}");
    if (Object.keys(searchParams).length > 0) {
      fetchSearchResults(searchParams);
    }
  }, []);

  const fetchSearchResults = async (searchParams: SearchParams) => {
    try {
      const response = await axios.post("/api/search", searchParams);
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка получения результатов поиска:", error);
    }
  };

  return (
    <>
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
        <h3 className={styles.titleSmall}>Общая сводка</h3>
        <HistogramCarousel />
        <h3 className={styles.titleSmall}>Список документов</h3>
        <PublicationList />
      </div>
    </>
  );
};

export default SearchResults;
