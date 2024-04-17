import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login } from "../../services/apiAuth";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending: isLoggingin } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    // because parameters of side effect method are positional, so that
    // needing to destructure data out first
    onSuccess: data => {
      // signInWithPassword returns both user and session, if setting directly
      // data into react query's cache with queryKey ["user"], later on when
      // useReadUser custom hook is called with the same ["user"] queryKey,
      // isAuthenticated property cannot be correctly destructured out, then
      // weird redirection behavior happens, because react query will directly
      // grab the data from its cache, in this case data with queryKey
      // ["user"] having { user: {...}, session: {...} } structure, but
      // isAuthenticated property is in user object
      queryClient.setQueryData(["user"], data.user);

      navigate("/dashboard", { replace: true });
    },
    onError: error => toast.error(error.message),
  });

  return { loginMutation, isLoggingin };
}
