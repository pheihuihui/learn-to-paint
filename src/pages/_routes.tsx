import React, { FC } from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import { WelcomePage } from "./welcome"
import { HelloTrianglePage } from "./page_01_hello_triangle"

export const AppRoutes: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="hello-triangle" element={<HelloTrianglePage />} />
            </Routes>
        </HashRouter>
    )
}
