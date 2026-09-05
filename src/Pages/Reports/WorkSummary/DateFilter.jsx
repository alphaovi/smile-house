import { useRef } from "react";

const DateFilter = ({ startDate, endDate, onDateChange }) => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <div className="flex flex-wrap items-center gap-4 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
      <div className="flex flex-col gap-1.5 min-w-[180px]">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
          From Date
        </label>
        <div className="relative">
          <input
            ref={startRef}
            type="date"
            value={startDate}
            max={endDate || undefined}
            onClick={() => startRef.current?.showPicker?.()}
            onChange={(e) => onDateChange("startDate", e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[180px]">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
          To Date
        </label>
        <div className="relative">
          <input
            ref={endRef}
            type="date"
            value={endDate}
            min={startDate || undefined}
            onClick={() => endRef.current?.showPicker?.()}
            onChange={(e) => onDateChange("endDate", e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;