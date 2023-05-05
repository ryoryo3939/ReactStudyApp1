import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from "./page/HomePage"


const RouterConfig: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* 他のルートをここに追加 */}
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig