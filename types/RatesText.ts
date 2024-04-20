import { Rate } from "./types";
import Light from "@/public/Light.svg";
import Target from "@/public/Target.svg";
import Business from "@/public/Business.svg";

const rates: Rate[] = [
  {
    id: 1,
    title: "Beginner",
    imageUrl: Light,
    subTitle: "Для небольшого исследования",
    currentPrice: 799,
    oldPrice: 1200,
    priceDescription: "или 150 ₽/мес. при рассрочке на 24 мес.",
    features: ["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"],
    buttonText: "Подробнее",
    buttonTextAuthenticated: "Перейти в личный кабинет",
    color: "var(--colorOrange)",
  },
  {
    id: 2,
    title: "Pro",
    imageUrl: Target,
    subTitle: "Для HR и фрилансеров",
    currentPrice: 1299,
    oldPrice: 2600,
    priceDescription: "или 279 ₽/мес. при рассрочке на 24 мес.",
    features: ["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"],
    buttonText: "Подробнее",
    buttonTextAuthenticated: "Подробнее",
    color: "var(--colorTeal)",
  },
  {
    id: 3,
    title: "Business",
    imageUrl: Business,
    subTitle: "Для корпоративных клиентов",
    currentPrice: 2379,
    oldPrice: 3700,
    priceDescription: "",
    features: ["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"],
    buttonText: "Подробнее",
    buttonTextAuthenticated: "Подробнее",
    color: "var(--colorDark)",
  },
];

export default rates;
