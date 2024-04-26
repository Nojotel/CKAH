import HistogramCarousel from "@/components/Search/HistogramCarousel";
import PublicationList from "@/components//Search/PublicationList";
import styles from "./page.module.css";

const SearchResults = () => {
  return (
    <>
      <div className={styles.container}>
        <HistogramCarousel />
        <PublicationList />
      </div>
    </>
  );
};

export default SearchResults;
