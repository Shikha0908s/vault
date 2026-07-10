import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Login from "../pages/Login";
import Budgets from "../pages/Budgets";
import Analytics from "../pages/Analytics";
import Goals from "../pages/Goals";
import Settings from "../pages/Settings";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
            </Routes>
            <Routes>
        <Route
            path="/"
            element={<Login />}
        />

        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

        <Route
            path="/transactions"
            element={<Transactions />}
        />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/settings" element={<Settings />} />
    </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;