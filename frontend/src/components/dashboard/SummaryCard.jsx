import {
    FiTrendingUp,
    FiTrendingDown,
    FiDollarSign,
    FiCreditCard,
} from "react-icons/fi";

const icons = {
    balance: <FiDollarSign />,
    income: <FiTrendingUp />,
    expense: <FiTrendingDown />,
    transactions: <FiCreditCard />,
};

const colors = {
    balance: "bg-emerald-100 text-emerald-600",
    income: "bg-green-100 text-green-600",
    expense: "bg-red-100 text-red-600",
    transactions: "bg-blue-100 text-blue-600",
};

function SummaryCard({ type, title, value }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between items-start">

                <div>
                    <p className="text-slate-500 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-4 text-slate-800">
                        {value}
                    </h2>
                </div>

                <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${colors[type]}`}
                >
                    {icons[type]}
                </div>

            </div>

            <div className="mt-8 flex items-center justify-between">

                <span className="text-sm text-emerald-600 font-medium">
                    Live Data
                </span>

                <span className="text-xs text-slate-400">
                    Updated now
                </span>

            </div>

        </div>
    );
}

export default SummaryCard;