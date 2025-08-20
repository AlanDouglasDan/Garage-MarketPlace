export interface GarageState {
  loading: boolean;
  error: boolean | string;
  listings?: any;
  bookings?: any;
}

export interface GarageHookReturn extends GarageState {
  setError: (error: boolean | string) => void;
  createListing: (data: CreateListingData) => any;
  getListings: () => any;
  updateListing: (data: any) => any;
  submitReview: (data: SubmitReviewData) => any;
  getBookings: (userId: string) => any;
  rentGarage: (data: RentGarageData) => any;
  cancelBooking: (data: any) => any;
}

export interface CreateListingData {
  host_id: string;
  title: string;
  description: string;
  price_per_day: number;
  geo_lat?: number;
  geo_lng?: number;
  address: string;
  amenities: string[];
  size_sqft: number;
}

export interface SubmitReviewData {
  listing_id: string;
  guest_id: string;
  comment: string;
  rating: number;
}

export interface RentGarageData {
  guest_id: string;
  listing_id: string;
  host_id: string;
  start_date: Date;
  end_date: Date;
  total_price: number;
}
