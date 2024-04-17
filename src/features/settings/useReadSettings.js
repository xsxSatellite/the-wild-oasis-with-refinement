import { useQuery } from "@tanstack/react-query";
import { settingsOptions } from "../../services/queryOptions";

export default function useReadSettings() {
  const result = useQuery(settingsOptions());

  return result;
}
