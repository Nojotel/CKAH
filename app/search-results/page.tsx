"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HistogramCarousel from "@/components/Search/HistogramCarousel/HistogramCarousel";
import PublicationList from "@/components/Search/PublicationList/PublicationList";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import Image from "next/image";
import SearchResult from "@/public/SearchResults.svg";
import { useRouter } from "next/navigation";

const SearchResults = () => {
  const searchParams = useSelector((state: RootState) => state.search.params);
  const hasResults = searchParams.inputValue && searchParams.startDate && searchParams.endDate && searchParams.documentCount !== "0";

  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
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
        {hasResults ? (
          <>
            <h3 className={styles.titleSmall}>Общая сводка</h3>
            <HistogramCarousel />
            <h3 className={styles.titleSmall}>Список документов</h3>
            <PublicationList />
          </>
        ) : (
          <>
            <div className={styles.noResultsTitle}>Поиск не дал результатов 😔</div>
            <div className={styles.noResultsSubTitle}>Вернуться к поиску</div>
            <Button buttonText="К поиску" onClick={handleSearchClick} className={styles.buttonBack} />
          </>
        )}
      </div>
    </>
  );
};

export default SearchResults;
