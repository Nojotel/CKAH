import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchParams, SearchState } from "@/types/types";

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
