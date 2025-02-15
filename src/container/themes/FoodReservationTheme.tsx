import React, {useEffect} from "react";
import {AdminThemeTypes} from "../../types/organism/AdminThemeTypes";
import Header from "../organism/Header";
import DesktopSidebar from "../features/sideBar/DesktopSidebar";

const FoodReservationTheme: React.FC<AdminThemeTypes> = (props) => {
    const {children, title, crumb, ...rest} = props;

    useEffect(() => {
        document.title = title ?? "رزرواسیون تغذیه";
    }, [title]);

    return (
        <div className="flex min-h-screen w-full" {...rest}>
            <div className="w-full">
                <div
                    className="grid grid-cols-7 w-full"
                >
                    <div className="col-span-1">
                        <DesktopSidebar/>
                    </div>
                    <div className="col-span-6">
                        <Header/>
                        <div className="food-image-cover absolute top-0 left-0 w-full z-0 h-[230px] "></div>
                        <div className="mt-[60px] z-10">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodReservationTheme;
