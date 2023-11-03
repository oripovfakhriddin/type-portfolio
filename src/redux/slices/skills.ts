import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "../../server/request";
import { DataSkills } from "../../types/skills";

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
    percent: number;
    user: null;
    __v: number;
  }[];
}

interface initialStateInterface {
  skills: DataSkills[];
  total: number;
  loading: boolean;
}

const initialState: initialStateInterface = {
  skills: [],
  total: 0,
  loading: false,
};

export const getSkills = createAsyncThunk(
  "skill/fetching",
  async ({ active = 1, search }: { active: number; search: string }) => {
    const params = {
      search,
      page: active,
      limit: 10,
    };
    const { data } = await request.get("skills", { params });
    return data;
  }
);

export const skillsSlice = createSlice({
  initialState,
  name: "skills",
  reducers: {
    controlLoading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSkills.fulfilled,
        (state, { payload: { data, pagination } }: PayloadAction<Data>) => {
          (state.skills = data), (state.total = pagination.total);
          state.loading = false;
        }
      )
      .addCase(getSkills.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: skillsReducer, name: skillsName } = skillsSlice;

const { controlLoading } = skillsSlice.actions;

export { skillsReducer as default, skillsName, controlLoading };
