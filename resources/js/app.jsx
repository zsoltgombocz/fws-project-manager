import '../css/app.css'

import ReactDOM from 'react-dom/client';
import Home from './frontend/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
    <Routes>
      {/* place routes here for react router */}
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
  </BrowserRouter>
);
