import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//Enum для sortProp, тоже хорошее решение!

export type FilterSliceItem = {
  title: string;
  sortProp: "rating" | "-rating" | "title" | "-title" | "price" | "-price";
};

interface FilterSliceState {
  activeCategory: number;
  currentPage: number;
  searchValue: string;
  sort: FilterSliceItem;
}

const initialState: FilterSliceState = {
  activeCategory: 0,
  currentPage: 1,
  searchValue: "",
  sort: {
    title: "популярности",
    sortProp: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setSort(state, action: PayloadAction<FilterSliceItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.activeCategory = Number(action.payload.activeCategory);
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
      } else {
        state.activeCategory = 0;
        state.currentPage = 1;
        state.sort = {
          title: "популярности",
          sortProp: "rating",
        };
      }
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;

export const { setActiveCategory, setSort, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
