import { useQuery } from "@tanstack/react-query";

import { userOptions } from "../../services/queryOptions";

export default function useReadUser() {
  const result = useQuery(userOptions());

  return result;
}
