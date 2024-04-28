"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PublicationCard from "@/components/PublicationCard/PublicationCard";
import styles from "./PublicationList.module.css";
import Loader from "@/components/Loader/Loader";

interface Publication {
  id: string;
  title: { text: string };
  issueDate: string;
  source: { name: string };
  url: string;
  content: { text: string };
  attributes: any;
}

const PublicationList = ({ setError }: { setError: (error: boolean) => void }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [displayedPublications, setDisplayedPublications] = useState<Publication[]>([]);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const searchParams = useSelector((state: RootState) => state.search.params);

  useEffect(() => {
    const fetchPublications = async () => {
      setIsLoading(true);
      try {
        if (accessToken && searchParams) {
          const requestBody = {
            limit: parseInt(searchParams.documentCount) || 10,
            sortType: "none",
            sortDirectionType: "desc",
            issueDateInterval: {
              startDate: `${searchParams.startDate}T00:00:00+03:00`,
              endDate: `${searchParams.endDate}T23:59:59+03:00`,
            },
            searchContext: {
              targetSearchEntitiesContext: {
                targetSearchEntities: [
                  {
                    type: "company",
                    inn: searchParams.inputValue,
                    maxFullness: searchParams.options.maxRelevance,
                    inBusinessNews: searchParams.options.mentionInBusinessContext,
                  },
                ],
                onlyMainRole: searchParams.options.mainRoleInPublication,
                tonality: searchParams.totalityValue,
                onlyWithRiskFactors: searchParams.options.publicationsOnlyWithRiskFactors,
              },
            },
            attributeFilters: {
              excludeTechNews: !searchParams.options.includeTechnicalNews,
              excludeAnnouncements: !searchParams.options.includeAnnouncementsAndCalendars,
              excludeDigests: !searchParams.options.includeNewsDigests,
            },
          };

          const objectSearchResponse = await axios.post("https://gateway.scan-interfax.ru/api/v1/objectsearch", requestBody, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          const encodedIds = objectSearchResponse.data.items.map((item: { encodedId: string }) => item.encodedId);

          const documentsResponse = await axios.post(
            "https://gateway.scan-interfax.ru/api/v1/documents",
            { ids: encodedIds },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const documents = documentsResponse.data.filter((item: { ok: Publication | null }) => item.ok).map((item: { ok: Publication }) => item.ok);

          setPublications(documents);
          setDisplayedPublications(documents.slice(0, 2));
          setShowMore(documents.length > 2);
        }
      } catch (error: any) {
        console.error("Ошибка получения публикаций:", error.message);
        if (error.response && error.response.status === 400) {
          setError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
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
