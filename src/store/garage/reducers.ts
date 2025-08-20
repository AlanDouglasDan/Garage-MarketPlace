import {
  ActionReducerMapBuilder,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

import { GarageState } from "./types";
import {
  setError,
  createListing,
  getListings,
  updateListing,
  submitReview,
  getBookings,
  rentGarage,
  cancelBooking,
} from "./actions";

const initialState: GarageState = {
  loading: false,
  error: false,
  listings: undefined,
  bookings: undefined,
};

const garageStore = createSlice({
  name: "garage",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<GarageState>) => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(getListings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.listings = payload;
    });

    builder.addCase(getBookings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.bookings = payload;
    });

    builder.addMatcher(
      isAnyOf(
        createListing.fulfilled,
        updateListing.fulfilled,
        submitReview.fulfilled,
        rentGarage.fulfilled,
        cancelBooking.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        createListing.pending,
        getListings.pending,
        updateListing.pending,
        submitReview.pending,
        getBookings.pending,
        rentGarage.pending,
        cancelBooking.pending
      ),
      (state) => {
        state.loading = true;
        state.error = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        createListing.rejected,
        getListings.rejected,
        updateListing.rejected,
        submitReview.rejected,
        getBookings.rejected,
        rentGarage.rejected,
        cancelBooking.rejected
      ),
      (state, { error }) => {
        state.loading = false;
        state.error = error?.message || true;
      }
    );
  },
});

export default garageStore.reducer;
