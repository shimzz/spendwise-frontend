import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Wallet, TrendingUp, User } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Auto login after register (saves token and user in context)
      login(data);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Unable to register");
      } else {
        setError("Something went wrong, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left side: branding (same as Login) */}
      <div className="relative hidden w-[45%] flex-col items-center justify-center overflow-hidden bg-[#0B132B] p-10 md:flex">
        <div className="absolute -bottom-32 -left-32 h-[450px] w-[450px] rounded-full bg-[#152246]"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#6D5DFB] to-[#4F46E5] shadow-xl shadow-indigo-900/40">
            <Wallet className="h-14 w-14 text-white" strokeWidth={1.5} />
          </div>

          <h1
            className="mt-8 text-[42px] font-bold tracking-wide"
            style={{ color: "#ffffff" }}
          >
            SpendWise
          </h1>

          <p className="mt-4 text-center text-[18px] font-medium leading-relaxed text-gray-300">
            Track Your Money,
            <br />
            Control Your Future.
          </p>

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

      {/* Right side: form */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-[420px]">
          <h2
            className="text-[34px] font-bold tracking-tight"
            style={{ color: "#0F172A" }}
          >
            Create an Account
          </h2>

          <p
            className="mt-2 text-[15px] font-medium"
            style={{ color: "#64748B" }}
          >
            Join SpendWise and start tracking
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Full Name"
                className="h-[56px] rounded-xl border-gray-200 bg-white pl-12 text-[15px] focus-visible:ring-[#4F46E5]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="Email Address"
                className="h-[56px] rounded-xl border-gray-200 bg-white pl-12 text-[15px] focus-visible:ring-[#4F46E5]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="h-[56px] rounded-xl border-gray-200 bg-white pl-12 text-[15px] focus-visible:ring-[#4F46E5]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-[56px] w-full rounded-xl bg-[#5C4EE5] text-[16px] font-semibold text-white transition-all hover:bg-[#4b3ec4]"
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>

          <p
            className="mt-8 text-center text-[15px]"
            style={{ color: "#475569" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#5C4EE5] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
