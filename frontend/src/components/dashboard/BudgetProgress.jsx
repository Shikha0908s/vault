function BudgetProgress({ budgets }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">
                Budget Progress
            </h2>

            {budgets.length === 0 ? (
                <p className="text-slate-500">
                    No budgets found.
                </p>
            ) : (
                <div className="space-y-6">

                    {budgets.map((budget) => (

                        <div key={budget.id}>

                            <div className="flex justify-between mb-2">

                                <span className="font-medium">
                                    {budget.category}
                                </span>

                                <span className="text-sm text-slate-500">
                                    ₹{budget.spent} / ₹{budget.limit_amount}
                                </span>

                            </div>

                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        budget.is_over_budget
                                            ? "bg-red-500"
                                            : "bg-emerald-500"
                                    }`}
                                    style={{
                                        width: `${Math.min(budget.progress, 100)}%`,
                                    }}
                                />

                            </div>

                            <div className="flex justify-between mt-2 text-sm">

                                <span className="text-slate-500">
                                    {budget.progress}%
                                </span>

                                <span
                                    className={
                                        budget.is_over_budget
                                            ? "text-red-500 font-medium"
                                            : "text-emerald-600 font-medium"
                                    }
                                >
                                    ₹{budget.remaining} left
                                </span>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default BudgetProgress;