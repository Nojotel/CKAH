"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HistogramCarousel.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import nextButton from "@/public/nextButton.png";
import prevButton from "@/public/prevButton.png";
import MDSpinner from "react-md-spinner";
import Slider from "react-slick";

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
          date: formatDate(doc.date),
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const settings = {
    dots: false,
    infinite: histogramData.length > 1,
    speed: 500,
    slidesToShow: Math.min(histogramData.length, 8),
    slidesToScroll: 1,
    nextArrow: (
      <button className={styles.nextButton} onClick={handleNextClick}>
        <Image className={styles.buttonCarousel} src={nextButton} alt="Следующий" width={39} height={39} />
      </button>
    ),
    prevArrow: (
      <button className={styles.prevButton} onClick={handlePrevClick}>
        <Image className={styles.buttonCarousel} src={prevButton} alt="Предыдущий" width={39} height={39} />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1235,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subTitle}>Найдено {histogramData.length} вариантов</div>
      </div>
      <div className={styles.carousel}>
        <div className={styles.carouselHeader}>
          <p className={styles.headerText}>Период</p>
          <p className={styles.headerText}>Всего</p>
          <p className={styles.headerText}>Риски</p>
        </div>
        <Slider {...settings}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <MDSpinner />
            </div>
          ) : (
            histogramData.map((data, index) => (
              <div key={index} className={styles.carouselItem}>
                <div className={styles.carouselItemData}>
                  <p className={styles.dataText}>{data.date}</p>
                  <p className={styles.dataText}>{data.totalDocuments}</p>
                  <p className={styles.dataText}>{data.riskFactors}</p>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
    </>
  );
};

export default HistogramCarousel;
