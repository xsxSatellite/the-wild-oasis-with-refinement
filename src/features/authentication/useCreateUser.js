import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createUser } from "../../services/apiAuth";

export default function useCreateUser() {
  const { mutate: createUserMutation, isPending: isCreatingUser } = useMutation(
    {
      mutationFn: ({ fullName, password, email }) =>
        createUser({ fullName, password, email }),
      onSuccess: (data, variables) => {
        toast.success(`Succeeded in Creating User ${variables.fullName}`);
      },
      onError: error => toast.error(error.message),
    }
  );

  return { createUserMutation, isCreatingUser };
}
