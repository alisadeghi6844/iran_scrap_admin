import React from "react";
import { DynamicMenuTypes } from "../../../types/components/DynamicMenuTypes";
import VerticalMenu from "./VerticalMenu";
import VerticalMenuItem from "./VerticalMenuItem";

interface MenuItem {
    id: string | number;
    title: string;
    isNew?: boolean;
    notif?: string;
    icon?: string;
    path?: string;
    subRoutes?: MenuItem[];
}

interface MenuGroup {
    id: string | number;
    menuTitle: string;
    menus: MenuItem[];
}

const DynamicMenu: React.FC<DynamicMenuTypes> = ({ data, liClassName }) => {
    const renderMenuItems = (items: MenuItem[]) => {
        return items.map((menu) => (
            <VerticalMenuItem
                className={liClassName}
                key={menu.id}
                title={menu.title}
                isNew={menu.isNew}
                notif={menu.notif}
                icon={menu.icon}
                role={menu.role}
                link={menu.subRoutes?.length ? undefined : menu.path}
            >
                {menu.subRoutes?.length ? renderMenuItems(menu.subRoutes) : null}
            </VerticalMenuItem>
        ));
    };

    return (
        <>
            {data.map((group: MenuGroup) => (
                <VerticalMenu key={group.id} title={group.menuTitle} role={group.role}>
                    {renderMenuItems(group.menus)}
                </VerticalMenu>
            ))}
        </>
    );
};

export default DynamicMenu;
