import React from "react";
import Image from "next/image";
import Img from "@/public/Sky.svg";
import styles from "./Sky.module.css";

const Sky = () => {
  return (
    <section className={styles.container}>
      <Image className={styles.img} src={Img} alt="Человек в облаках" width={1307} height={536}></Image>
    </section>
  );
};

export default Sky;
