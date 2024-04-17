import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { key: "All", value: "all" },
          { key: "Checked Out", value: "checked-out" },
          { key: "Checked In", value: "checked-in" },
          { key: "Unconfirmed", value: "unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          {
            key: "Sort by date (recent first)",
            value: "startDate-desc",
          },
          {
            key: "Sort by date (earlier first)",
            value: "startDate-asc",
          },
          {
            key: "Sort by amount (high first)",
            value: "totalPrice-desc",
          },
          {
            key: "Sort by amount (low first)",
            value: "totalPrice-asc",
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
