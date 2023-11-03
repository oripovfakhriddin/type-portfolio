import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "../../server/request";
import { DataEducation } from "../../types/education";

interface Data {
  pagination: {
    next: number;
    limit: number;
    page: number;
    total: number;
  };
  data: {
    _id: string;
    name: string;
    level: string;
    user: null;
    description: string;
    startDate: string;
    endDate: string;
    __v: number;
  }[];
}

interface initialStateInterface {
  education: DataEducation[];
  total: number;
  loading: boolean;
}

const initialState: initialStateInterface = {
  education: [],
  total: 0,
  loading: false,
};

export const getEducation = createAsyncThunk(
  "education/fetching",
  async ({ active = 1, search }: { active: number; search: string }) => {
    const params = {
      search,
      page: active,
      limit: 10,
    };
    const { data } = await request.get("education", { params });
    return data;
  }
);

export const educationSlice = createSlice({
  initialState,
  name: "education",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getEducation.fulfilled,
        (state, { payload: { data, pagination } }: PayloadAction<Data>) => {
          (state.education = data), (state.total = pagination.total);
          state.loading = false;
        }
      )
      .addCase(getEducation.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: educationReducer, name: educationName } = educationSlice;

const { controlLoading } = educationSlice.actions;

export { educationReducer as default, educationName, controlLoading };
