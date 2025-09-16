import type { ComponentProps, PropsWithChildren } from "react";

export const InputWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-300 font-light">
    {children}
  </div>
);

export const InputBase = (
  props: Omit<ComponentProps<"input">, "className">,
) => (
  <input
    {...props}
    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
  />
);

export const Input = (props: ComponentProps<typeof InputBase>) => (
  <InputWrapper>
    <InputBase {...props} />
  </InputWrapper>
);
