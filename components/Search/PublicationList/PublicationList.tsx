"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PublicationCard from "@/components/PublicationCard/PublicationCard";
import styles from "./PublicationList.module.css";
import Loader from "@/components/Loader/Loader";
import { fetchPublications, Publication } from "@/api/listApi";

const PublicationList = ({ setError }: { setError: (error: boolean) => void }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [displayedPublications, setDisplayedPublications] = useState<Publication[]>([]);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const searchParams = useSelector((state: RootState) => state.search.params);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (accessToken && searchParams) {
          const data = await fetchPublications(accessToken, searchParams, setError);
          setPublications(data);
          setDisplayedPublications(data.slice(0, 2));
          setShowMore(data.length > 2);
        }
      } catch (error) {
        console.error("Ошибка получения публикаций:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken, searchParams, setError]);

  const handleShowMore = () => {
    const currentDisplayedCount = displayedPublications.length;
    setDisplayedPublications((prevPublications) => [...prevPublications, ...publications.slice(currentDisplayedCount, currentDisplayedCount + 2)]);
    setShowMore(currentDisplayedCount + 2 < publications.length);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.publicationList}>
          {displayedPublications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      )}
      {showMore && (
        <button className={styles.showMoreButton} onClick={handleShowMore}>
          Показать больше
        </button>
      )}
    </div>
  );
};

export default PublicationList;
