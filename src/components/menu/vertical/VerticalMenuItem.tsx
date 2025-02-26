import React, { useEffect, useState } from "react";
import Typography from "../../typography/Typography";
import { FaChevronLeft } from "react-icons/fa6";
import { VerticalMenuItemTypes } from "../../../types/components/VerticalMenuItemTypes";
import Badge from "../../badge/Badge";
import SmallBellIcon from "../../icon/custom/SmallBellIcon";

const VerticalMenuItem: React.FC<VerticalMenuItemTypes> = (props) => {
  const {
    children,
    className,
    collapsable,
    link,
    title,
    icon,
    notif,
    isNew,
    ...rest
  } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      
        <li
        onClick={() => setIsVisible((prevState) => !prevState)}
        className={`${
          isVisible ? "open-child" : null
        } px-2 py-3 font-semibold text-gray-600 rounded-lg hover:bg-primary-100 transition-all menu-item-custom`}
        {...rest}
      >
        <Typography
          tag={link ? "a" : "span"}
          link={link ?? null}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            {icon ?? null}
            {title}
          </div>
          {children && (
            <>
              <Typography tag="span">
                <FaChevronLeft
                  className={`transition-all text-lg ${
                    isVisible ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </Typography>
            </>
          )}
          {notif && (
            <>
              <Badge
                variant="error"
                className="w-[26px] h-[26px] rounded-lg"
                number={notif}
              />
            </>
          )}

          {isNew && (
            <div className="bg-[#dbf3f7] flex items-center gap-x-1 px-2 py-1 rounded-lg">
              <SmallBellIcon />
              <Typography className="text-sm text-[#006C9C]">جدید</Typography>
            </div>
          )}
        </Typography>
        {children && children}
      </li>
    </>
  );
};

export default VerticalMenuItem;
