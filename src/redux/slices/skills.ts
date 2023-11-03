import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import request from "../../server/request";
import Skills from "../../types/skills";

interface initialStateTypes {
  data: Skills[];
  loading: boolean;
}

const initialState: initialStateTypes = {
  data: [],
  loading: false,
};

export const getSkills = createAsyncThunk(
  "skills/fetching",
  async ({ search }: { search: string }) => {
    const { data } = await request.get<Skills[]>("skills", {
      params: { search },
    });
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
        (state, { payload }: PayloadAction<Skills[]>) => {
          state.loading = false;
          state.data = payload;
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
