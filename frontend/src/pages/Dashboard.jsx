import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import api from "../services/api";

function Dashboard() {
    const [summary, setSummary] = useState(null);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/dashboard/");
            setSummary(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!summary) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#eef3eb]">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#eef3eb] p-6">

            <div className="flex gap-6 h-[calc(100vh-48px)]">

                <Sidebar />

                <main className="flex-1 rounded-3xl bg-[#f8f9f5] shadow-sm p-8">

                    <h1 className="text-4xl font-bold">
                        Good Morning, Shikha.
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Here's what's happening with your finances today.
                    </p>

                    <div className="grid grid-cols-4 gap-6 mt-10">

                        <SummaryCard
                            type="balance"
                            title="Balance"
                            value={`₹ ${summary.balance}`}
                        />

                        <SummaryCard
                            type="income"
                            title="Income"
                            value={`₹ ${summary.total_income}`}
                        />

                        <SummaryCard
                            type="expense"
                            title="Expense"
                            value={`₹ ${summary.total_expense}`}
                        />

                        <SummaryCard
                            type="transactions"
                            title="Transactions"
                            value={summary.transaction_count}
                        />

                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-8">

                        <div className="col-span-2">

                            <RecentTransactions
                                transactions={summary.recent_transactions}
                            />

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Dashboard;