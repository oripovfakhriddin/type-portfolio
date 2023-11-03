// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// import request from "../../server/request";
// import Skills from "../../types/education";

// interface initialStateTypes {
//   data: Education[];
//   loading: boolean;
// }

// const initialState: initialStateTypes = {
//   data: [],
//   loading: false,
// };

// export const getSkills = createAsyncThunk(
//   "skills/fetching",
//   async ({ search }: { search: string }) => {
//     const { data } = await request.get<Education[]>("education", {
//       params: { search },
//     });
//     return data;
//   }
// );

// export const skillsSlice = createSlice({
//   initialState,
//   name: "education",
//   reducers: {
//     controlLoading(state) {
//       state.loading = !state.loading;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getSkills.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(
//         getSkills.fulfilled,
//         (state, { payload }: PayloadAction<Education[]>) => {
//           state.loading = false;
//           state.data = payload;
//         }
//       )
//       .addCase(getSkills.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// const { reducer: skillsReducer, name: skillsName } = skillsSlice;

// const { controlLoading } = skillsSlice.actions;

// export { skillsReducer as default, skillsName, controlLoading };
