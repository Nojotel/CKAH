"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HistogramCarousel.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface HistogramData {
  date: string;
  value: number;
}

interface HistogramResponse {
  data: {
    data: HistogramData[];
    histogramType: string;
  }[];
}

const HistogramCarousel: React.FC = () => {
  const [histogramData, setHistogramData] = useState<HistogramData[]>([]);
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

        const totalDocumentsData = response.data.data.find((item) => item.histogramType === "totalDocuments")?.data;
        const riskFactorsData = response.data.data.find((item) => item.histogramType === "riskFactors")?.data;

        setHistogramData([...(totalDocumentsData || []), ...(riskFactorsData || [])]);
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

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        {histogramData.map((data, index) => (
          <div key={index} className={styles.carouselItem}>
            <p>Дата: {data.date}</p>
            <p>Количество публикаций: {data.value}</p>
          </div>
        ))}
      </div>
      <button className={styles.prevButton}>Предыдущий</button>
      <button className={styles.nextButton}>Следующий</button>
    </div>
  );
};

export default HistogramCarousel;
