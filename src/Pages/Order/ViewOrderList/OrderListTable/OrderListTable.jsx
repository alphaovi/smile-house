import { useState } from "react";
import Swal from "sweetalert2";

const STATUS_OPTIONS = [
  "Approved",
  "Process",
  "Working",
  "Ready for Delivery",
  "Courier",
  "Delivered",
];

const OrderListTable = ({ orders, onStatusChange, onEditClick }) => {
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const handleSelectChange = (orderId, status) => {
    setSelectedStatuses((prev) => ({ ...prev, [orderId]: status }));
  };

  // Update Button Handler
  const handleUpdateClick = (row, currentStatus) => {
    if (typeof onStatusChange === "function") {
      onStatusChange(row.id, currentStatus);
    }

    Swal.fire({
      title: "Updated Successfully!",
      text: `Order No #${row.orderNo || row.id} status updated to '${currentStatus}'`,
      icon: "success",
      confirmButtonColor: "#2563eb",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase">
              <th className="p-3 border-r">ID</th>
              <th className="p-3 border-r">Order No</th>
              <th className="p-3 border-r">Client Name</th>
              <th className="p-3 border-r">Order Date</th>
              <th className="p-3 border-r">Pt. Name</th>
              <th className="p-3 border-r">Delivery Date</th>
              <th className="p-3 border-r">Amount</th>
              <th className="p-3 border-r text-center">Status Select</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.length > 0 ? (
              orders.map((row) => {
                const currentStatus =
                  selectedStatuses[row.id] || row.status || "Approved";

                // 🔒 Lock condition: "Ready for Delivery", "Courier", or "Delivered"
                const isLocked =
                  currentStatus === "Ready for Delivery" ||
                  currentStatus === "Courier" ||
                  currentStatus === "Delivered";

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 border-r font-medium text-slate-500">
                      {row.id}
                    </td>
                    <td className="p-3 border-r font-bold text-blue-600">
                      {row.orderNo}
                    </td>
                    <td className="p-3 border-r font-medium">
                      {row.clientName}
                    </td>
                    <td className="p-3 border-r">{row.orderDate}</td>
                    <td className="p-3 border-r">{row.patientName}</td>
                    <td className="p-3 border-r">{row.deliveryDate}</td>
                    <td className="p-3 border-r font-bold text-slate-800">
                      ${row.amount}
                    </td>

                    {/* Dynamic Status Dropdown */}
                    <td className="p-2 border-r text-center">
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          handleSelectChange(row.id, e.target.value)
                        }
                        className="border border-slate-300 rounded-lg p-1.5 font-bold text-[11px] bg-slate-50 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {/* Print Button */}
                        <button
                          title="Print"
                          onClick={() => window.print()}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-1.5 rounded-md font-bold text-[10px] cursor-pointer"
                        >
                          🖨️
                        </button>

                        {/* Edit Button - Disabled for Ready for Delivery, Courier & Delivered */}
                        <button
                          title={
                            isLocked
                              ? `Editing locked for ${currentStatus}`
                              : "Edit Order"
                          }
                          disabled={isLocked}
                          onClick={() => !isLocked && onEditClick(row)}
                          className={`p-1.5 rounded-md font-bold text-[10px] text-white transition ${
                            isLocked
                              ? "bg-gray-300 cursor-not-allowed opacity-60"
                              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                          }`}
                        >
                          ✏️
                        </button>

                        {/* LP Button */}
                        <button
                          title="Label Print"
                          onClick={() =>
                            alert(`Printing label for ${row.orderNo}`)
                          }
                          className="bg-amber-500 hover:bg-amber-600 text-white px-1.5 py-1 rounded-md font-extrabold text-[10px] cursor-pointer"
                        >
                          LP
                        </button>

                        {/* Update Button */}
                        <button
                          title="Update Status"
                          onClick={() =>
                            handleUpdateClick(row, currentStatus)
                          }
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-md font-bold text-[10px] cursor-pointer shadow-2xs"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="p-8 text-center text-slate-400 font-medium"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListTable;