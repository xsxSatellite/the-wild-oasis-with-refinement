import { queryOptions } from "@tanstack/react-query";

import { readCurrentUser } from "./apiAuth";
import {
  readBooking,
  readBookings,
  readBookingsAfterDate,
  readStaysAfterDate,
  readStaysTodayActivities,
} from "./apiBookings";
import { readCabins } from "./apiCabins";
import { readSettings } from "./apiSettings";

function cabinsOptions() {
  return queryOptions({
    queryKey: ["cabins"],
    queryFn: readCabins,
  });
}

function settingsOptions() {
  return queryOptions({
    queryKey: ["settings"],
    queryFn: readSettings,
  });
}

function bookingsOptions({ filterOptions, sortByOptions, pageNumber }) {
  return queryOptions({
    queryKey: ["bookings", filterOptions, sortByOptions, pageNumber],
    queryFn: () => readBookings({ filterOptions, sortByOptions, pageNumber }),
  });
}

function bookingsWithLastOptions({ numDays, queryDate }) {
  return queryOptions({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => readBookingsAfterDate(queryDate),
  });
}

function bookingsWithStaysOptions({ numDays, queryDate }) {
  return queryOptions({
    queryKey: ["bookings", `stays-${numDays}`],
    queryFn: () => readStaysAfterDate(queryDate),
  });
}

function bookingOptions(id) {
  return queryOptions({
    queryKey: ["booking", id],
    queryFn: () => readBooking(id),
    retry: false,
  });
}

function userOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: readCurrentUser,
  });
}

function todayActivitiesOptions() {
  return queryOptions({
    queryKey: ["todayActivities"],
    queryFn: readStaysTodayActivities,
  });
}

export {
  bookingOptions,
  bookingsOptions,
  bookingsWithLastOptions,
  bookingsWithStaysOptions,
  cabinsOptions,
  settingsOptions,
  userOptions,
  todayActivitiesOptions,
};
