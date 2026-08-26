import { useEffect, useState } from "react";
import PaymentHeader from "../ViewPaymentHeader/PaymentHeader";
import PaymentTable from "../ViewPaymentTable/PaymentTable";
import PaymentSearchFilter from "../ViewPaymentSearchFilter/PaymentSearchFilter";

const ViewPayment = () => {
  // Raw payment data fetched from JSON/API
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(true);

  // State to hold filter options submitted from PaymentSearchFilter
  const [filterCriteria, setFilterCriteria] = useState(null);

  useEffect(() => {
    // Fetch data source from public directory
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load payment data:", err);
        setLoading(false);
      });
  }, []);

  // Handler to create a new payment action
  const handleCreatePayment = () => {
    console.log("Navigate or open modal to Create Payment");
  };

  // Receive search criteria from search filter component
  const handleFilterSearch = (criteria) => {
    setFilterCriteria(criteria);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header containing title and Create Payment button */}
        <PaymentHeader onCreatePayment={handleCreatePayment} />

        {/* Dynamic Filter Search Form */}
        <PaymentSearchFilter onFilter={handleFilterSearch} />

        {/* Main Data Table Section */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading payments...
          </div>
        ) : (
          <PaymentTable paymentData={payments} filters={filterCriteria} />
        )}
      </div>
    </div>
  );
};

export default ViewPayment;