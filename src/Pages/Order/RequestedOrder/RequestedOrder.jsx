import { useEffect, useState } from "react";
import { Link } from "react-router";
import RequestOrderTable from "../RequestedOrder/RequestOrderTable/RequestOrderTable";

const RequestOrder = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // 🔹 ১. শুধু Pending/Unapproved অর্ডারগুলো ফিল্টার করে রাখা
        const pendingOrders = Array.isArray(data)
          ? data.filter((item) => item.status !== "Approved")
          : data;

        setPaymentData(pendingOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load /data.json:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 ২. Approve করার সাথে সাথে স্টেট থেকে সরিয়ে ফেলার হ্যান্ডলার
  const handleApproveStatus = (approvedOrderId) => {
    setPaymentData((prevData) =>
      prevData ? prevData.filter((item) => item.id !== approvedOrderId) : [],
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Request Order Directory
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review, edit, and approve pending order requests
            </p>
          </div>

          <div className="flex gap-5">
            <Link
              to="/case/create-case"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-sm"
            >
              + Create Order
            </Link>
            <Link
              to="/case/case-list"
              className="bg-gray-500 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-sm"
            >
              View Order List
            </Link>
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <div className="text-center py-16 text-slate-500 font-semibold bg-white rounded-2xl border border-slate-200">
            Loading order database...
          </div>
        ) : (
          <RequestOrderTable
            paymentData={paymentData}
            onApproveStatus={handleApproveStatus} // 🔹 Prop হিসেবে পাঠানো হলো
          />
        )}
      </div>
    </div>
  );
};

export default RequestOrder;
