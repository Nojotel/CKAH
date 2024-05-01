import axios from "axios";
import { SearchParams } from "@/types/types";

export interface Publication {
  id: string;
  title: { text: string };
  issueDate: string;
  source: { name: string };
  url: string;
  content: { text: string };
  attributes: any;
}

export const fetchPublications = async (accessToken: string, searchParams: SearchParams, setError: (error: boolean) => void): Promise<Publication[]> => {
  try {
    if (!accessToken || !searchParams) {
      return [];
    }

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

    return documents;
  } catch (error: any) {
    console.error("Ошибка получения публикаций:", error.message);
    if (error.response && error.response.status === 400) {
      setError(true);
    }
    throw error;
  }
};
