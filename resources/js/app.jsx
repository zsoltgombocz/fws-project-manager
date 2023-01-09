import '../css/app.css'

import ReactDOM from 'react-dom/client';
import Home from './frontend/pages/Home';
import { Route, Routes } from "react-router-dom";
import MainLayout from './frontend/layout/MainLayout';
import Edit from './frontend/pages/Edit';
import Create from './frontend/pages/Create';

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
                path="/edit/:id"
                element={
                    <Edit />
                }
            />
            <Route
                path="/create/"
                element={
                    <Create />
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
