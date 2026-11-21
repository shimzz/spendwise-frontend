import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ data }: { data: any[] }) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Monthly Overview
        </h3>
        <div className="flex gap-4 text-sm font-medium">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <div className="w-3 h-3 bg-[#5C4EE5] rounded-full"></div> Income
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <div className="w-3 h-3 bg-[#A78BFA] rounded-full"></div> Expenses
          </span>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#334155"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#1e293b",
                color: "#fff",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey="income"
              fill="#5C4EE5"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="expense"
              fill="#A78BFA"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
