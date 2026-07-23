import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TransactionTable from "../components/transactions/TransactionTable";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import api from "../services/api";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const fetchTransactions = async () => {
        try {
            const response = await api.get("/transactions/");
            setTransactions(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const deleteTransaction = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/transactions/${id}/`);

            fetchTransactions();

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };
    const editTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);
    const categories = ["all",
            ...new Set(transactions.map((transaction) => transaction.category)
        ),
        ];

    const filteredTransactions = transactions.filter((transaction) => {

        const matchesSearch =
            transaction.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesType =
            typeFilter === "all" ||
            transaction.type === typeFilter;

        const matchesCategory =
            categoryFilter === "all" ||
            transaction.category === categoryFilter;

        return (
            matchesSearch &&
            matchesType &&
            matchesCategory
        );

    });
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {

        switch (sortBy) {

            case "oldest":
                return new Date(a.transaction_date) - new Date(b.transaction_date);

            case "highest":
                return Number(b.amount) - Number(a.amount);

            case "lowest":
                return Number(a.amount) - Number(b.amount);

            default:
                return new Date(b.transaction_date) - new Date(a.transaction_date);
        }

    });

    return (
        <div className="min-h-screen bg-[#eef3eb] p-6">

            <div className="flex gap-6 h-[calc(100vh-48px)]">

                <Sidebar />

                <main className="flex-1 rounded-3xl bg-[#f8f9f5] shadow-sm p-8">

                    <div className="flex items-center justify-between mb-8">

                        <h1 className="text-4xl font-bold">
                            Transactions
                        </h1>

                        <div className="flex items-center gap-4">

                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded-xl border border-slate-200 px-4 py-3 w-72 outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="all">All</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>

                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category === "all"
                                            ? "All Categories"
                                            : category}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="highest">Highest Amount</option>
                                <option value="lowest">Lowest Amount</option>
                            </select>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-emerald-500 text-white px-5 py-3 rounded-xl hover:bg-emerald-600 transition"
                            >
                                + Add Transaction
                            </button>

                        </div>

                    </div>

                    <div className="mt-8">
                        <TransactionTable
                            transactions={sortedTransactions}
                            onDelete={deleteTransaction}
                            onEdit={editTransaction}
                        />
                    </div>

                </main>

            </div>

                <AddTransactionModal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedTransaction(null);
                    }}
                    transaction={selectedTransaction}
                    onTransactionAdded={() => {
                        fetchTransactions();
                        setShowModal(false);
                        setSelectedTransaction(null);
                    }}
                />

        </div>
    );
}

export default Transactions;