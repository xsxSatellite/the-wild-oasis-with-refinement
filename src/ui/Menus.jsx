import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

import useFocusTrapping from "../hooks/useFocusTrapping";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggler = styled.button`
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  left: ${props => props.$position.left}px;
  top: ${props => props.$position.top}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [activeListId, setActiveListId] = useState("");
  const [position, setPosition] = useState(null);

  function close() {
    setActiveListId("");
  }

  function open(target) {
    setActiveListId(target);
  }

  return (
    <MenusContext.Provider
      value={{ activeListId, open, close, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggler({ target }) {
  const { activeListId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rectangle = e.target.closest("button").getBoundingClientRect();
    setPosition({
      top: rectangle.top + rectangle.height,
      left: rectangle.left + rectangle.width,
    });

    // cannot figure out why menu is opened again after close() is invoked
    activeListId === "" || activeListId !== target ? open(target) : close();
  }

  return (
    <StyledToggler onClick={handleClick}>
      <EllipsisVerticalIcon />
    </StyledToggler>
  );
}

// name here is particular cabin's id but for the sake of consistence in
// the codebase, name is still be used
function List({ children, name }) {
  const { activeListId, position, close } = useContext(MenusContext);
  // const ref = useFocusTrapping(close);
  const ref = useFocusTrapping(close);

  if (name !== activeListId) return;

  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    // in cabintable there's a button responsible for duplicating a cabin
    // that's already existing, this onClick handler is coming from there
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggler = Toggler;
Menus.List = List;
Menus.Button = Button;
