import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { key: "All", value: "all" },
          { key: "No discount", value: "no-discount" },
          { key: "With discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { key: "Sort by name (A-Z)", value: "name-asc" },
          { key: "Sort by name (Z-A)", value: "name-desc" },
          { key: "Sort by price (low first)", value: "regularPrice-asc" },
          { key: "Sort by price (high first)", value: "regularPrice-desc" },
          {
            key: "Sort by maximum capacity (low first)",
            value: "maxCapacity-asc",
          },
          {
            key: "Sort by maximum capacity (high first)",
            value: "maxCapacity-desc",
          },
        ]}
      />
    </TableOperations>
  );
}
