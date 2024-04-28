import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchParams {
  startDate: string | Date;
  endDate: string | Date;
  inputValue: string;
  totalityValue: string;
  documentCount: string;
  options: {
    maxRelevance: boolean;
    mentionInBusinessContext: boolean;
    mainRoleInPublication: boolean;
    publicationsOnlyWithRiskFactors: boolean;
    includeTechnicalNews: boolean;
    includeAnnouncementsAndCalendars: boolean;
    includeNewsDigests: boolean;
  };
}

interface SearchState {
  params: SearchParams;
}

const initialState: SearchState = {
  params: {
    startDate: "",
    endDate: "",
    inputValue: "",
    totalityValue: "any",
    documentCount: "",
    options: {
      maxRelevance: false,
      mentionInBusinessContext: false,
      mainRoleInPublication: false,
      publicationsOnlyWithRiskFactors: false,
      includeTechnicalNews: false,
      includeAnnouncementsAndCalendars: false,
      includeNewsDigests: false,
    },
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<SearchParams>) {
      state.params = action.payload;
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
