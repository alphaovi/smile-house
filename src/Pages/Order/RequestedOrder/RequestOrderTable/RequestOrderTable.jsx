import  { useState, useMemo } from "react";
import RequestOrderViewModal from "../RequestOrderViewModal/RequestOrderViewModal";

/**
 * Data Table rendering list of order requests derived directly from data.json
 */
const RequestOrderTable = ({ paymentData }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordersList, setOrdersList] = useState([]);

  // Dynamically map data.json into flattened table rows
  useMemo(() => {
    if (!paymentData || !paymentData.doctors) return;

    const parsedOrders = paymentData.doctors.flatMap((doctor) => {
      const patients = doctor?.patients || [];
      return patients.flatMap((patient) => {
        const cases = patient?.cases || [];
        return cases.flatMap((singleCase) => {
          const payments = singleCase?.invoice?.payments || [];
          return payments.map((payment) => ({
            id: payment?.payment_id || `PAY-${Math.floor(100 + Math.random() * 900)}`,
            clientId: doctor?.doctor_id || "CL-801",
            orderNo: singleCase?.case_id || "CASE-9001",
            clientName: doctor?.doctor_name || "N/A",
            clinicName: doctor?.clinic_name || "Dental Clinic",
            orderDate: payment?.date || "2026-08-01",
            patientName: patient?.patient_name || "N/A",
            deliveryDate: "2026-08-25",
            amount: payment?.amount || 0,
            status: "Pending",
            shippingAddress: doctor?.clinic_address || "Dhaka, Bangladesh",
          }));
        });
      });
    });

    setOrdersList(parsedOrders);
  }, [paymentData]);

  // Extract unique Clinic & Doctor names dynamically for select dropdowns
  const clinicOptions = useMemo(() => {
    if (!paymentData?.doctors) return [];
    return Array.from(new Set(paymentData.doctors.map((d) => d.clinic_name).filter(Boolean)));
  }, [paymentData]);

  const doctorOptions = useMemo(() => {
    if (!paymentData?.doctors) return [];
    return Array.from(new Set(paymentData.doctors.map((d) => d.doctor_name).filter(Boolean)));
  }, [paymentData]);

  // Handle status update and field updates from modal
  const handleApproveStatus = (orderId, newStatus, updatedData) => {
    setOrdersList((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              ...updatedData,
              status: newStatus,
            }
          : ord
      )
    );
  };

  // Filter table rows based on search input
  const filteredOrders = useMemo(() => {
    return ordersList.filter((ord) =>
      Object.values(ord).some((val) =>
        String(val || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [ordersList, searchTerm]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      {/* Search Bar & Table Title */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="font-extrabold text-slate-800 text-sm tracking-wide uppercase">
          Pending Order Requests ({filteredOrders.length})
        </h2>
        <input
          type="text"
          placeholder="Search by ID, Name, Clinic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
        />
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase tracking-wider">
              <th className="p-3 border-r">Client ID</th>
              <th className="p-3 border-r">Order No</th>
              <th className="p-3 border-r">Client Name</th>
              <th className="p-3 border-r">Clinic Name</th>
              <th className="p-3 border-r">Order Date</th>
              <th className="p-3 border-r">Patient Name</th>
              <th className="p-3 border-r">Delivery Date</th>
              <th className="p-3 border-r">Amount</th>
              <th className="p-3 border-r">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                >
                  <td className="p-3 border-r font-semibold text-slate-600">{row.clientId}</td>
                  <td className="p-3 border-r font-bold text-blue-600">{row.orderNo}</td>
                  <td className="p-3 border-r">{row.clientName}</td>
                  <td className="p-3 border-r">{row.clinicName}</td>
                  <td className="p-3 border-r">{row.orderDate}</td>
                  <td className="p-3 border-r">{row.patientName}</td>
                  <td className="p-3 border-r">{row.deliveryDate}</td>
                  <td className="p-3 border-r font-bold text-slate-900">${row.amount}</td>
                  <td className="p-3 border-r">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        row.status === "Approved"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedOrder(row)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold transition shadow-sm"
                    >
                      👁 View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="p-6 text-center text-slate-400 font-medium">
                  No orders match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pop-up Edit Modal */}
      {selectedOrder && (
        <RequestOrderViewModal
          order={selectedOrder}
          clinicOptions={clinicOptions}
          doctorOptions={doctorOptions}
          onClose={() => setSelectedOrder(null)}
          onApproveStatus={handleApproveStatus}
        />
      )}
    </div>
  );
};

export default RequestOrderTable;