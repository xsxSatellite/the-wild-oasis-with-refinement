import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

import { bookingsWithLastOptions } from "../../services/queryOptions";

export default function useReadRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const result = useQuery(bookingsWithLastOptions({ numDays, queryDate }));

  return result;
}
