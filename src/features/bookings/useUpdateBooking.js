import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export default function useUpdateBookingCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateBookingCheckInMutation, isPending: isUpdatingCheckIn } =
    useMutation({
      mutationFn: ({ bookingId, breakfast }) =>
        updateBooking(bookingId, {
          status: "checked-in",
          isPaid: true,
          ...breakfast,
        }),
      onSuccess: data => {
        toast.success(`Succeeded in Updating Booking #${data.id}.`);

        queryClient.invalidateQueries({ active: true });
        navigate("/");
      },
      onError: error => toast.error(error.message),
    });

  return { updateBookingCheckInMutation, isUpdatingCheckIn };
}
