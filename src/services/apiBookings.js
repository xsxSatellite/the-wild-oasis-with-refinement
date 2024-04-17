import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { ITEMS_PER_PAGE } from "../utils/constants";

async function readBookings({ filterOptions, sortByOptions, pageNumber }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // filter
  // because in supabase there's no all status, so that Here it checks
  // it to see if it were all, if it were, just fetch all, no filter applied
  if (filterOptions && filterOptions.value !== "all") {
    // the reason why it works fine despite the fact that the wierd query[...]
    // syntax is probably it returns an object, here I'm using property
    // accessors to choose one and invoke it
    query = query[filterOptions.method ?? "eq"](
      filterOptions.key,
      filterOptions.value
    );
  }

  // sort
  if (sortByOptions) {
    query = query.order(sortByOptions.sortByOption, {
      ascending: sortByOptions.direction === "asc",
    });
  }

  if (pageNumber) {
    // supabase range() function is 0 based, so that from should start from
    // 0
    const from = (pageNumber - 1) * ITEMS_PER_PAGE - 1;
    const to = from + ITEMS_PER_PAGE - 1;

    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Database Error: Failed to Fetch Bookings.", error);
    throw new Error("Failed to Fetch Bookings.");
  }

  return { data, count };
}

async function readBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*, cabins(name), guests(fullName, email, nationality, countryFlag, nationalID)"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Database Error: Failed to Fetch Booking.", error);
    throw new Error("Failed to Fetch Booking.");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
async function readBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error("Database Error: Failed to Fetch Bookings:", error);
    throw new Error("Failed to Fetch Bookings.");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
async function readStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error("Database Error: Failed to Fetch Bookings:", error);
    throw new Error("Failed to Fetch Bookings.");
  }

  return data;
}

// Activity means that there is a check in or a check out today
async function readStaysTodayActivities() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error("Database Error: Failed to Fetch TodayActivities:", error);
    throw new Error("Failed to Fetch TodayActivities.");
  }

  return data;
}

async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Database Error: Failed to Update Booking:", error);
    throw new Error("Failed to Update Booking.");
  }
  return data;
}

async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error("Database Error: Failed to Delete Booking:", error);
    throw new Error(`Failed to Delete Booking #${id}.`);
  }
}

export {
  readBookings,
  readBooking,
  updateBooking,
  deleteBooking,
  readBookingsAfterDate,
  readStaysAfterDate,
  readStaysTodayActivities,
};
