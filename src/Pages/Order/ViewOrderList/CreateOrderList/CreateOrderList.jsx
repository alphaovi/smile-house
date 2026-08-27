import { useState, useEffect, useMemo } from "react";
import OrderListFilter from "../OrderListFilter/OrderListFilter";
import OrderListTable from "../OrderListTable/OrderListTable";
import RequestOrderViewModal from "../../RequestedOrder/RequestOrderViewModal/RequestOrderViewModal";

const CreateOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedClient, setSelectedClient] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Edit Modal State
  const [selectedOrderToEdit, setSelectedOrderToEdit] = useState(null);

  // 1. Load Data
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.doctors) {
          const parsedOrders = data.doctors.flatMap((doctor) =>
            (doctor?.patients || []).flatMap((patient) =>
              (patient?.cases || []).flatMap((singleCase) =>
                (singleCase?.invoice?.payments || []).map((payment) => ({
                  id:
                    payment?.payment_id ||
                    `PAY-${Math.floor(100 + Math.random() * 900)}`,
                  orderNo: singleCase?.case_id || "CASE-9001",
                  clientName: doctor?.doctor_name || "N/A",
                  clinicName: doctor?.clinic_name || "Dental Clinic",
                  orderDate: payment?.date || "2026-08-01",
                  patientName: patient?.patient_name || "N/A",
                  deliveryDate: "2026-08-25",
                  amount: payment?.amount || 0,
                  status: "Approved", // Default status setup
                  shippingAddress: doctor?.clinic_address || "Dhaka",
                })),
              ),
            ),
          );
          setOrders(parsedOrders);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order data:", err);
        setLoading(false);
      });
  }, []);

  // 2. Client Dropdown Options
  const clientOptions = useMemo(() => {
    return Array.from(new Set(orders.map((o) => o.clientName).filter(Boolean)));
  }, [orders]);

  // 3. Status Change Handler
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord,
      ),
    );
  };

  // 4. Modal Update Save Handler
  const handleSaveEditedModalData = (orderId, newStatus, updatedData) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, ...updatedData, status: newStatus }
          : ord,
      ),
    );
    setSelectedOrderToEdit(null);
  };

  // 5. Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesClient =
        selectedClient === "ALL" || ord.clientName === selectedClient;
      const matchesSearch = Object.values(ord).some((val) =>
        String(val || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
      return matchesClient && matchesSearch;
    });
  }, [orders, selectedClient, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Filter Section */}
        <OrderListFilter
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {}}
          clientOptions={clientOptions}
        />

        {/* Table Section */}
        {loading ? (
          <div className="bg-white p-12 text-center text-slate-500 font-bold rounded-2xl border">
            Loading Orders...
          </div>
        ) : (
          <OrderListTable
            orders={filteredOrders}
            onStatusChange={handleStatusChange}
            onEditClick={(order) => setSelectedOrderToEdit(order)}
          />
        )}

        {/* Reusing RequestOrderViewModal for Editing */}
        {selectedOrderToEdit && (
          <RequestOrderViewModal
            order={selectedOrderToEdit}
            mode="edit" // 👈 "Order No #X updated successfully" Alert দেখাবে
            onClose={() => setSelectedOrderToEdit(null)}
            onApproveStatus={handleSaveEditedModalData}
          />
        )}
      </div>
    </div>
  );
};

export default CreateOrderList;
