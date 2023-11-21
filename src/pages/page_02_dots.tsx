import React, { FC } from "react"
import { DashboardLayout } from "../components/_layout/DashboardLayout"
import { Dots } from "../components/Dots"

export const DotsPage: FC = () => {
    return (
        <DashboardLayout>
            <Dots />
        </DashboardLayout>
    )
}
