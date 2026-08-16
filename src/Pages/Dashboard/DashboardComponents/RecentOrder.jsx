
const StatusBadge = ({ status }) => {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Pending: "bg-amber-50 text-amber-600 border-amber-200",
    Processing: "bg-blue-50 text-blue-600 border-blue-200"
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
};

const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Recent Equipment Orders</h2>
        <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">View All</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Item</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 font-semibold text-slate-800">{order.id}</td>
                <td className="py-4 text-slate-600">{order.client}</td>
                <td className="py-4 text-slate-500 text-xs">{order.item}</td>
                <td className="py-4 font-bold text-slate-900">{order.amount}</td>
                <td className="py-4 text-right">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;