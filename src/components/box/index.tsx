import React from "react";
import { BoxTypes } from "../../types/components/BoxTypes";

const Box = React.forwardRef<HTMLDivElement, BoxTypes>((props, ref) => {
  const { children, bg, className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col min-w-0 break-words ${bg ? bg : "bg-white"} shadow-lg rounded-2xl bg-clip-border ${
        className ?? ""
      }`}
      {...rest}
    >
      {children ?? null}
    </div>
  );
});

export default Box;
