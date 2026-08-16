
const SalesAnalytics = ({ chartData }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Revenue Analytics</h2>
          <p className="text-xs text-slate-400">Monthly equipment sales performance</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
          +18.5% Avg Growth
        </span>
      </div>

      {/* Modern Visual Bar Chart */}
      <div className="pt-6 pb-2 flex items-end justify-between gap-3 h-48 border-b border-slate-100">
        {chartData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <div className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
              ${item.amount}k
            </div>
            <div 
              className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t-lg transition-all duration-300"
              style={{ height: `${item.percentage}%` }}
            />
            <span className="text-xs font-medium text-slate-500">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesAnalytics;