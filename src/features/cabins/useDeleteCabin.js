import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Succeeded in Deleting Cabin.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
        exact: true,
      });
    },
    onError: error => toast.error(error.message),
  });

  return { deleteCabinMutation, isDeleting };
}
