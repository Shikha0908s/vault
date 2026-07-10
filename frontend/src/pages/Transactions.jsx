import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TransactionTable from "../components/transactions/TransactionTable";
import api from "../services/api";

function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const response = await api.get("/transactions/");
            setTransactions(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="min-h-screen bg-[#eef3eb] p-6">

            <div className="flex gap-6 h-[calc(100vh-48px)]">

                <Sidebar />

                <main className="flex-1 rounded-3xl bg-[#f8f9f5] shadow-sm p-8">

                    <div className="flex items-center justify-between mb-8">

                        <h1 className="text-4xl font-bold">
                            Transactions
                        </h1>

                        <button className="bg-emerald-500 text-white px-5 py-3 rounded-xl hover:bg-emerald-600 transition">
                            + Add Transaction
                        </button>

                    </div>
                    <div className="mt-8">
                        <TransactionTable
                            transactions={transactions}
                        />
                    </div>

                </main>

            </div>

        </div>
    );
}

export default Transactions;