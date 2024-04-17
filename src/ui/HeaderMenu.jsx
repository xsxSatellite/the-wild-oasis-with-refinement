import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserIcon } from "@heroicons/react/24/outline";

import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import DarkModaToggler from "./DarkModeToggler";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <UserIcon />
        </ButtonIcon>
      </li>
      <li>
        <DarkModaToggler />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
