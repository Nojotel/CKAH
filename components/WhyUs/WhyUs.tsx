import React from "react";
import styles from "./WhyUs.module.css";
import Slider from "@/components/Slider/Slider";

const WhyUs: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Почему именно мы</h2>
      <Slider />
    </section>
  );
};

export default WhyUs;
