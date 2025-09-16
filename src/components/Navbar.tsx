import classNames from "classnames";
import type { ComponentProps } from "react";
import { Link, NavLink as ReactRouterNavLink } from "react-router";

const NavLink = (props: ComponentProps<typeof ReactRouterNavLink>) => (
  <ReactRouterNavLink
    {...props}
    className={({ isActive }) =>
      classNames("px-4 py-2 inline-block hover:underline hover:scale-110", {
        "font-bold": isActive,
        "pointer-events-none": isActive,
      })
    }
  />
);

export const Navbar = () => (
  <nav className="bg-white border-b-2 border-b-gray-400 flex px-5 py-2 items-center">
    <Link to="/">Videos library</Link>
    <span className="border-l border-l-gray-300 mx-2 my-1 self-stretch"></span>

    <ul className="flex">
      <li>
        <NavLink to="/">My Videos</NavLink>
      </li>
      <li>
        <NavLink to="/new">New Video</NavLink>
      </li>
    </ul>
  </nav>
);
