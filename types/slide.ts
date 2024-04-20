import { Slide } from "./types";
import Time from "@/public/Time.svg";
import Search from "@/public/Search.svg";
import Shield from "@/public/Shield.svg";

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: Time,
    description: "Высокая и оперативная скорость обработки заявки",
  },
  {
    id: 2,
    imageUrl: Search,
    description: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },
  {
    id: 3,
    imageUrl: Shield,
    description: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
];

export default slides;
