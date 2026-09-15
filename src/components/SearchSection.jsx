import { Search } from "lucide-react";

export default function SearchSection({ search, setSearch }) {
  return (
    <section className="bg-white border border-line rounded-[22px] shadow-sm p-[18px_20px] mb-5">
      {/* Search input */}
      <div className="flex items-center gap-2 border border-line rounded-full px-4 h-[46px] bg-primary-background">
        <Search size={20} className="text-gray-500 shrink-0" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, brand, or feature — e.g. AMOLED, Face ID..."
          className="flex-1 min-w-0 border-none outline-none bg-transparent px-2 text-sm text-gray-800 placeholder:text-gray-500"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
        {/* Brands */}
        <div className="flex gap-2 flex-wrap">
          <button className="px-[14px] py-[7px] rounded-full bg-primary text-white text-[12.5px] font-semibold">
            All
          </button>

          <button className="px-[14px] py-[7px] rounded-full border border-line bg-transparent text-gray-500 text-[12.5px] font-semibold">
            Apple
          </button>

          <button className="px-[14px] py-[7px] rounded-full border border-line bg-transparent text-gray-500 text-[12.5px] font-semibold">
            Oppo
          </button>

          <button className="px-[14px] py-[7px] rounded-full border border-line bg-transparent text-gray-500 text-[12.5px] font-semibold">
            Realme
          </button>

          <button className="px-[14px] py-[7px] rounded-full border border-line bg-transparent text-gray-500 text-[12.5px] font-semibold">
            Samsung
          </button>

          <button className="px-[14px] py-[7px] rounded-full border border-line bg-transparent text-gray-500 text-[12.5px] font-semibold">
            Vivo
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Price
          </span>

          <input
            type="number"
            placeholder="Min"
            className="w-[68px] h-[34px] border border-line rounded-[10px] bg-primary-background px-2.5 text-[13px] outline-none"
          />

          <span className="text-gray-500">−</span>

          <input
            type="number"
            placeholder="Max"
            className="w-[68px] h-[34px] border border-line rounded-[10px] bg-primary-background px-2.5 text-[13px] outline-none"
          />
        </div>
      </div>
    </section>
  );
}
