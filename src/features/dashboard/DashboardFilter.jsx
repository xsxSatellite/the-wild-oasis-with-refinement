import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { key: "Last 7 days", value: "7" },
        { key: "Last 30 days", value: "30" },
        { key: "Last 90 days", value: "90" },
      ]}
    />
  );
}

export default DashboardFilter;
