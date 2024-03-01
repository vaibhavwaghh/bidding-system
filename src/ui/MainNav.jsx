import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUser,
} from "react-icons/hi2";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;+

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

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/">
            <AiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
          {/* <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink> */}
          <StyledNavLink to="/players">
            <HiOutlineHomeModern />
            <span>All Players</span>
          </StyledNavLink>
          <StyledNavLink to="/teams">
            <HiOutlineUser />
            <span>Teams</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser1">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 1</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser2">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 2</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser3">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 3</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser4">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 4</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser5">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 5</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser6">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 6</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser7">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 7</span>
          </StyledNavLink>
          <StyledNavLink to="/boughtPlayersByUser8">
            <HiOutlineCog6Tooth />
            <span>Bought Players - User 8</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
