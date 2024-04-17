import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteBooking } from "../../services/apiBookings";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutation, isPending: isDeleting } = useMutation({
    mutationFn: bookingId => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Succeeded in Deleting Booking.");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: error => toast.error(error.message),
  });

  return { deleteBookingMutation, isDeleting };
}
