import {
  CalendarDaysIcon,
  BriefcaseIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookingsWithLast,
  bookingsWithStaysConfirmed,
  numDays,
  cabinCount,
}) {
  const numBookings = bookingsWithLast.length;
  const sales = bookingsWithLast.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = bookingsWithStaysConfirmed.length;
  const occupation =
    bookingsWithStaysConfirmed.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<BriefcaseIcon />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<BanknotesIcon />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<CalendarDaysIcon />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<ChartBarIcon />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
