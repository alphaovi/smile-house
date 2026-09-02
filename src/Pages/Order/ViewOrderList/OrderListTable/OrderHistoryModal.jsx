

const OrderHistoryModal = ({ isOpen, onClose, row }) => {
  if (!isOpen || !row) return null;

  const historyLogs = row.history || [
    {
      status: row.status || "Approved",
      title: "Current Status",
      updatedBy: "System",
      date: row.orderDate || "2026-03-01 10:00 AM",
      note: "Order activity logged.",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">📜 Order Audit Logs</h3>
            <p className="text-[11px] text-slate-400">Order No: #{row.orderNo || row.id}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer font-bold px-2 py-1">
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[420px] overflow-y-auto">
          <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
            {historyLogs.map((log, index) => (
              <div key={index} className="relative pl-6">
                <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-xs ${log.color || 'bg-blue-500'}`} />
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-800">{log.title}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                      {log.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-2">{log.note}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200 pt-1.5">
                    <span>Updated by: <strong className="text-slate-700">{log.updatedBy}</strong></span>
                    <span className="font-semibold text-blue-600 uppercase">{log.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-right">
          <button onClick={onClose} className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;