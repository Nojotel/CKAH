import React from "react";
import styles from "./Rates.module.css";
import RatesCell from "@/components/RatesCell/RatesCell";

const Rates = () => (
  <section className={styles.container}>
    <h3 className={styles.title}>наши тарифы</h3>
    <RatesCell />
  </section>
);

export default Rates;
