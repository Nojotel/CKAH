"use client";
import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import Image from "next/image";
import Left from "@/public/Left.png";
import Right from "@/public/Right.png";
import slides from "@/types/slide";

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<any[]>([]);

  useEffect(() => {
    const slidesToShow = 3;
    const totalSlides = slides.length;
    const start = currentIndex;
    const end = start + slidesToShow;
    const visibleSlides = [...slides.slice(start, end)];

    if (visibleSlides.length < slidesToShow) {
      const remainingSlides = slidesToShow - visibleSlides.length;
      visibleSlides.push(...slides.slice(0, remainingSlides));
    }

    setVisibleSlides(visibleSlides);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrowLeft} onClick={handlePrev}>
        <Image className={styles.logo} src={Left} alt="Логотип" width={39} height={39} />
      </div>
      <div className={styles.slider}>
        {visibleSlides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <Image src={slide.imageUrl} alt={slide.description} width={50} height={50} />
            <p>{slide.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.arrowRight} onClick={handleNext}>
        <Image className={styles.logo} src={Right} alt="Логотип" width={39} height={39} />
      </div>
    </div>
  );
};

export default Slider;
