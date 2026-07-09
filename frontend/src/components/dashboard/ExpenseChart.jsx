import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
];

function ExpenseChart({ data }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">
                Expense Breakdown
            </h2>

            {data.length === 0 ? (
                <p className="text-slate-500">
                    No expense data available.
                </p>
            ) : (
                <div className="h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="total"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>
            )}

        </div>
    );
}

export default ExpenseChart;