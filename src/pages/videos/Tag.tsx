import type { PropsWithChildren } from "react";
import classNames from "classnames";

export const Tag = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={classNames(
      className,
      "bg-gray-700 text-white text-sm rounded-full inline-block px-2 py-[1px]",
    )}
  >
    {children}
  </div>
);
