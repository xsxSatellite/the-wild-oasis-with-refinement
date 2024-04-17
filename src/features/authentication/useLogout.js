import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { logout } from "../../services/apiAuth";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutation, isPending: isLoggingout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();

      navigate("/login", { replace: true });
    },
    onError: error => toast.error(error.message),
  });

  return { logoutMutation, isLoggingout };
}
