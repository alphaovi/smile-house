import { useState, useMemo } from "react";

const PaymentTable = ({ paymentData, filters }) => {
  // State variables for search input and pagination logic
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Safely flatten nested JSON data (doctors -> patients -> cases -> payments)
  const rawPayments = useMemo(() => {
    if (!paymentData || !paymentData.doctors) return [];

    return paymentData.doctors.flatMap((doctor) => {
      const patients = doctor?.patients || [];
      return patients.flatMap((patient) => {
        const cases = patient?.cases || [];
        return cases.flatMap((singleCase) => {
          const payments = singleCase?.invoice?.payments || [];
          return payments.map((payment) => ({
            id: payment?.payment_id || "N/A",
            paymentDate: payment?.date || "",
            clientName: patient?.patient_name || "N/A",
            paymentBy: doctor?.doctor_name || "N/A",
            officeName: doctor?.clinic_name || "N/A",
            officeAddress: doctor?.clinic_address || "N/A",
            reference: payment?.reference || singleCase?.case_id || "N/A",
            paymentType: payment?.method || "N/A",
            paymentAmount: payment?.amount || 0,
          }));
        });
      });
    });
  }, [paymentData]);

  // Combine table search box filtering and search form filters
  const filteredPayments = useMemo(() => {
    return rawPayments.filter((payment) => {
      // Table search input filter
      const matchesSearch = Object.values(payment).some((val) =>
        String(val || "").toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (!matchesSearch) return false;

      // Top filter form criteria checks
      if (filters) {
        if (filters.clientName && payment.paymentBy !== filters.clientName) return false;
        if (filters.officeName && payment.officeName !== filters.officeName) return false;
        if (filters.officeAddress && !payment.officeAddress.toLowerCase().includes(filters.officeAddress.toLowerCase())) return false;
        if (filters.fromDate && new Date(payment.paymentDate) < new Date(filters.fromDate)) return false;
        if (filters.toDate && new Date(payment.paymentDate) > new Date(filters.toDate)) return false;
      }

      return true;
    });
  }, [rawPayments, searchTerm, filters]);

  // Action Button Event Handlers
  const handleLock = (id) => {
    alert(`Payment Record ID: ${id} status updated.`);
  };

  const handleEdit = (id) => {
    alert(`Editing Payment Record ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (confirm(`Are you sure you want to delete Payment Record ID: ${id}?`)) {
      alert(`Deleted record ${id}`);
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPayments.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredPayments.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="bg-white rounded-md shadow border border-gray-200 p-4 mb-8">
      {/* Search and Entries Per Page Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-xs text-gray-600 gap-2">
        <div>
          Show{" "}
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 mx-1 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{" "}
          entries
        </div>

        <div>
          Search:{" "}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search payments..."
            className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 text-gray-700 font-semibold">
              <th className="p-2 border-r">Payment Id</th>
              <th className="p-2 border-r">Payment Date</th>
              <th className="p-2 border-r">Client Name</th>
              <th className="p-2 border-r">Payment By</th>
              <th className="p-2 border-r">Reference</th>
              <th className="p-2 border-r">Payment Type</th>
              <th className="p-2 border-r">Payment Amount</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50 text-gray-700">
                  <td className="p-2 border-r font-medium">{row.id}</td>
                  <td className="p-2 border-r">{row.paymentDate}</td>
                  <td className="p-2 border-r">{row.clientName}</td>
                  <td className="p-2 border-r">{row.paymentBy}</td>
                  <td className="p-2 border-r">{row.reference}</td>
                  <td className="p-2 border-r">{row.paymentType}</td>
                  <td className="p-2 border-r font-semibold">${row.paymentAmount}</td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center space-x-1">
                      <button
                        onClick={() => handleLock(row.id)}
                        className="bg-purple-600 text-white p-1 rounded hover:bg-purple-700"
                        title="Lock Record"
                      >
                        🔒
                      </button>
                      <button
                        onClick={() => handleEdit(row.id)}
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                        title="Edit Record"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        title="Delete Record"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-xs text-gray-500 gap-2">
        <div>
          Showing {filteredPayments.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + entriesPerPage, filteredPayments.length)} of{" "}
          {filteredPayments.length} entries
        </div>

        <div className="flex items-center space-x-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-2 py-1 border rounded ${
                currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + totalPages ? p + 1 : p)}
            className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;