import { NavLink } from "react-router-dom";
import {
    FiGrid,
    FiCreditCard,
    FiPieChart,
    FiBarChart2,
    FiTarget,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";

const menuItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FiGrid />,
    },
    {
        name: "Transactions",
        path: "/transactions",
        icon: <FiCreditCard />,
    },
    {
        name: "Budgets",
        path: "/budgets",
        icon: <FiPieChart />,
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: <FiBarChart2 />,
    },
    {
        name: "Goals",
        path: "/goals",
        icon: <FiTarget />,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: <FiSettings />,
    },
];

function Sidebar() {
    return (
        <aside className="w-64 bg-white rounded-3xl shadow-sm flex flex-col p-6">

            {/* Logo */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-emerald-600">
                    Vault
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                isActive
                                    ? "bg-emerald-100 text-emerald-700 font-semibold"
                                    : "text-slate-600 hover:bg-slate-100"
                            }`
                        }
                    >
                        <span className="text-xl">
                            {item.icon}
                        </span>

                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Profile */}
            <div className="border-t pt-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold">Shikha</p>
                        <p className="text-sm text-slate-500">
                            Welcome back!
                        </p>
                    </div>
                    <button className="text-red-500 text-xl">
                        <FiLogOut />
                    </button>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;