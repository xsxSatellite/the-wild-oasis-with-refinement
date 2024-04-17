import { useQuery } from "@tanstack/react-query";

import { todayActivitiesOptions } from "../../services/queryOptions";

export default function useReadTodayActivities() {
  const result = useQuery(todayActivitiesOptions());

  return result;
}
