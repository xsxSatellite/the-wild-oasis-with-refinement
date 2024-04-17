import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { bookingOptions } from "../../services/queryOptions";

export default function useReadBooking() {
  const { bookingId } = useParams();
  const data = useQuery(bookingOptions(Number(bookingId)));

  return data;
}
