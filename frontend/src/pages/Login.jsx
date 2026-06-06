import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">Welcome Back</h2>
            <p className="text-gray-500">Log in to your HeartLink account</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-sm text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-white/50 border border-purple-100 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-6 py-4 bg-white/50 border border-purple-100 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full mt-8 bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-8 text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 font-bold hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
