import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function MonthlyTrend({ data }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">
                Monthly Trend
            </h2>

            {data.length === 0 ? (
                <p className="text-slate-500">
                    No monthly data available.
                </p>
            ) : (
                <div className="h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="#10b981"
                                strokeWidth={3}
                            />

                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="#ef4444"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>
            )}

        </div>
    );
}

export default MonthlyTrend;