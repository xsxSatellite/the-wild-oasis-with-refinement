import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export default function useUpdateBookingCheckOut() {
  const queryClient = useQueryClient();
  const {
    mutate: updateBookingCheckOutMutation,
    isPending: isUpdatingBookingCheckOut,
  } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: data => {
      toast.success(`Succeeded in Checking Out Booking #${data.id}`);

      queryClient.invalidateQueries({ active: true });
    },
    onError: error => toast.error(error.message),
  });

  return { updateBookingCheckOutMutation, isUpdatingBookingCheckOut };
}
