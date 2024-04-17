import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import useReadCabins from "./useReadCabin";

export default function CabinTable() {
  const { data: cabins, status, error } = useReadCabins();
  const [searchParams] = useSearchParams();

  // filter
  const filterOption = searchParams.get("discount") ?? "all";
  let filteredCabins = [];
  switch (filterOption) {
    case "all":
      filteredCabins = cabins;
      break;
    case "no-discount":
      filteredCabins = cabins.filter(cabin => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter(cabin => cabin.discount > 0);
      break;
  }

  // sort
  const sortByOption = searchParams.get("sortBy") ?? "name-asc";
  // logic is same as filter's switch statement part
  // regularPrice-asc will be [regularPrice, asc]
  const [field, direction] = sortByOption.split("-");
  // to invert the result of toSorted
  // if a were 1, b were 2
  // (a/1 - b/2) = -1, because the result is negative a will be sorted before
  // b, but if the direction/modifier applies
  // (a/1 - b/2) = -1 * -1 => 1, b will be sorted before a
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins = filteredCabins?.toSorted(
    (a, b) => (a[field] - b[field]) * modifier
  );

  switch (status) {
    case "pending":
      return <Spinner />;
    case "error":
      return <p>Error: {error.message}</p>;
  }

  if (!cabins.length) return <Empty resourceName="Cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
