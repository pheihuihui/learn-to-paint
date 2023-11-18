import { SideNavigation } from "./SideNavigation"
import { useNavigate, useLocation } from "react-router-dom"
import React, { FC, useState } from "react"

export const NavSidebar: FC = () => {
    const history = useNavigate()
    const location = useLocation()

    return (
        <div className="side-bar">
            <div className="">
                <span className="">Learn to Paint</span>
            </div>

            <SideNavigation
                activeItemId={location.pathname}
                onSelect={({ itemId }) => {
                    history(itemId)
                }}
                items={[
                    { title: "Home", itemId: "/" },
                    { title: "Hello Triangle", itemId: "/hello-triangle" },
                    { title: "Notes2", itemId: "/notes2" },
                    { title: "Notes3", itemId: "/notes3" },
                    { title: "Notes4", itemId: "/notes4" },
                ]}
            />
        </div>
    )
}
