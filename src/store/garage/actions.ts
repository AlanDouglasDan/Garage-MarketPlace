import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createListing as createListingApi,
  getListings as getListingsApi,
  updateListing as updateListingApi,
  submitReview as submitReviewApi,
  getBookings as getBookingsApi,
  rentGarage as rentGarageApi,
  cancelBooking as cancelBookingApi,
} from "http/garage";
import { CreateListingData, SubmitReviewData, RentGarageData } from "./types";

const SET_ERROR = "garage/SET_ERROR";
const CREATE_LISTING = "garage/CREATE_LISTING";
const GET_LISTINGS = "garage/GET_LISTINGS";
const UPDATE_LISTING = "garage/UPDATE_LISTING";
const SUBMIT_REVIEW = "garage/SUBMIT_REVIEW";
const GET_BOOKINGS = "garage/GET_BOOKINGS";
const RENT_GARAGE = "garage/RENT_GARAGE";
const CANCEL_BOOKING = "garage/CANCEL_BOOKING";

export const setError = createAction<boolean | string>(SET_ERROR);

export const createListing = createAsyncThunk<any, CreateListingData>(
  CREATE_LISTING,
  async (data) => {
    const res = await createListingApi(data);

    return res;
  }
);

export const getListings = createAsyncThunk<any>(GET_LISTINGS, async () => {
  const res = await getListingsApi();

  return res;
});

export const updateListing = createAsyncThunk<any, CreateListingData>(
  UPDATE_LISTING,
  async (data) => {
    const res = await updateListingApi(data);

    return res;
  }
);

export const submitReview = createAsyncThunk<any, SubmitReviewData>(
  SUBMIT_REVIEW,
  async (data) => {
    const res = await submitReviewApi(data);

    return res;
  }
);

export const getBookings = createAsyncThunk<any, string>(
  GET_BOOKINGS,
  async (userId) => {
    const res = await getBookingsApi(userId);

    return res;
  }
);

export const rentGarage = createAsyncThunk<any, RentGarageData>(
  RENT_GARAGE,
  async (data) => {
    const res = await rentGarageApi(data);

    return res;
  }
);

export const cancelBooking = createAsyncThunk<any>(
  CANCEL_BOOKING,
  async (data) => {
    const res = await cancelBookingApi(data);

    return res;
  }
);
