import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//createAsyncThunk <CartItem[],  Record<string, string>>

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "isLoad",
  SUCCESS = "success",
  ERROR = "errors",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

type FetchPizzasT = {
  sortValue: string;
  activeCategory: number;
  currentPage: number;
  order: string;
  search: string;
};

export const fetchPizza = createAsyncThunk<Pizza[], FetchPizzasT>(
  "pizza/fetchPizzaStatus",
  async (params, thunkAPI) => {
    const { sortValue, activeCategory, currentPage, order, search } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://63b575f358084a7af394fe1e.mockapi.io/pizza-items?page=${currentPage}&limit=5&${
        Number(activeCategory) > 0 ? `category=${activeCategory}` : ""
      }&sortBy=${sortValue}&order=${order}${search}`
    );

    return data;
  }
);

const PizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizza.pending]: (state) => {
  //     state.status = "isLoad";
  //     state.items = [];
  //   },
  //   [fetchPizza.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     console.log(action.payload);
  //     state.status = "success";
  //   },
  //   [fetchPizza.rejected]: (state) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const { setItems } = PizzaSlice.actions;

export default PizzaSlice.reducer;
