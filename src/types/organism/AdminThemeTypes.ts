import React from "react";

export interface AdminThemeTypes extends React.HTMLProps<HTMLElement> {
    children?: React.ReactNode,
    title?: string,
    crumb?: any
}
