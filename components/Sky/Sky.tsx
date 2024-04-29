"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Img from "@/public/Sky.svg";
import ImgMob from "@/public/SkyMob.svg";
import styles from "./Sky.module.css";

const Sky = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <section className={styles.container}>{windowWidth < 1500 ? <Image className={styles.img} src={ImgMob} alt="Человек в облаках" width={1307} height={536}></Image> : <Image className={styles.img} src={Img} alt="Человек в облаках" width={1307} height={536}></Image>}</section>;
};

export default Sky;
