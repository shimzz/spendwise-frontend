import { Search } from "lucide-react";

interface FilterProps {
  filterType: string;
  setFilterType: (type: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function TransactionFilters({
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
}: FilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by category or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#5C4EE5]"
        />
      </div>

      {/* Type Filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#5C4EE5]"
      >
        <option value="all">All Types</option>
        <option value="income">Income Only</option>
        <option value="expense">Expense Only</option>
      </select>
    </div>
  );
}
