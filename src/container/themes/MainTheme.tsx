import React, {useEffect} from "react";
import {AdminThemeTypes} from "../../types/organism/AdminThemeTypes";
import Header from "../organism/Header";
import DesktopSidebar from "../features/sideBar/DesktopSidebar";

const MainTheme: React.FC<AdminThemeTypes> = (props) => {
    const {children, title, crumb, ...rest} = props;

    useEffect(() => {
        document.title = title ?? "مدیریت حضور و غیاب کارکنان";
    }, [title]);

    return (
        <div className="flex min-h-screen w-full" {...rest}>
            {/* <PageHeader /> */}
            <div>

                {/*<MobileSidebar sidebarstatus={sidebarstatus} />*/}
            </div>
            <div className="w-full">
                {/*<AdminHeader crumb={crumb} title={title} />*/}
                <div
                    className="grid grid-cols-7 w-full"
                >
                    <div className="col-span-1">
                        <DesktopSidebar/>
                    </div>
                    <div className="col-span-6">
                        <Header/>
                        <div className="mt-[85px]">
                        {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainTheme;
