
import StatusSelect from "./StatusSelect";
import PrintActionDropdown from "./PrintActionDropdown";

const OrderTableRow = ({
  row,
  onStatusChange,
  onEditClick,
  onOpenHistory,
  onOpenShare,
}) => {
  const currentStatus = row.status || "Approved";
  const isLocked =
    currentStatus === "Ready for Delivery" ||
    currentStatus === "Courier" ||
    currentStatus === "Delivered";

  return (
    <tr className="hover:bg-slate-50 transition">
      <td className="p-3 border-r font-medium text-slate-500">{row.id}</td>
      <td className="p-3 border-r font-bold text-blue-600">{row.orderNo}</td>
      <td className="p-3 border-r font-medium">{row.clientName}</td>
      <td className="p-3 border-r">{row.orderDate}</td>
      <td className="p-3 border-r">{row.patientName}</td>
      <td className="p-3 border-r">{row.deliveryDate}</td>
      <td className="p-3 border-r font-bold text-slate-800">${row.amount}</td>

      <td className="p-2 border-r text-center">
        <StatusSelect
          currentStatus={currentStatus}
          onStatusChange={(newStatus) => onStatusChange(row.id, newStatus, row)}
        />
      </td>

      <td className="p-2 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <PrintActionDropdown row={row} onOpenShare={onOpenShare} />

          <button
            title={isLocked ? `Editing locked for ${currentStatus}` : "Edit Order"}
            disabled={isLocked}
            onClick={() => !isLocked && onEditClick(row)}
            className={`px-2 py-1.5 rounded-md font-bold text-[10px] text-white transition cursor-pointer ${
              isLocked
                ? "bg-gray-300 cursor-not-allowed opacity-60"
                : "bg-blue-600 hover:bg-blue-700 shadow-xs"
            }`}
          >
            ✏️ Edit
          </button>

          <button
            title="Order Logs"
            onClick={() => onOpenHistory(row)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-2 py-1.5 rounded-md font-bold text-[10px] cursor-pointer shadow-xs"
          >
            ℹ️ Info
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;