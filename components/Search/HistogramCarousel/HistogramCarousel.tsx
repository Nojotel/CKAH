"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./HistogramCarousel.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import nextButton from "@/public/nextButton.png";
import prevButton from "@/public/prevButton.png";
import nextButtonOpacity from "@/public/nextButtonOpacity.png";
import prevButtonOpacity from "@/public/prevButtonOpacity.png";
import MDSpinner from "react-md-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const searchParams = useSelector((state: RootState) => state.search.params);
  const sliderRef = useRef<Slider>(null);

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  const isLastSlide = currentSlide >= histogramData.length - settings.slidesToShow;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subTitle}>Найдено {histogramData.length} вариантов</div>
      </div>
      <div className={styles.carousel}>
        <button className={styles.prevButton} onClick={handlePrevSlide} disabled={currentSlide === 0}>
          <Image className={styles.buttonCarousel} src={currentSlide === 0 ? prevButtonOpacity : prevButton} alt="Предыдущий" width={39} height={39} />
        </button>
        <div className={styles.carouselInner}>
          <div className={styles.carouselHeader}>
            <p className={styles.headerText}>Период</p>
            <p className={styles.headerText}>Всего</p>
            <p className={styles.headerText}>Риски</p>
          </div>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <MDSpinner />
            </div>
          ) : (
            <Slider {...settings} ref={sliderRef}>
              {histogramData.map((data, index) => (
                <div className={styles.carouselItem} key={index}>
                  <div className={styles.carouselItemData}>
                    <p className={styles.dataText}>{data.date}</p>
                    <p className={styles.dataText}>{data.totalDocuments}</p>
                    <p className={styles.dataText}>{data.riskFactors}</p>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
        <button className={styles.nextButton} onClick={handleNextSlide} disabled={isLastSlide}>
          <Image className={styles.buttonCarousel} src={isLastSlide ? nextButtonOpacity : nextButton} alt="Следующий" width={39} height={39} />
        </button>
      </div>
    </>
  );
};

export default HistogramCarousel;
