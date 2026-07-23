import { FiEdit2, FiTrash2 } from "react-icons/fi";

function BudgetCard({ budget, onEdit, onDelete }) {
    return (

        <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-semibold">
                        {budget.category}
                    </h2>

                    <p className="text-slate-500 mt-1">
                        {budget.month}/{budget.year}
                    </p>

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() => onEdit(budget)}
                        className="p-2 rounded-lg hover:bg-slate-100"
                    >
                        <FiEdit2 size={18} />
                    </button>

                    <button
                        onClick={() => onDelete(budget.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-500"
                    >
                        <FiTrash2 size={18} />
                    </button>

                </div>

            </div>

            <div className="mt-6">

                <div className="flex justify-between">

                    <p className="text-slate-500">
                        Spent
                    </p>

                    <p className="font-semibold">
                        ₹{budget.spent}
                    </p>

                </div>

                <div className="flex justify-between mt-2">

                    <p className="text-slate-500">
                        Budget
                    </p>

                    <p className="font-semibold">
                        ₹{budget.limit_amount}
                    </p>

                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full mt-6">

                    <div
                        className={`h-3 rounded-full transition-all ${
                            budget.is_over_budget
                                ? "bg-red-500"
                                : "bg-emerald-500"
                        }`}
                        style={{
                            width: `${Math.min(budget.progress, 100)}%`,
                        }}
                    />

                </div>

                <div className="flex justify-between mt-3">

                    <span className="text-sm text-slate-500">
                        {budget.progress}%
                    </span>

                    <span
                        className={`text-sm font-semibold ${
                            budget.is_over_budget
                                ? "text-red-500"
                                : "text-emerald-600"
                        }`}
                    >
                        {budget.is_over_budget
                            ? `Over by ₹${Math.abs(budget.remaining)}`
                            : `Remaining ₹${budget.remaining}`}
                    </span>

                </div>

            </div>

        </div>

    );

}

export default BudgetCard;