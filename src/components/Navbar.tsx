import type { ComponentProps } from "react";

const NavLink = (props: ComponentProps<"a">) => (
  <a
    {...props}
    className="px-4 py-2 inline-block hover:underline hover:scale-110"
  />
);

export const Navbar = () => (
  <nav className="bg-white border-b-2 border-b-gray-400 flex px-5 py-2 items-center">
    <NavLink href="/">Videos library</NavLink>
    <span className="border-l border-l-gray-300 mx-2 my-1 self-stretch"></span>

    <ul className="flex">
      <li>
        <NavLink href="/">My Videos</NavLink>
      </li>
      <li>
        <NavLink href="/new">New Video</NavLink>
      </li>
    </ul>
  </nav>
);
