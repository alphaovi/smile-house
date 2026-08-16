const StatCard = ({ title, data, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <span className="text-slate-500 text-sm font-medium">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="mt-4 flex items-baseline justify-between">
      <h3 className="text-2xl font-black text-slate-900">{data.value}</h3>
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
          data.positive
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
        }`}
      >
        {data.growth}
      </span>
    </div>
  </div>
);

export default StatCard;
