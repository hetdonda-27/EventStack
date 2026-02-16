import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Resetting password...");

    try {
      const res = await fetch(`http://localhost:3001/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Password reset successful!");
        setTimeout(() => {
          setStatus("");
          navigate("/login");
        }, 2000);
      } else {
        setStatus(`❌ Failed: ${data.error}`);
      }
    } catch (err) {
      setStatus("❌ Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg transition-all"
            disabled={status === "Resetting password..."}
          >
            Reset Password
          </button>
        </form>
        {status && <p className="mt-4 text-white">{status}</p>}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-indigo-100 underline hover:text-white"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}