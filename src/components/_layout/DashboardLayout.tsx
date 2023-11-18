import React, { FC, PropsWithChildren } from "react"

import { NavSidebar } from "./NavSidebar"

export const DashboardLayout: FC<PropsWithChildren> = (props) => {
    return (
        <div className="nav-layout">
            <NavSidebar />
            <div className="nav-content">{props.children}</div>
        </div>
    )
}
