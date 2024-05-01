"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { HistogramData } from "@/types/types";
import { fetchHistograms } from "@/api/histogramApi";

const HistogramCarousel: React.FC = () => {
  const [histogramData, setHistogramData] = useState<HistogramData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(8);
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
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1550) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(8);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (accessToken && searchParams) {
          const data = await fetchHistograms(accessToken, searchParams);
          setHistogramData(data);
        }
      } catch (error) {
        console.error("Ошибка получения сводки:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
    slidesToShow: slidesToShow,
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
