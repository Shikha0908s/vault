function RecentTransactions({ transactions }) {

    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-semibold">
                    Recent Transactions
                </h2>

                <button className="text-emerald-600 text-sm font-medium hover:underline">
                    View All
                </button>

            </div>

            <div className="space-y-4">

                {transactions.length === 0 ? (
                    <p className="text-slate-500">
                        No recent transactions.
                    </p>
                ) : (
                    transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between border-b border-slate-100 pb-4"
                        >

                            <div>

                                <h3 className="font-medium text-slate-800">
                                    {transaction.title}
                                </h3>

                                <p className="text-sm text-slate-500">
                                    {transaction.category}
                                </p>

                            </div>

                            <div
                                className={`font-semibold ${
                                    transaction.type === "income"
                                        ? "text-emerald-600"
                                        : "text-red-500"
                                }`}
                            >
                                {transaction.type === "income" ? "+" : "-"}₹
                                {transaction.amount}
                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default RecentTransactions;