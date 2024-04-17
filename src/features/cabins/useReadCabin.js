import { useQuery } from "@tanstack/react-query";
import { cabinsOptions } from "../../services/queryOptions";

export default function useReadCabins() {
  const result = useQuery(cabinsOptions());

  return result;
}
