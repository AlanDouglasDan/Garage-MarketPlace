import {
  ActionReducerMapBuilder,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { UserState } from "./types";
import {
  setError,
  signUp,
  logIn,
  logOut,
  getUser,
  updateUser,
} from "./actions";

const initialState: UserState = {
  loading: false,
  error: false,
  currentUser: undefined,
};

const userStore = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
    });

    builder.addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.currentUser = undefined;
    });

    builder.addMatcher(
      isAnyOf(signUp.fulfilled, logIn.fulfilled, updateUser.fulfilled),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        signUp.pending,
        logIn.pending,
        logOut.pending,
        getUser.pending,
        updateUser.pending
      ),
      (state) => {
        state.loading = true;
        state.error = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        signUp.rejected,
        logIn.rejected,
        logOut.rejected,
        getUser.rejected,
        updateUser.rejected
      ),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message || true;
      }
    );
  },
});

export default userStore.reducer;
