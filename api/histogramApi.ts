import axios from "axios";
import { HistogramData, HistogramResponse, SearchParams } from "@/types/types";

export const fetchHistograms = async (accessToken: string, searchParams: SearchParams): Promise<HistogramData[]> => {
  try {
    const response = await axios.post<HistogramResponse>(
      "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
      {
        issueDateInterval: {
          startDate: `${searchParams.startDate}T00:00:00+03:00`,
          endDate: `${searchParams.endDate}T23:59:59+03:00`,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                sparkId: null,
                entityId: null,
                inn: searchParams.inputValue,
                maxFullness: searchParams.options.maxRelevance,
                inBusinessNews: searchParams.options.mentionInBusinessContext,
              },
            ],
            onlyMainRole: searchParams.options.mainRoleInPublication,
            tonality: searchParams.totalityValue,
            onlyWithRiskFactors: searchParams.options.publicationsOnlyWithRiskFactors,
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        attributeFilters: {
          excludeTechNews: searchParams.options.includeTechnicalNews,
          excludeAnnouncements: searchParams.options.includeAnnouncementsAndCalendars,
          excludeDigests: searchParams.options.includeNewsDigests,
        },
        similarMode: "duplicates",
        limit: parseInt(searchParams.documentCount),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const totalDocs = response.data.data.find((item) => item.histogramType === "totalDocuments")?.data || [];
    const risks = response.data.data.find((item) => item.histogramType === "riskFactors")?.data || [];

    const combinedData = totalDocs.map((doc, index) => ({
      date: formatDate(doc.date),
      totalDocuments: doc.value,
      riskFactors: risks[index]?.value || 0,
    }));

    return combinedData;
  } catch (error) {
    console.error("Ошибка получения сводки:", error);
    throw error;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
