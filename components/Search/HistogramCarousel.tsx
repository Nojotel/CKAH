"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HistogramCarousel.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import nextButton from "@/public/nextButton.png";
import prevButton from "@/public/prevButton.png";

interface HistogramData {
  date: string;
  totalDocuments: number;
  riskFactors: number;
}

interface HistogramResponse {
  data: {
    data: { date: string; value: number; histogramType: string }[];
    histogramType: string;
  }[];
}

const HistogramCarousel: React.FC = () => {
  const [histogramData, setHistogramData] = useState<HistogramData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const searchParams = useSelector((state: RootState) => state.search.params);

  useEffect(() => {
    const fetchHistograms = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post<HistogramResponse>(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
          {
            issueDateInterval: {
              startDate: `${searchParams.startDate}T00:00:00+03:00`,
              endDate: `${searchParams.endDate}T23:59:59+03:00`,
            },
            searchContext: {
              targetSearchEntitiesContext: {
                targetSearchEntities: [
                  {
                    type: "company",
                    sparkId: null,
                    entityId: null,
                    inn: searchParams.inputValue,
                    maxFullness: searchParams.options.maxRelevance,
                    inBusinessNews: searchParams.options.mentionInBusinessContext,
                  },
                ],
                onlyMainRole: searchParams.options.mainRoleInPublication,
                tonality: searchParams.totalityValue,
                onlyWithRiskFactors: searchParams.options.publicationsOnlyWithRiskFactors,
              },
              themesFilter: {
                and: [],
                or: [],
                not: [],
              },
            },
            attributeFilters: {
              excludeTechNews: searchParams.options.includeTechnicalNews,
              excludeAnnouncements: searchParams.options.includeAnnouncementsAndCalendars,
              excludeDigests: searchParams.options.includeNewsDigests,
            },
            similarMode: "duplicates",
            limit: parseInt(searchParams.documentCount),
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: ["totalDocuments", "riskFactors"],
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const totalDocs = response.data.data.find((item) => item.histogramType === "totalDocuments")?.data || [];
        const risks = response.data.data.find((item) => item.histogramType === "riskFactors")?.data || [];

        const combinedData = totalDocs.map((doc, index) => ({
          date: doc.date,
          totalDocuments: doc.value,
          riskFactors: risks[index]?.value || 0,
        }));

        setHistogramData(combinedData);
      } catch (error) {
        console.error("Ошибка получения сводки:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken && searchParams) {
      fetchHistograms();
    }
  }, [accessToken, searchParams]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? histogramData.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === histogramData.length - 1 ? 0 : prevIndex + 1));
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Общая сводка</div>
        <div className={styles.subTitle}>Найдено {histogramData.length} вариантов</div>
      </div>
      <div className={styles.carousel}>
        <button className={styles.prevButton} onClick={handlePrevClick}>
          <Image className={styles.buttonCarousel} src={prevButton} alt="Предыдущий" width={39} height={39} />
        </button>
        <div className={styles.carouselInner}>
          {histogramData.map((data, index) => (
            <div key={index} className={`${styles.carouselItem} ${index === currentIndex ? styles.active : ""}`}>
              <p>Период {data.date}</p>
              <p>Всего {data.totalDocuments}</p>
              <p>Риски {data.riskFactors}</p>
            </div>
          ))}
        </div>
        <button className={styles.nextButton} onClick={handleNextClick}>
          <Image className={styles.buttonCarousel} src={nextButton} alt="Следующий" width={39} height={39} />
        </button>
      </div>
    </>
  );
};

export default HistogramCarousel;
