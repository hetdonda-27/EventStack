  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";

  export default function LoginForm() {
    const [status, setStatus] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Logging in...");
      try {
        const res = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("role", data.role);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          window.dispatchEvent(new Event("storage"));

          setStatus("Login Successful!");
          setTimeout(() => {
            setStatus("Login");
            if (data.role === "admin") {
              navigate("/myevent");
            } else {
              navigate("/home");
            }
          }, 1500);
        } else {
          setStatus(`Failed: ${data.error}`);
        }
      } catch (err) {
        setStatus("Error!");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
            <p className="text-white/80">Welcome back! Please login to continue.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-slide-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
              />
              <button
                type="submit"
                className={`w-full ${
                  status === "Login Successful!" ? "bg-green-500 text-white" : "bg-white text-purple-600"
                } font-semibold py-3 rounded-lg`}
                disabled={status === "Logging in..."}
              >
                {status}
              </button>
            </form>
            <div className="mt-6 text-center">
              <span className="text-white/80">Don't have an account?</span>
              <button
                className="ml-2 text-indigo-100 underline hover:text-white"
                onClick={() => navigate("/register")}
                type="button"
              >
                Register
              </button>
            </div>
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-indigo-100 underline hover:text-white"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }