import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Wallet, TrendingUp } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", { email, password });
      const loggedInUser = login(data);
      navigate(loggedInUser.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Unable to log in");
      } else {
        setError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Side - Dark Navy Blue Branding with Curve */}
      <div className="relative hidden w-[45%] flex-col items-center justify-center bg-[#0B132B] p-10 md:flex overflow-hidden">
        {/* Background Curve Design (Reference Image jaisa) */}
        <div className="absolute -bottom-32 -left-32 h-[450px] w-[450px] rounded-full bg-[#152246]"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Wallet Icon Box */}
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#6D5DFB] to-[#4F46E5] shadow-xl shadow-indigo-900/40">
            <Wallet className="h-14 w-14 text-white" strokeWidth={1.5} />
          </div>

          {/* SpendWise Title - Forced White Color */}
          <h1
            className="mt-8 text-[42px] font-bold tracking-wide"
            style={{ color: "#ffffff" }}
          >
            SpendWise
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-center text-[18px] font-medium leading-relaxed text-gray-300">
            Track Your Money,
            <br />
            Control Your Future.
          </p>

          {/* Custom Chart Graphic */}
          <div className="mt-24 flex items-end gap-2">
            <div className="h-8 w-4 rounded-sm bg-[#4F46E5]"></div>
            <div className="h-12 w-4 rounded-sm bg-[#4F46E5]"></div>
            <div className="h-16 w-4 rounded-sm bg-[#4F46E5]"></div>
            <div className="relative ml-2 flex h-16 items-end">
              <TrendingUp
                className="h-16 w-16 text-[#4F46E5]"
                strokeWidth={3}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - White Form Area */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-[420px]">
          {/* Welcome Back Title - Reference Image Match */}
          <h2
            className="text-[34px] font-bold tracking-tight"
            style={{ color: "#0F172A" }}
          >
            Welcome Back
          </h2>

          {/* Sub Heading */}
          <p
            className="mt-2 text-[15px] font-medium"
            style={{ color: "#64748B" }}
          >
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="Email Address"
                className="h-[56px] pl-12 text-[15px] rounded-xl border-gray-200 bg-white focus-visible:ring-[#4F46E5]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="h-[56px] pl-12 text-[15px] rounded-xl border-gray-200 bg-white focus-visible:ring-[#4F46E5]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-[56px] w-full rounded-xl bg-[#5C4EE5] text-[16px] font-semibold text-white hover:bg-[#4b3ec4] transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Footer Link */}
          <p
            className="mt-8 text-center text-[15px]"
            style={{ color: "#475569" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#5C4EE5] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
