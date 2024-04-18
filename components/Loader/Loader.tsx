import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>Загрузка</div>
    </div>
  );
};

export default Loader;
