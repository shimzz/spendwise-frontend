import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryPieChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        By Category
      </h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        {data.length === 0 ? (
          <p className="text-gray-400 dark:text-slate-500 text-sm">
            No expenses added yet.
          </p>
        ) : (
          <>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#1e293b",
                      color: "#fff",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full flex flex-col gap-3 mt-4 px-2">
              {data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-gray-600 dark:text-slate-400 font-medium">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    {item.name}
                  </span>
                  <span className="font-bold text-gray-800 dark:text-slate-200">
                    PKR {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
