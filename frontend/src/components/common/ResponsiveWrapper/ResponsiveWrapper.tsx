import { PropsWithChildren } from "react";
import clsx from "clsx";

export function ResponsiveWrapper({ children, isHiddenOnMobile }: PropsWithChildren<{ isHiddenOnMobile: boolean }>) {
  return (
    <div
      className={clsx([
        "md:block",
        {
          hidden: isHiddenOnMobile,
        },
      ])}
    >
      {children}
    </div>
  );
}
