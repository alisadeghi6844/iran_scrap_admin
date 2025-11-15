import React from "react";
import { VerticalMenuTypes } from "../../../types/components/VerticalMenuTypes";
import Typography from "../../typography/Typography";
import { useSelector } from "react-redux";
import { selectGetCurrentUserData } from "../../../redux/slice/account/AccountSlice";

const VerticalMenu: React.FC<VerticalMenuTypes> = (props) => {
  const { className, title, role, children, ...rest } = props;
  const userData = useSelector(selectGetCurrentUserData);
  return (
    <>
      <ul
        className={`${
          className ? className : ""
        } px-2 mb-8 flex flex-col gap-y-1`}
        {...rest}
      >
        <Typography className="font-bold text-gray-500 pb-2 px-2 text-sm lg:text-base">
          {title}
        </Typography>

        {children}
      </ul>
    </>
  );
};

export default VerticalMenu;
