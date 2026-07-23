import { useEffect, useState } from "react";
import api from "../../services/api";

function AddBudgetModal({
    isOpen,
    onClose,
    onBudgetAdded,
    budget,
}) {

    const [formData, setFormData] = useState({
        category: "",
        limit_amount: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    
    useEffect(() => {

        if (budget) {

            setFormData({
                category: budget.category,
                limit_amount: budget.limit_amount,
                month: budget.month,
                year: budget.year,
            });

        } else {

            setFormData({
                category: "",
                limit_amount: "",
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
            });

        }

    }, [budget]);
    if (!isOpen) return null;

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

        try {

            if (budget) {
                await api.put(`/budgets/${budget.id}/`, formData);
            } else {
                await api.post("/budgets/", formData);
            }

            setFormData({
                category: "",
                limit_amount: "",
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
            });

            onBudgetAdded();

        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-full max-w-xl p-8">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-2xl font-bold">
                        {budget ? "Edit Budget" : "Add Budget"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-slate-400 hover:text-slate-600"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Food"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Budget Limit
                        </label>

                        <input
                            type="number"
                            name="limit_amount"
                            value={formData.limit_amount}
                            onChange={handleChange}
                            placeholder="5000"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Month
                            </label>

                            <input
                                type="number"
                                name="month"
                                min="1"
                                max="12"
                                value={formData.month}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Year
                            </label>

                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            />

                        </div>

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
                            {budget ? "Update Budget" : "Save Budget"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddBudgetModal;