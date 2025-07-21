import { useState } from 'react';
import {Link,NavLink, useNavigate} from 'react-router-dom'
import "./SigIn.css";
const backend_host = import.meta.env.VITE_BACKEND_HOST

function SignIn(){
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        username: "",   
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setForm({ username: "", email: "", password: "" });
        setError("");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const endpoint = isLogin ? "/api/v1/users/login" : "/api/v1/users/register";
        const payload = isLogin? { email: form.email, password: form.password } : form;

        try {
            const res = await fetch(`${backend_host}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",  
                body: JSON.stringify(payload),
            });

            const {data,message} = await res.json();

            if (!res.ok) throw new Error(message || "Something went wrong"); 

            if (isLogin) {
                navigate("/");
            } else {
                alert("Account created successfully. Please login.");
                toggleForm();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth">
            <section className="size-full glassmorphism flex-center px-6">
                <header className="fixed top-5 left-5 z-50 flex items-center gap-3 px-4 py-2">
                    <Link to='/'>
                        <img src="/img/logo.png" alt="logo" className='w-12 h-12z object-contain' />
                    </Link>
                    <h1 className='text-4xl font-bold text-gray-200'>Wander Wise</h1>
                </header>

                <div className="overflow-hidden absolute-center">
                <div className={`auth-container ${!isLogin ? "active" : ""}`}>
                    <div className="form-box login overflow-hidden">
                    {isLogin && (
                        <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            />
                            <i className="bx bxs-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            />
                            <i className="bx bxs-lock-alt"></i>
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? "Please wait..." : "Login"}
                        </button>
                        </form>
                    )}
                    </div>

                    <div className="form-box register">
                    {!isLogin && (
                        <form onSubmit={handleSubmit}>
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className="input-box">
                            <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            />
                            <i className="bx bxs-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            />
                            <i className="bx bxs-lock-alt"></i>
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? "Please wait..." : "Register"}
                        </button>
                        </form>
                    )}
                    </div>

                    <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button className="btn register-btn" onClick={() => setIsLogin(false)}>
                        Register
                        </button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="btn login-btn" onClick={() => setIsLogin(true)}>
                        Login
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </main>
    );
}

export default SignIn