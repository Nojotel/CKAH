"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PublicationList.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Publication {
  id: string;
  title: {
    text: string;
    markup: string;
  };
  issueDate: string;
  source: {
    name: string;
  };
  url: string;
  content: {
    markup: string;
  };
  attributes: {
    isTechNews: boolean;
    isAnnouncement: boolean;
    isDigest: boolean;
    wordCount: number;
  };
}

const PublicationList: React.FC = () => {
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

        const encodedIds = objectSearchResponse.data.items.map((item: any) => item.encodedId);

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

        const documents = documentsResponse.data.filter((item: any) => item.ok).map((item: any) => item.ok);

        setPublications(documents);
        setDisplayedPublications(documents.slice(0, 10));
        setShowMore(documents.length > 10);
      } catch (error: any) {
        console.error("Ошибка получения публикаций:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken && searchParams) {
      fetchPublications();
    }
  }, [accessToken, searchParams]);

  const handleShowMore = () => {
    const currentDisplayedCount = displayedPublications.length;
    setDisplayedPublications((prevPublications) => [...prevPublications, ...publications.slice(currentDisplayedCount, currentDisplayedCount + 10)]);
    setShowMore(currentDisplayedCount + 10 < publications.length);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      {displayedPublications.map((publication) => (
        <div key={publication.id}>
          <h2>{publication.title.text}</h2>
          <p>{publication.issueDate}</p>
          <p>{publication.source.name}</p>
          {/* Остальные поля публикации */}
        </div>
      ))}
      {showMore && <button onClick={handleShowMore}>Показать больше</button>}
    </div>
  );
};

export default PublicationList;
