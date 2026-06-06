import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FloatingHearts from "./components/FloatingHearts.jsx";
import { motion } from "framer-motion";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#fdf2f8]">
      {/* Cinematic Moving Spheres - Glassmorphism Base */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-100, 100, -100],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [100, -100, 100],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-200/40 to-teal-200/40 blur-[100px]"
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen relative font-sans selection:bg-purple-200 selection:text-white">
        <AnimatedBackground />
        <FloatingHearts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
