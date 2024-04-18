"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./Slider.module.css";
import Image from "next/image";
import Left from "@/public/Left.png";
import Right from "@/public/Right.png";
import slides from "@/types/slide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1200) {
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.container}>
      {slides.length > 0 && (
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className={styles.slide}>
              <Image src={slide.imageUrl} alt={slide.description} width={65} height={79} />
              <p>{slide.description}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

const NextArrow: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ className, style, onClick }) => {
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <Image src={Right} alt="Next" width={39} height={39} />
    </div>
  );
};

const PrevArrow: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ className, style, onClick }) => {
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <Image src={Left} alt="Prev" width={39} height={39} />
    </div>
  );
};

export default CustomSlider;
