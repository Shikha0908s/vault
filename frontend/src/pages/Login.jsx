import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            navigate("/dashboard");

        } catch (error) {
             console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-white mb-6">
                    Welcome Back!
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white outline-none focus:border-emerald-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white outline-none focus:border-emerald-500"
                    />

                    <button
                        className="w-full rounded-lg bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600 transition"
                    >
                        Login
                    </button>

                </form>

            </div>
        </div>
    );
}
export default Login;