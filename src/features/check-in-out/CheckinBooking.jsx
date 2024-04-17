import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useReadBooking from "../bookings/useReadBooking";
import useUpdateBookingCheckIn from "../bookings/useUpdateBookingCheckIn";
import useReadSettings from "../settings/useReadSettings";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const {
    data: booking = {},
    status: bookingStatus,
    error: bookingError,
  } = useReadBooking();
  const {
    data: settings = {},
    status: settingsStatus,
    error: settingsError,
  } = useReadSettings();
  const { updateBookingCheckInMutation, isUpdatingBookingCheckIn } =
    useUpdateBookingCheckIn();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking.isPaid]);

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      // although its name is updateBookingCheckInMutation, but it's
      // responsible for the booking's status and extraPrice (breakfast price)
      // column conditionally
      updateBookingCheckInMutation({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      updateBookingCheckInMutation({ bookingId, breakfast: {} });
    }
  }

  switch (bookingStatus) {
    case "pending":
      return <Spinner />;
    case "error":
      return <p>Error: {bookingError.message}</p>;
  }

  switch (settingsStatus) {
    case "pending":
      return <Spinner />;
    case "error":
      return <p>Error: {settingsError.message}</p>;
  }

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="breakfast"
            onChange={() => {
              setAddBreakfast(prevAddBreakfast => !prevAddBreakfast);
              setConfirmPaid(false);
            }}>
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isUpdatingBookingCheckIn}
          onChange={() => setConfirmPaid(prevConfirmPaid => !prevConfirmPaid)}>
          I confirm {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isUpdatingBookingCheckIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
