'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LogIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDemoLogin = async () => {
    setForm({
      email: "shishir@sakib.com",
      password: "123asD"
    });
    
    setLoading(true);
    toast.loading("Logging in with demo account...", { id: "login" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "demo@expensetracker.com",
          password: "demopassword123"
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Demo login successful!", { id: "login" });
        window.location.href = "/";
      } else {
        toast.error(data.message || "Demo login failed", { id: "login" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during demo login", { id: "login" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Please fill all fields");

    setLoading(true);
    toast.loading("Logging in...", { id: "login" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", 
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!", { id: "login" });
        window.location.href = "/";
        setForm({ email: "", password: "" });
      } else {
        toast.error(data.message || "Login failed", { id: "login" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error", { id: "login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="glass-container p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Login
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg glass-container border bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                required
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg glass-container border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50"
                required
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg border border-white/20 text-white hover:bg-white/20 cursor-pointer transition-colors font-medium ${
                loading 
                  ? "bg-white/20 cursor-not-allowed flex items-center justify-center"
                  : "bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:bg-white/20 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : "Login"}
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="flex-shrink mx-4 text-white/50 text-sm">OR</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-100 hover:bg-amber-500/20 transition-colors font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Try Demo Account
            </button>
          </form>
          
          <p className="mt-4 text-center text-sm text-white/70">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-300 hover:text-blue-200 transition-colors">
              Register
            </a>
          </p>
        </div>
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }
        }}
      />

      <style jsx global>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: white;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

export default LogIn;