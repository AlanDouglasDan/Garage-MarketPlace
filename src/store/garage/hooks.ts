import { shallowEqual, useSelector } from "react-redux";

import { useActionCreator } from "hooks";
import { RootState } from "store/types";
import { GarageHookReturn } from "./types";
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

export const useGarage = (): GarageHookReturn => {
  const garageState = useSelector(
    (state: RootState) => state.garage,
    shallowEqual
  );

  return {
    ...garageState,
    setError: useActionCreator(setError),
    createListing: useActionCreator(createListing),
    getListings: useActionCreator(getListings),
    updateListing: useActionCreator(updateListing),
    submitReview: useActionCreator(submitReview),
    getBookings: useActionCreator(getBookings),
    rentGarage: useActionCreator(rentGarage),
    cancelBooking: useActionCreator(cancelBooking),
  };
};
