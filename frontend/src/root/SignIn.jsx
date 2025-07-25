import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const backend_host = import.meta.env.VITE_BACKEND_HOST;

function SignIn() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setForm({ username: "", email: "", password: "" });
        setError("");
    };

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const endpoint = isLogin ? "/api/v1/users/login" : "/api/v1/users/register";
        const payload = isLogin ? { email: form.email, password: form.password } : form;

        try {
            const res = await fetch(`${backend_host}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
        });

        if (res.headers.get("content-type")?.includes("application/json")) {
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Something went wrong");
        } else {
            throw new Error("Unexpected server response");
        }


        if (isLogin) navigate("/");
        else {
            alert("Account created successfully. Please login.");
            toggleForm();
        }
        } catch (err) {
            setError(err.message);
            console.error("Auth error:", err); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-screen w-screen flex bg-[#050f10] gap-2 overflow-hidden">
            {/* Left Side Panel */}
            <div className="w-full md:w-3/7 bg-[#050f10] text-white px-8 md:px-16 py-10 flex flex-col justify-between rounded-2xl mt-4 ml-4 mb-4">
                <div>
                    <h2 className="text-3xl text-center font-bold mb-2 transition-transform duration-300 hover:scale-105">
                        {isLogin ? "Welcome back!" : "Sign up!"}
                    </h2>

                    <p className="text-gray-400 mb-6 text-center">
                        {isLogin
                        ? "Login to your account to explore"
                        : "Create an account to begin your journey"}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full bg-zinc-800 p-3 rounded"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full bg-zinc-800 p-3 rounded"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-zinc-800 p-3 rounded"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold"
                            disabled={loading}
                        >
                        {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
                        </button>
                        <div className="flex items-center gap-2 my-6 text-gray-500 text-sm">
                            <hr className="flex-1 border-gray-700" />
                                OR
                            <hr className="flex-1 border-gray-700" />
                        </div>
                        
                        <div className="space-y-3">
                            <button
                            type="submit"
                                className="w-full bg-zinc-700 hover:bg-zinc-800 p-3 rounded text-center text-white font-medium"
                                onClick={() => {
                                setForm({
                                    email: "guest@example.com",
                                    password: "guest1234"
                                });
                                setIsLogin(true);
                                }}
                            >
                                Continue as Guest
                            </button>
                            {isLogin && (
                            <button
                                className="w-full bg-zinc-700 hover:bg-zinc-800 p-3 rounded text-center text-white font-medium"
                                onClick={() => navigate("/")}
                            >
                                Browse Popular Destinations
                            </button>
                            )}
                        </div>
                    </form>

                    
                    <p className="text-sm text-gray-500 italic mt-8 text-center">
                        "Travel is the only thing you buy that makes you richer."
                    </p>
                </div>

                <div className="text-sm mt-6">
                    <p className="text-gray-400">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={toggleForm} className="text-blue-400 ml-2 underline">
                        {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                    <div className="mt-4 flex justify-between text-xs text-gray-600">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Twitter</span>
                        <span>Discord</span>
                    </div>
                </div>
            </div>

            {/* Right Illustration Panel */}
            <div className="hidden md:block w-full bg-auth bg-cover mt-4 mb-4 mr-4 rounded-2xl">
                <div className="absolute top-6 z-10 right-5 flex items-center gap-3 mb-8 text-gray-50">
                    <h1 className="text-3xl font-bold">Wander Wise</h1>
                    <Link to="/">
                        <img src="/img/logo3.png" alt="logo" className="w-10 h-10 rounded-full invert" />
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
