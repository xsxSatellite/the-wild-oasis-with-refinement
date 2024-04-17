import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { bookingsOptions } from "../../services/queryOptions";
import { readBookings } from "../../services/apiBookings";
import { ITEMS_PER_PAGE } from "../../utils/constants";

export default function useReadBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // filter option
  const filterOption = searchParams.get("status") ?? "all";
  const filterOptions = {
    key: "status",
    value: filterOption,
  };

  // sortby option
  const sortBy = searchParams.get("sortBy") ?? "startDate-desc";
  const [sortByOption, direction] = sortBy.split("-");
  const sortByOptions = { sortByOption, direction };

  // pagination
  const pageNumber = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const { data: { data: bookings, count, status, error } = {} } = useQuery(
    bookingsOptions({ filterOptions, sortByOptions, pageNumber })
  );

  // pre-fetching
  // calculate out the total pages (1 page, or 2 pages in total)
  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

  // pre-fetch next page if the current page (pageNumber) is still greater
  // than the last page (pageCount)
  if (pageNumber < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterOptions, sortByOptions, pageNumber + 1],
      queryFn: () =>
        readBookings({
          filterOptions,
          sortByOptions,
          pageNumber: pageNumber + 1,
        }),
    });
  }

  if (pageNumber > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterOptions, sortByOptions, pageNumber + 1],
      queryFn: () =>
        readBookings({
          filterOptions,
          sortByOptions,
          pageNumber: pageNumber - 1,
        }),
    });
  }

  return { bookings, count, status, error };
}
