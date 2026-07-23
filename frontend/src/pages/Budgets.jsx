import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import BudgetCard from "../components/budgets/BudgetCard";
import AddBudgetModal from "../components/budgets/AddBudgetModal";
import api from "../services/api";

function Budgets() {

    const [budgets, setBudgets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);

    const fetchBudgets = async () => {
        try {
            const response = await api.get("/budgets/");
            setBudgets(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const editBudget = (budget) => {
        setSelectedBudget(budget);
        setShowModal(true);
    };

    const deleteBudget = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this budget?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/budgets/${id}/`);
            fetchBudgets();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    

    return (
        <div className="min-h-screen bg-[#eef3eb] p-6">

            <div className="flex gap-6 h-[calc(100vh-48px)]">

                <Sidebar />

                <main className="flex-1 rounded-3xl bg-[#f8f9f5] shadow-sm p-8">

                    <div className="flex items-center justify-between mb-10">

                        <h1 className="text-4xl font-bold">
                            Budgets
                        </h1>

                        <button 
                        onClick={() => {
                            setSelectedBudget(null);
                            setShowModal(true);
                        }}
                        className="bg-emerald-500 text-white px-5 py-3 rounded-xl hover:bg-emerald-600 transition">
                            + Add Budget
                        </button>

                    </div>
                    <div className="grid grid-cols-3 gap-6">

                        {budgets.map((budget) => (

                            <BudgetCard
                                key={budget.id}
                                budget={budget}
                                onEdit={editBudget}
                                onDelete={deleteBudget}
                            />

                        ))}

                    </div>

                </main>

            </div>
            <AddBudgetModal
                isOpen={showModal}
                budget={selectedBudget}
                onClose={() => {
                    setShowModal(false);
                    setSelectedBudget(null);
                }}
                onBudgetAdded={() => {
                    fetchBudgets();
                    setShowModal(false);
                    setSelectedBudget(null);
                }}
            />
        </div>
    );
}

export default Budgets;