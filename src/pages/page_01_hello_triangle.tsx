import React, { FC } from "react"
import { DashboardLayout } from "../components/_layout/DashboardLayout"
import { HelloTriangle } from "../components/HelloTriangle"

export const HelloTrianglePage: FC = () => {
    return (
        <DashboardLayout>
            <HelloTriangle />
        </DashboardLayout>
    )
}
