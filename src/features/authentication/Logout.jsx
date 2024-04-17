import { ArrowRightIcon } from "@heroicons/react/24/outline";

import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";

export default function Logout() {
  const { logoutMutation, isLoggingout } = useLogout();

  return (
    <ButtonIcon onClick={logoutMutation} disabled={isLoggingout}>
      <ArrowRightIcon />
    </ButtonIcon>
  );
}
