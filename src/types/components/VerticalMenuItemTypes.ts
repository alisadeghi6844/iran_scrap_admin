export interface VerticalMenuItemTypes extends React.HTMLProps<HTMLElement> {
    children?: React.ReactNode,
    className?: string,
    collapsable?: boolean,
    link?: string,
    title?: string,
    isNew?: boolean,
    notif?: string,
    isClose?: boolean,
    icon?: any,
    role?:any,
    sidebarStatus?: any,
}
