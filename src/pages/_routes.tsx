import React, { FC } from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import { WelcomePage } from "./welcome"
import { HelloTrianglePage } from "./page_01_hello_triangle"
import { DotsPage } from "./page_02_dots"

export const AppRoutes: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="hello-triangle" element={<HelloTrianglePage />} />
                <Route path="dots" element={<DotsPage />} />
            </Routes>
        </HashRouter>
    )
}
