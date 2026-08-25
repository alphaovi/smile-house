import  { useState, useEffect } from "react";
import PaymentTableRow from "./PaymentTableRow";
import ReceiptModal from "./ReceiptModal";
import { styles } from "../../../utilies/PaymentRequest/PaymentStyles";

// Notification Packages
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DEMO_PAYMENTS = [
  {
    id: 1,
    requestedDate: "2026-03-20",
    clinicName: "Health Care Clinic",
    clientName: "Acme Corporation",
    paymentAmount: "$1,500.00",
    receiptUrl: "https://via.placeholder.com/400x500?text=Receipt+101",
    paymentMode: "Bank Transfer",
    invoiceNumber: "INV-2026-001",
    invoiceUrl: "https://via.placeholder.com/400x500?text=Invoice+001",
  },
  {
    id: 2,
    requestedDate: "2026-03-21",
    clinicName: "City Care Lab",
    clientName: "TechSolutions Ltd",
    paymentAmount: "$850.00",
    receiptUrl: "https://via.placeholder.com/400x500?text=Receipt+102",
    paymentMode: "Mobile Banking",
    invoiceNumber: "INV-2026-002",
    invoiceUrl: "https://via.placeholder.com/400x500?text=Invoice+002",
  },
  {
    id: 3,
    requestedDate: "2026-03-22",
    clinicName: "Apex Medical",
    clientName: "Global Logistics",
    paymentAmount: "$2,300.00",
    receiptUrl: "https://via.placeholder.com/400x500?text=Receipt+103",
    paymentMode: "Credit Card",
    invoiceNumber: "INV-2026-003",
    invoiceUrl: "https://via.placeholder.com/400x500?text=Invoice+003",
  },
];

const PaymentRequest = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReceipt, setActiveReceipt] = useState(null);

  useEffect(() => {
    setPayments(DEMO_PAYMENTS);
    setLoading(false);
  }, []);

  // Double Step SweetAlert Confirmation Function
  const handleOpenInvoiceAlert = (data) => {
    // Step 1: Initial Details Modal
    Swal.fire({
      title: `Invoice Details (${data.invoiceNumber})`,
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.8;">
          <p><strong>Clinic:</strong> ${data.clinicName}</p>
          <p><strong>Client:</strong> ${data.clientName}</p>
          <p><strong>Invoice No:</strong> ${data.invoiceNumber}</p>
          <p><strong>Amount:</strong> ${data.paymentAmount}</p>
          <p><strong>Date:</strong> ${data.requestedDate}</p>
          <p style="margin-top: 10px;">
            <a href="${data.invoiceUrl}" target="_blank" rel="noreferrer" style="color: #0066cc; text-decoration: underline;">
              Download Full Invoice PDF
            </a>
          </p>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      focusConfirm: false,
    }).then((result) => {
      // If clicked "Approve" in Step 1
      if (result.isConfirmed) {
        // Step 2: Confirm Approve
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to confirm this payment approval?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Confirm Approve",
          cancelButtonText: "Cancel",
        }).then((approveResult) => {
          if (approveResult.isConfirmed) {
            // Remove item from list
            setPayments((prevPayments) =>
              prevPayments.filter((item) => item.id !== data.id)
            );

            // Toast Notification
            toast.success("Approved Payment", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        });
      } 
      // If clicked "Cancel" in Step 1
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // Step 2: Confirm Cancel
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to cancel this operation?",
          icon: "question",
          showCancelButton: false,
          confirmButtonColor: "#dc3545",
          confirmButtonText: "Confirm Cancel",
        });
      }
    });
  };

  if (loading) return <div style={styles.loading}>Loading Data...</div>;

  return (
    <section>
      {/* Toast Notification Container */}
      <ToastContainer />

      <div>
        <h1 className="font-bold text-center underline">Request Payment</h1>
      </div>
      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Requested<br />Date</th>
              <th style={styles.th}>Clinic Name</th>
              <th style={styles.th}>Client Name</th>
              <th style={styles.th}>Payment<br />Amount</th>
              <th style={styles.th}>Uploaded<br />Receipt</th>
              <th style={styles.th}>Payment<br />Mode</th>
              <th style={styles.th}>More Details<br />(Invoice Number)</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((row) => (
                <PaymentTableRow
                  key={row.id}
                  row={row}
                  onOpenReceiptModal={(data) => setActiveReceipt(data)}
                  onOpenInvoiceAlert={handleOpenInvoiceAlert}
                  styles={styles}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.td}>
                  No payment requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Receipt Modal */}
        <ReceiptModal
          activeReceipt={activeReceipt}
          onClose={() => setActiveReceipt(null)}
          styles={styles}
        />
      </div>
    </section>
  );
};

export default PaymentRequest;