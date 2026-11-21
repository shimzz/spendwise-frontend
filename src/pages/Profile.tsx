import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  ShieldCheck,
  Camera,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { toast } from "sonner";

export default function Profile() {
  const { user, updateUser } = useAuth();

  // Profile States
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);
  const [isSuccessPass, setIsSuccessPass] = useState(false);
  const [errorField, setErrorField] = useState<"current" | "confirm" | null>(
    null,
  );

  // Image Upload Handler (Base64)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Image size should be less than 2MB");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile Save Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingProfile(true);
      const res = await api.put("/auth/profile", { name, avatar });
      updateUser(res.data); // Context update karein
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Password Change Handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorField(null);
    setIsSuccessPass(false);

    if (newPassword !== confirmPassword) {
      setErrorField("confirm");
      return toast.error("New passwords do not match!");
    }
    if (newPassword.length < 6) {
      setErrorField("confirm");
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      setLoadingPass(true);
      await api.put("/auth/change-password", { currentPassword, newPassword });
      setIsSuccessPass(true);
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setIsSuccessPass(false), 3000);
    } catch (error: any) {
      if (error.response?.data?.message.includes("Current password")) {
        setErrorField("current");
      }
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl space-y-8"
      >
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
          <h1 className="text-3xl font-extrabold text-[#0B1120] dark:text-white transition-colors">
            My Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium transition-colors">
            Manage your account information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Personal Information Form */}
          <form
            onSubmit={handleSaveProfile}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-8 relative overflow-hidden transition-colors h-fit"
          >
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
              Personal Information
            </h2>

            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="relative group">
                {/* Avatar Preview */}
                <div className="h-32 w-32 bg-gradient-to-br from-[#5C4EE5] to-[#8B5CF6] text-white rounded-full flex items-center justify-center text-5xl font-extrabold shadow-2xl shadow-indigo-500/30 overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Camera Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#5C4EE5] transition-colors"
                >
                  <Camera size={20} />
                </button>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user?.name || "User"}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {user?.email || "No email"}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-500/10 text-[#5C4EE5] dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-wide">
                  <ShieldCheck size={14} /> {user?.role || "user"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 pl-10 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="h-12 pl-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed transition-colors"
                  />
                </div>
              </div>

              {/* Save Changes Button */}
              <Button
                type="submit"
                disabled={isSavingProfile}
                className="w-full h-12 mt-4 rounded-xl bg-[#5C4EE5] hover:bg-[#4b3ec4] text-white font-bold shadow-lg shadow-indigo-500/20"
              >
                {isSavingProfile ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>

          {/* Right Side: Change Password */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-8 relative overflow-hidden h-fit transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl text-rose-500 dark:text-rose-400">
                <Lock size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Change Password
              </h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Current Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (errorField === "current") setErrorField(null);
                  }}
                  required
                  className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-800 transition-all duration-300
                    ${
                      errorField === "current"
                        ? "border-rose-500 dark:border-rose-500 focus-visible:ring-rose-500 bg-rose-50 dark:bg-rose-500/10"
                        : "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-[#5C4EE5]"
                    }
                  `}
                />
                {errorField === "current" && (
                  <p className="text-xs text-rose-500 font-semibold">
                    Incorrect password
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  New Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-[#5C4EE5] transition-all duration-300
                    ${isSuccessPass ? "border-emerald-500 dark:border-emerald-500 focus-visible:ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : ""}
                  `}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Confirm New Password
                </Label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorField === "confirm") setErrorField(null);
                  }}
                  required
                  className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-800 transition-all duration-300
                    ${
                      errorField === "confirm"
                        ? "border-rose-500 dark:border-rose-500 focus-visible:ring-rose-500 bg-rose-50 dark:bg-rose-500/10"
                        : isSuccessPass
                          ? "border-emerald-500 dark:border-emerald-500 focus-visible:ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                          : "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus-visible:ring-[#5C4EE5]"
                    }
                  `}
                />
                {errorField === "confirm" && (
                  <p className="text-xs text-rose-500 font-semibold">
                    Passwords do not match
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loadingPass}
                className={`w-full h-12 rounded-xl text-white font-bold shadow-lg mt-2 transition-all duration-300
                  ${
                    isSuccessPass
                      ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
                      : "bg-gradient-to-r from-[#5C4EE5] to-[#8B5CF6] hover:from-[#4b3ec4] hover:to-[#7c4df3] shadow-indigo-500/20"
                  }
                `}
              >
                {loadingPass ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : isSuccessPass ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={20} /> Password Changed!
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
