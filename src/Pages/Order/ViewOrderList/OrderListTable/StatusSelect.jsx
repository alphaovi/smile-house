const STATUS_OPTIONS = [
  "Approved",
  "Process",
  "Working",
  "Ready for Delivery",
  "Courier",
  "Delivered",
];

const StatusSelect = ({ currentStatus, onStatusChange }) => {
  return (
    <select
      value={currentStatus || "Approved"}
      onChange={(e) => onStatusChange(e.target.value)}
      className="border border-slate-300 rounded-lg p-1.5 font-bold text-[11px] bg-slate-50 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer"
    >
      {STATUS_OPTIONS.map((st) => (
        <option key={st} value={st}>
          {st}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;