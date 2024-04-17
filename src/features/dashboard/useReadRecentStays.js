import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns/subDays";
import { useSearchParams } from "react-router-dom";

import { bookingsWithStaysOptions } from "../../services/queryOptions";

export default function useReadRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data, status, error } = useQuery(
    bookingsWithStaysOptions({ numDays, queryDate })
  );

  const bookingsWithStaysConfirmed = data?.filter(
    booking =>
      booking.status === "checked-in" || booking.status === "checked-out"
  );

  return { bookingsWithStaysConfirmed, numDays, status, error };
}
