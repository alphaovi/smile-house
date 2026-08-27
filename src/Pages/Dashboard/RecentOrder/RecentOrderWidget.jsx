const RecentOrdersWidget = () => {
  const recentOrders = [
    { id: "ORD-9021", client: "Apex Dental Clinic", item: "Zirconia Crown", status: "In Process", date: "Today" },
    { id: "ORD-9022", client: "Smile Care Lab", item: "PFM Bridge", status: "Approved", date: "Today" },
    { id: "ORD-9023", client: "City Dental Care", item: "Implants", status: "Ready", date: "Yesterday" },
    { id: "ORD-9024", client: "Dr. Alim Clinic", item: "Veneers (4 Units)", status: "Delivered", date: "Yesterday" },
  ];

  return (
    <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col h-[520px]">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
        <div>
          <h3 className="text-base font-black text-slate-800 tracking-tight">
            Recent Orders Activity
          </h3>
          <p className="text-xs text-slate-500 font-medium">Live status tracking of latest cases</p>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 font-extrabold border-b border-slate-100 uppercase text-[10px]">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Item</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-50 transition">
                <td className="py-3.5 font-bold text-blue-600">{ord.id}</td>
                <td className="py-3.5 font-semibold text-slate-700">{ord.client}</td>
                <td className="py-3.5 text-slate-500">{ord.item}</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                    {ord.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersWidget;