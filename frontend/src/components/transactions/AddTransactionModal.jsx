import { useEffect, useState } from "react";
import api from "../../services/api";

function AddTransactionModal({ isOpen, onClose, onTransactionAdded,transaction }) {

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        description: "",
        transaction_date: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {

        if (transaction) {

            setFormData({
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                description: transaction.description,
                transaction_date: transaction.transaction_date,
            });

        } else {

            setFormData({
                title: "",
                amount: "",
                type: "expense",
                category: "",
                description: "",
                transaction_date: "",
            });

        }

    }, [transaction]);

    if (!isOpen) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (transaction) {
                await api.put(`/transactions/${transaction.id}/`, formData);
            } else {
                await api.post("/transactions/", formData);
            }
            setFormData({
            title: "",
            amount: "",
            type: "expense",
            category: "",
            description: "",
            transaction_date: "",
        });
            onTransactionAdded();

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-full max-w-2xl p-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        {transaction ? "Edit Transaction" : "Add Transaction"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-400 hover:text-slate-600"
                    >
                        ×
                    </button>

                </div>

                <form className="space-y-5"
                    onSubmit={handleSubmit}>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Salary, Grocery..."
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Amount
                        </label>

                        <input
                            type="number"
                            name="amount"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={handleChange}                            
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Type
                            </label>

                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                placeholder="Food"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            rows="3"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Optional"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Date
                        </label>

                        <input
                            type="date"
                            name="transaction_date"
                            value={formData.transaction_date}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                        />

                    </div>

                    <div className="flex justify-end gap-4 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl border border-slate-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
                        >
                            {transaction ? "Update Transaction" : "Save Transaction"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddTransactionModal;