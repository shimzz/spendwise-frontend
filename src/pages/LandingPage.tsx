import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  animate,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  ShieldCheck,
  PieChart,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Zap,
  Lock,
  ChevronDown,
  Download,
  Moon,
  LayoutDashboard, // <-- Yeh naya icon add kiya
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

/* ---------- Animation variants ---------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---------- Count-up number ---------- */
function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
    </span>
  );
}

/* ---------- Animated dashboard preview ---------- */
function DashboardMock() {
  const bars = [45, 70, 55, 85, 60, 95];
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  const stats = [
    { label: "Income", value: 75000, style: "bg-green-50 text-green-600" },
    { label: "Expenses", value: 52000, style: "bg-red-50 text-red-500" },
    { label: "Balance", value: 23000, style: "bg-indigo-50 text-indigo-600" },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">Dashboard</span>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-3 ${s.style}`}>
            <p className="text-[11px] font-medium opacity-80">{s.label}</p>
            <p className="text-sm font-bold text-slate-900">
              <CountUp to={s.value} prefix="PKR " />
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="mb-3 text-xs font-semibold text-slate-500">
          Monthly Overview
        </p>
        <div className="flex h-32 items-end gap-3">
          {bars.map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col justify-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.12 }}
                className="rounded-t-md bg-gradient-to-t from-[#5C4EE5] to-[#8B5CF6]"
              />
              <span className="mt-1 text-center text-[10px] text-slate-400">
                {months[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs">
          <span className="font-medium text-slate-600">Monthly Budget</span>
          <span className="font-bold text-slate-800">70%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Page data ---------- */
const techStack = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Tailwind CSS",
  "JWT Auth",
  "Recharts",
];

const features = [
  {
    icon: PieChart,
    title: "Visual Analytics",
    desc: "See where your money goes with clear bar and pie charts that update as you add transactions.",
    box: "from-indigo-50 border-indigo-100",
    iconBox: "bg-[#5C4EE5] shadow-indigo-200",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Smart Budgets",
    desc: "Set a monthly limit and watch the progress bar warn you before you overspend.",
    box: "from-emerald-50 border-emerald-100",
    iconBox: "bg-emerald-500 shadow-emerald-200",
    span: "",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    desc: "Add a transaction and your dashboard and charts refresh right away.",
    box: "from-amber-50 border-amber-100",
    iconBox: "bg-amber-500 shadow-amber-200",
    span: "",
  },
  {
    icon: Lock,
    title: "Private & Secure",
    desc: "Passwords are hashed and every request is protected with JWT. Only you can see your data.",
    box: "from-slate-100 border-slate-200",
    iconBox: "bg-[#0B1120] shadow-slate-300",
    span: "",
  },
  {
    icon: Download,
    title: "CSV Export",
    desc: "Download your transactions and open them in Excel anytime.",
    box: "from-sky-50 border-sky-100",
    iconBox: "bg-sky-500 shadow-sky-200",
    span: "",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    desc: "Switch themes to match your eyes and your mood.",
    box: "from-purple-50 border-purple-100",
    iconBox: "bg-purple-500 shadow-purple-200",
    span: "",
  },
];

const steps = [
  {
    title: "Create Account",
    desc: "Sign up for free in seconds. No credit card needed.",
  },
  {
    title: "Add Transactions",
    desc: "Log your daily income and expenses with a simple form.",
  },
  {
    title: "Track & Save",
    desc: "Watch your charts, set a budget, and reach your goals.",
  },
];

const faqs = [
  {
    q: "Is SpendWise free?",
    a: "Yes. You can create an account, track unlimited transactions and set a monthly budget at no cost.",
  },
  {
    q: "Is my financial data secure?",
    a: "Passwords are hashed with bcrypt and every request is verified with JWT. Your transactions are only visible to you.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. The app is responsive and works on mobile browsers, tablets and desktops.",
  },
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

/* ---------- Page ---------- */
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full overflow-x-hidden bg-[#FAFAFA] font-sans text-slate-800">
        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX }}
          className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#5C4EE5] via-[#8B5CF6] to-[#EC4899]"
        />

        {/* NAVBAR */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-lg"
        >
          <div className="flex h-20 w-full items-center justify-between px-6 md:px-10">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-[#5C4EE5] p-2 shadow-lg shadow-indigo-500/30">
                <Wallet size={24} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-[#0B1120]">
                SpendWise
              </span>
            </div>

            <div className="hidden items-center gap-8 font-medium text-slate-600 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-[#5C4EE5]"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* DESKTOP NAVBAR BUTTONS */}
            <div className="hidden items-center gap-6 md:flex">
              {user ? (
                <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                  <div className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-full cursor-pointer transition-all shadow-sm">
                    <div className="h-8 w-8 bg-[#5C4EE5] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Dashboard
                    </span>
                  </div>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-semibold text-slate-600 hover:text-[#0B1120]"
                  >
                    Log in
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-xl bg-[#5C4EE5] px-6 font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-[#4b3ec4]">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <button
              className="text-slate-600 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* MOBILE NAVBAR */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-b border-slate-100 bg-white md:hidden"
              >
                <div className="flex flex-col gap-4 px-6 py-4">
                  {navLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {l.label}
                    </a>
                  ))}
                  {user ? (
                    <Link
                      to={user.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full bg-[#0B1120] text-white flex items-center justify-center gap-2">
                        <LayoutDashboard size={18} /> Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="font-semibold text-[#5C4EE5]"
                      >
                        Log in
                      </Link>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-[#5C4EE5]">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#0B1120] px-6 pb-20 pt-32 md:pb-32 md:pt-40">
          <motion.div
            animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 top-10 h-[420px] w-[420px] rounded-full bg-[#5C4EE5]/30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -60, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-20 bottom-0 h-[480px] w-[480px] rounded-full bg-[#EC4899]/20 blur-3xl"
          />

          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeUp}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-200"
              >
                <Zap size={16} className="fill-indigo-300 text-indigo-300" />
                <span>Free personal expense tracker</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
              >
                Master Your Money,
                <br />
                <span className="bg-gradient-to-r from-[#8B7CFF] via-[#B28CFF] to-[#F472B6] bg-clip-text text-transparent">
                  Shape Your Future.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mx-auto mb-10 max-w-xl text-lg font-medium leading-relaxed text-slate-300 md:text-xl lg:mx-0"
              >
                Track expenses, set budgets and see your spending in clear
                charts. Take control of your money today.
              </motion.p>

              {/* HERO BUTTONS */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              >
                {user ? (
                  <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                    <Button className="flex h-14 items-center gap-2 rounded-xl bg-[#5C4EE5] px-8 text-lg font-bold text-white shadow-xl shadow-indigo-900/40 transition-transform hover:-translate-y-1 hover:bg-[#4b3ec4]">
                      Go to Dashboard <ArrowRight size={20} />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button className="flex h-14 items-center gap-2 rounded-xl bg-[#5C4EE5] px-8 text-lg font-bold text-white shadow-xl shadow-indigo-900/40 transition-transform hover:-translate-y-1 hover:bg-[#4b3ec4]">
                        Start for Free <ArrowRight size={20} />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="h-14 rounded-xl border-2 border-white/20 bg-transparent px-8 text-lg font-bold text-white transition-transform hover:-translate-y-1 hover:bg-white/10 hover:text-white"
                      >
                        Log in
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>

            {/* Animated preview */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto w-full max-w-lg"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <DashboardMock />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-6 top-16 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-xl sm:flex"
              >
                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Income Added
                  </p>
                  <p className="text-sm font-bold text-[#0B1120]">
                    + PKR 5,000
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-6 bottom-20 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-xl sm:flex"
              >
                <div className="rounded-lg bg-purple-100 p-2 text-[#5C4EE5]">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Budget Status
                  </p>
                  <p className="text-sm font-bold text-[#0B1120]">On Track</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* TECH STACK MARQUEE */}
        <section className="overflow-hidden border-y border-slate-100 bg-white py-8">
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
            Built with
          </p>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-16"
          >
            {[...techStack, ...techStack].map((t, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-xl font-bold text-slate-300"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="features" className="bg-[#FAFAFA] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <h2 className="mb-6 text-3xl font-bold text-[#0B1120] md:text-5xl">
                Everything you need to <br /> manage your finances
              </h2>
              <p className="text-lg text-slate-500">
                Powerful features in a simple interface.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {features.map(
                ({ icon: Icon, title, desc, box, iconBox, span }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    className={`group rounded-3xl border bg-gradient-to-br to-white p-8 shadow-sm transition-shadow hover:shadow-xl ${box} ${span}`}
                  >
                    <div
                      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 ${iconBox}`}
                    >
                      <Icon size={28} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#0B1120]">
                      {title}
                    </h3>
                    <p className="leading-relaxed text-slate-600">{desc}</p>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="bg-[#0B1120] py-24 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Get started in minutes
              </h2>
              <p className="text-lg text-slate-400">
                Three simple steps to financial clarity.
              </p>
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute left-[17%] right-[17%] top-10 hidden h-0.5 origin-left bg-gradient-to-r from-[#5C4EE5] to-[#EC4899] md:block"
              />

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative grid grid-cols-1 gap-12 md:grid-cols-3"
              >
                {steps.map((s, i) => (
                  <motion.div
                    key={s.title}
                    variants={fadeUp}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#5C4EE5] bg-[#1E293B] text-3xl font-bold text-white shadow-xl shadow-indigo-500/20"
                    >
                      {i + 1}
                    </motion.div>
                    <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
                    <p className="text-slate-400">{s.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white py-24">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 text-center text-3xl font-bold text-[#0B1120]"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.q}
                  variants={fadeUp}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-[#FAFAFA] shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-[#0B1120] transition-colors hover:bg-slate-50"
                  >
                    {faq.q}
                    <motion.span
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                    >
                      <ChevronDown />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-slate-600">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#FAFAFA] px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#5C4EE5] to-[#8B5CF6] p-12 text-center text-white shadow-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white blur-3xl"
            />
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold md:text-5xl">
                Ready to take control of your money?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-indigo-100">
                Create your free account and start tracking in under a minute.
              </p>
              <Link
                to={
                  user
                    ? user.role === "admin"
                      ? "/admin"
                      : "/dashboard"
                    : "/register"
                }
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Button className="h-14 rounded-xl bg-white px-10 text-lg font-bold text-[#5C4EE5] shadow-xl hover:bg-slate-50">
                    {user ? "Go to Dashboard" : "Create Free Account"}
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 bg-[#0B1120] pb-8 pt-12">
          <div className="flex w-full flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-10">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#5C4EE5] p-1.5">
                <Wallet size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">SpendWise</span>
            </div>

            <div className="flex gap-6 text-sm text-slate-400">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-[#8B7CFF]"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} SpendWise. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
