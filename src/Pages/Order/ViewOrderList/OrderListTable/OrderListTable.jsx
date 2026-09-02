import { useState } from "react";
import Swal from "sweetalert2";
import OrderTableRow from "./OrderTableRow";
import OrderHistoryModal from "./OrderHistoryModal";
import ShareInvoiceModal from "./ShareInvoiceModal";

const OrderListTable = ({ orders = [], onStatusChange, onEditClick }) => {
  const [selectedOrderForHistory, setSelectedOrderForHistory] = useState(null);
  const [selectedOrderForShare, setSelectedOrderForShare] = useState(null);

  const handleStatusUpdate = (orderId, newStatus, row) => {
    if (typeof onStatusChange === "function") {
      onStatusChange(orderId, newStatus);
    }
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `Order #${row.orderNo || orderId} updated to '${newStatus}'`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <>
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
                <th className="p-3 border-r text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.length > 0 ? (
                orders.map((row) => (
                  <OrderTableRow
                    key={row.id}
                    row={row}
                    onStatusChange={handleStatusUpdate}
                    onEditClick={onEditClick}
                    onOpenHistory={(r) => setSelectedOrderForHistory(r)}
                    onOpenShare={(r) => setSelectedOrderForShare(r)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-400 font-medium">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <OrderHistoryModal
        isOpen={!!selectedOrderForHistory}
        onClose={() => setSelectedOrderForHistory(null)}
        row={selectedOrderForHistory}
      />

      <ShareInvoiceModal
        isOpen={!!selectedOrderForShare}
        onClose={() => setSelectedOrderForShare(null)}
        row={selectedOrderForShare}
      />
    </>
  );
};

export default OrderListTable;