import styled from "styled-components";
import useReadRecentBookings from "./useReadRecentBookings";
import Spinner from "../../ui/Spinner";
import useReadRecentStays from "./useReadRecentStays";
import useReadCabins from "../cabins/useReadCabin";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const {
    data: bookingsWithLast,
    status: bookingsWithLastStatus,
    error: bookingsWithLastError,
  } = useReadRecentBookings();

  const {
    bookingsWithStaysConfirmed,
    numDays,
    status: bookingsWithStaysConfirmedStatus,
    error: bookingsWithStaysConfirmedError,
  } = useReadRecentStays();
  const {
    data: cabins,
    status: cabinsStatus,
    error: cabinsError,
  } = useReadCabins();

  // knowing the two custom hooks are parallel, but still no sure if their
  // data will arrive at the same time or not, so that dispatching their
  // respective switch statement to check their states
  switch (bookingsWithLastStatus) {
    case "pending":
      return <Spinner />;
    case "error":
      return <p>Error: {bookingsWithLastError.message}</p>;
  }

  switch (bookingsWithStaysConfirmedStatus) {
    case "pending":
      return <Spinner />;
    case "error":
      return <p>Error: {bookingsWithStaysConfirmedError.message}</p>;
  }

  switch (cabinsStatus) {
    case "pending":
      return <Spinner />;
    case "error":
      return <p>Error: {cabinsError.message}</p>;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookingsWithLast={bookingsWithLast}
        bookingsWithStaysConfirmed={bookingsWithStaysConfirmed}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart bookingsWithStaysConfirmed={bookingsWithStaysConfirmed} />
      <SalesChart bookingsWithLast={bookingsWithLast} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
