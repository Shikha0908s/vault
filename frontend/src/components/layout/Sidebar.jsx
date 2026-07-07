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
    { name: "Dashboard", icon: <FiGrid /> },
    { name: "Transactions", icon: <FiCreditCard /> },
    { name: "Budgets", icon: <FiPieChart /> },
    { name: "Analytics", icon: <FiBarChart2 /> },
    { name: "Goals", icon: <FiTarget /> },
    { name: "Settings", icon: <FiSettings /> },
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
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                        ${
                            item.name === "Dashboard"
                                ? "bg-emerald-100 text-emerald-700 font-semibold"
                                : "hover:bg-slate-100 text-slate-600"
                        }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {item.name}
                    </button>
                ))}
            </nav>

            {/* Bottom Profile */}
            <div className="border-t pt-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold">Shikha</p>
                        <p className="text-sm text-slate-500">
                            Welcome back 👋
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