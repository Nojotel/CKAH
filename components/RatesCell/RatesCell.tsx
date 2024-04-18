import React, { memo } from "react";
import styles from "./RatesCell.module.css";
import Image from "next/image";
import Check from "@/public/Check.png";
import Button from "@/components/Button/Button";
import rates from "@/types/RatesText";
import { Rate } from "@/types/types";

const RatesCell: React.FC = memo(() => {
  return (
    <div className={styles.container}>
      {rates.map((rate: Rate) => (
        <div className={styles.containerCell} key={rate.id} style={{ backgroundColor: rate.color }}>
          <div className={styles.containerHeader}>
            <div className={styles.containerHeaderText}>
              <div className={styles.containerHeaderTitle}>{rate.title}</div>
              <div className={styles.containerHeaderSubTitle}>{rate.subTitle}</div>
            </div>
            <Image className={styles.img} src={rate.imageUrl} alt={rate.subTitle} width={92} height={83} />
          </div>
          <div className={styles.containerMain}>
            <span className={styles.price}>{`${rate.currentPrice} ₽`}</span>
            <span className={styles.priceOld}>{`${rate.oldPrice} ₽`}</span>
            <div className={styles.description}>{rate.priceDescription}</div>
            <div className={styles.subTitle}>В тариф входит:</div>
            {rate.features.map((feature, index) => (
              <div key={index} className={styles.containerCheck}>
                <Image className={styles.imgCheck} src={Check} alt="Зеленая галочка" width={20} height={20} />
                <span className={styles.textCheck}>{feature}</span>
              </div>
            ))}
            <Button buttonText={rate.buttonText} className={styles.buttonCell} />
          </div>
        </div>
      ))}
    </div>
  );
});

RatesCell.displayName = "RatesCell";

export default RatesCell;
