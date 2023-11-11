import React, { FC } from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import { WelcomePage } from "./welcome"

export const AppRoutes: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
            </Routes>
        </HashRouter>
    )
}
