import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabinMutation, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Succeeded in Creating Cabin.");

      queryClient.invalidateQueries({ queryKey: ["cabins"], exact: true });
    },
  });

  return { createCabinMutation, isCreating };
}
