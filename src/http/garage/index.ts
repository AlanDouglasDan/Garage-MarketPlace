import {
  CreateListingData,
  RentGarageData,
  SubmitReviewData,
} from "store/garage/types";

import { supabase } from "core/supabase";

export const createListing = async (data: CreateListingData): Promise<any> => {
  const {
    host_id,
    title,
    description,
    price_per_day,
    // geo_lat,
    // geo_lng,
    address,
    amenities,
    size_sqft,
  } = data;

  const { data: listing, error } = await supabase
    .from("listings")
    .insert([
      {
        host_id,
        title,
        description,
        price_per_day,
        size_sqft,
        amenities,
        address,
        //   geo_lat: location.lat,
        //   geo_lng: location.lng,
        is_active: true,
      },
    ])
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  return listing;
};

export const getListings = async (): Promise<any> => {
  const { data, error } = await supabase
    .from("listings")
    .select(
      `
        id, 
        host_id,
        title, 
        description, 
        price_per_day, 
        geo_lat, 
        geo_lng, 
        address,
        amenities,
        size_sqft,
        listing_photos (
          url
        ),
        reviews (
          listing_id,
          guest_id (
          full_name
          ),
          rating,
          comment,
          created_at
        )
      `
    )
    .eq("is_active", true);

  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
};

export const updateListing = async (data: any): Promise<any> => {
  const { id, host_id, ...rest } = data;

  const { data: listing, error } = await supabase
    .from("listings")
    .update(rest)
    .eq("id", id)
    .eq("host_id", host_id);

  if (error) {
    throw new Error(error.message);
  }

  return listing;
};

export const submitReview = async (data: SubmitReviewData): Promise<any> => {
  const { listing_id, guest_id, comment, rating } = data;

  const { data: review, error } = await supabase
    .from("reviews")
    .insert([
      {
        listing_id,
        guest_id,
        comment,
        rating,
      },
    ])
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  return review;
};

export const getBookings = async (userId: string): Promise<any> => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
        id, 
        start_date, 
        end_date,
        total_price,
        guest_id,
        listings (
          id,
          title,
          description,
          price_per_day,
          amenities,
          size_sqft,
          address,
          host_id (
            id,
            full_name,
            avatar_url
          ),
          listing_photos (
            url
          ),
          reviews (
            listing_id,
            guest_id (
              full_name
            ),
            rating,
            comment,
            created_at
          )
        )
      `
    ) // Select bookings and associated listing title
    .eq("guest_id", userId) // Use the logged-in user's ID
    .neq("status", "cancelled"); // Exclude cancelled bookings

  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
};

export const rentGarage = async (data: RentGarageData): Promise<any> => {
  const { guest_id, listing_id, host_id, start_date, end_date, total_price } =
    data;

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([
      {
        guest_id,
        listing_id,
        host_id,
        start_date,
        end_date,
        total_price,
      },
    ])
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  return booking;
};

export const cancelBooking = async (data): Promise<any> => {
  const { bookingId, userId } = data;

  const { data: booking, error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("guest_id", userId)
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  return booking;
};
