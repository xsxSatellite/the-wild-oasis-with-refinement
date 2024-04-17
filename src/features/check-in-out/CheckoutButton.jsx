import Button from "../../ui/Button";

import useUpdateBookingCheckOut from "../bookings/useUpdateBookingCheckOut";

function CheckoutButton({ bookingId }) {
  const { updateBookingCheckOutMutation, isUpdatingBookingCheckOut } =
    useUpdateBookingCheckOut();

  return (
    <Button
      $variation="primary"
      $size="small"
      disabled={isUpdatingBookingCheckOut}
      onClick={() => updateBookingCheckOutMutation(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
