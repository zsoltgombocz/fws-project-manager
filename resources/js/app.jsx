import '../css/app.css'

import ReactDOM from 'react-dom/client';
import Home from './frontend/Home';
import { Route, Routes } from "react-router-dom";
import MainLayout from './frontend/layout/MainLayout';

ReactDOM.createRoot(document.getElementById('app')).render(
    <MainLayout>
        <Routes>
            <Route
                path="/"
                element={
                <Home />
                }
            />
            <Route
                path="*"
                element={
                <div>Not found</div>
                }
            />
        </Routes>
    </MainLayout>
);
