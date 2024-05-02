"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./Slider.module.css";
import Image from "next/image";
import nextButton from "@/public/nextButton.png";
import prevButton from "@/public/prevButton.png";
import nextButtonOpacity from "@/public/nextButtonOpacity.png";
import prevButtonOpacity from "@/public/prevButtonOpacity.png";
import slides from "@/types/slide";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = React.useRef<Slider>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1440) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: <></>,
    prevArrow: <></>,
    afterChange: (currentSlide: number) => setCurrentSlide(currentSlide),
  };

  const isLastSlide = currentSlide === slides.length - slidesToShow;
  const isFirstSlide = currentSlide === 0;

  return (
    <div className={styles.container}>
      <button className={styles.prevButton} onClick={handlePrevSlide} disabled={isFirstSlide}>
        <Image src={isFirstSlide ? prevButtonOpacity : prevButton} alt="Prev" width={39} height={39} />
      </button>
      {slides.length > 0 && (
        <Slider {...settings} ref={sliderRef}>
          {slides.map((slide) => (
            <div key={slide.id}>
              <div className={styles.slide}>
                <Image src={slide.imageUrl} alt={slide.description} width={65} height={79} />
                <p className={styles.slideText}>{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
      <button className={styles.nextButton} onClick={handleNextSlide} disabled={isLastSlide}>
        <Image src={isLastSlide ? nextButtonOpacity : nextButton} alt="Next" width={39} height={39} />
      </button>
    </div>
  );
};

export default CustomSlider;
