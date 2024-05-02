"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Img from "@/public/Sky.svg";
import ImgMob from "@/public/SkyMob.svg";
import styles from "./Sky.module.css";

const Sky = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderImage = () => {
    if (windowWidth < 750) {
      return <Image className={styles.img} src={ImgMob} alt="Человек в облаках" width={1307} height={536} />;
    } else {
      return <Image className={styles.img} src={Img} alt="Человек в облаках" width={1307} height={536} />;
    }
  };

  return <section className={styles.container}>{renderImage()}</section>;
};

export default Sky;
