import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Succeeded in Updating User Account.");

      queryClient.setQueryData(["user"], user);
    },
    onError: error => toast.error(error.message),
  });

  return { updateUser, isUpdatingUser };
}
