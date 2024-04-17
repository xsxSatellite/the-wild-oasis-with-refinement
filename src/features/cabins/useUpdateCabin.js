import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabinMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateCabin,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Succeeded in Updating Cabin.");

      queryClient.invalidateQueries({ queryKey: ["cabins"], exact: true });
    },
  });

  return { updateCabinMutation, isUpdating };
}
