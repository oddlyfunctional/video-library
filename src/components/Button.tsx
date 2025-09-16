import type { ComponentProps } from "react";

export const Button = (props: Omit<ComponentProps<"button">, "className">) => (
  <button
    {...props}
    className="border border-black px-4 py-2 rounded-md bg-white text-black hover:bg-black hover:text-white cursor-pointer disabled:pointer-events-none disabled:text-gray-400 border-gray-400"
  />
);
