import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  HomeModernIcon,
  CalendarDaysIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const NavList = styled.ul`
  > * + * {
    margin-block-start: 0.8rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <span>Home</span>
            <HomeIcon />
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <span>Bookings</span>
            <CalendarDaysIcon />
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <span>Cabins</span>
            <HomeModernIcon />
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <span>Users</span>
            <UsersIcon />
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <span>Settings</span>
            <Cog6ToothIcon />
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
