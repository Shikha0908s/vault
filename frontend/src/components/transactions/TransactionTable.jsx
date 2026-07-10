import { FiEdit2, FiTrash2 } from "react-icons/fi";
function TransactionTable({ transactions }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            <table className="w-full">

                <thead className="hover:bg-slate-50">

                    <tr>

                        <th className="text-left px-6 py-4">Title</th>
                        <th className="text-left px-6 py-4">Category</th>
                        <th className="text-left px-6 py-4">Date</th>
                        <th className="text-left px-6 py-4">Type</th>
                        <th className="px-8 py-4 text-right">Amount</th>
                        <th className="text-center px-6 py-4">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {transactions.map((transaction) => (

                        <tr
                            key={transaction.id}
                            className="border-t hover:bg-slate-50"
                        >

                            <td className="px-6 py-4">
                                {transaction.title}
                            </td>

                            <td className="px-6 py-4">

                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">

                                    {transaction.category}

                                </span>

                            </td>

                            <td className="px-6 py-4">
                                {new Date(transaction.transaction_date).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </td>

                            <td className="px-6 py-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        transaction.type === "income"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                </span>

                            </td>

                            <td
                                className={`px-6 py-4 text-right font-semibold ${
                                    transaction.type === "income"
                                        ? "text-green-600"
                                        : "text-red-500"
                                }`}
                            >
                                {transaction.type === "income" ? "+" : "-"}₹
                                {transaction.amount}
                            </td>

                            <td className="px-6 py-4 text-center">

                                <div className="flex justify-center gap-2">

                                    <button
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 transition"
                                        title="Edit"
                                    >
                                        <FiEdit2 size={16} />
                                    </button>

                                    <button
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 transition"
                                        title="Delete"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TransactionTable;