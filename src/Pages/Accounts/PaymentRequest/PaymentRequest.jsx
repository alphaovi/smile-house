import { useState, useEffect } from "react";

// Demo Data (Replace with backend API fetch later)
const DEMO_PAYMENTS = [
  {
    id: 1,
    requestedDate: "2026-03-20",
    clientName: "Acme Corporation",
    paymentAmount: "$1,500.00",
    receiptUrl: "https://via.placeholder.com/400x500?text=Receipt+101",
    paymentMode: "Bank Transfer",
    isConfirmed: false,
    invoiceNumber: "INV-2026-001",
    invoiceUrl: "https://via.placeholder.com/400x500?text=Invoice+001",
  },
  {
    id: 2,
    requestedDate: "2026-03-21",
    clientName: "TechSolutions Ltd",
    paymentAmount: "$850.00",
    receiptUrl: "https://via.placeholder.com/400x500?text=Receipt+102",
    paymentMode: "Mobile Banking",
    isConfirmed: true,
    invoiceNumber: "INV-2026-002",
    invoiceUrl: "https://via.placeholder.com/400x500?text=Invoice+002",
  },
  {
    id: 3,
    requestedDate: "2026-03-22",
    clientName: "Global Logistics",
    paymentAmount: "$2,300.00",
    receiptUrl: "https://via.placeholder.com/400x500?text=Receipt+103",
    paymentMode: "Credit Card",
    isConfirmed: false,
    invoiceNumber: "INV-2026-003",
    invoiceUrl: "https://via.placeholder.com/400x500?text=Invoice+003",
  },
];

const PaymentRequest = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState({ type: null, data: null });

  useEffect(() => {
    // API Call (e.g., fetch('/api/payments'))
    setPayments(DEMO_PAYMENTS);
    setLoading(false);
  }, []);

  // Toggle Received (Double Confirmation) Status dynamically
  const toggleConfirmation = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((row) =>
        row.id === id ? { ...row, isConfirmed: !row.isConfirmed } : row,
      ),
    );
    // Future API call to update DB status:
    // axios.patch(`/api/payments/${id}`, { isConfirmed: !currentStatus })
  };

  const openModal = (type, data) => {
    setActiveModal({ type, data });
  };

  const closeModal = () => {
    setActiveModal({ type: null, data: null });
  };

  if (loading) return <div style={styles.loading}>Loading Data...</div>;

  return (
    <section>
      <div>
        <h1 className="font-bold text-center underline">Request Payment</h1>
      </div>
      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                Requested
                <br />
                Date
              </th>
              <th style={styles.th}>Client Name</th>
              <th style={styles.th}>
                Payment
                <br />
                Amount
              </th>
              <th style={styles.th}>
                Uploaded
                <br />
                Receipt
              </th>
              <th style={styles.th}>
                Payment
                <br />
                Mode
              </th>
              <th style={styles.th}>
                Received
                <br />
                (Double Confirmation)
              </th>
              <th style={styles.th}>
                More Details
                <br />
                (Invoice Number)
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>{row.requestedDate}</td>
                <td style={styles.td}>{row.clientName}</td>
                <td style={styles.td}>{row.paymentAmount}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => openModal("receipt", row)}
                    style={styles.actionBtn}
                  >
                    View
                  </button>
                </td>
                <td style={styles.td}>{row.paymentMode}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => toggleConfirmation(row.id)}
                    title="Click to toggle confirmation"
                    style={styles.circleBtn}
                  >
                    <span
                      style={{
                        ...styles.circle,
                        ...(row.isConfirmed ? styles.confirmedCircle : {}),
                      }}
                    />
                  </button>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => openModal("invoice", row)}
                    style={styles.actionBtn}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Popup */}
        {activeModal.type && (
          <div style={styles.modalOverlay} onClick={closeModal}>
            <div
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <h3 style={{ margin: 0 }}>
                  {activeModal.type === "receipt"
                    ? `Receipt - ${activeModal.data.clientName}`
                    : `Invoice Details (${activeModal.data.invoiceNumber})`}
                </h3>
                <button style={styles.closeBtn} onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div style={styles.modalBody}>
                {activeModal.type === "receipt" ? (
                  <img
                    src={activeModal.data.receiptUrl}
                    alt="Receipt"
                    style={styles.modalImage}
                  />
                ) : (
                  <div>
                    <p>
                      <strong>Client:</strong> {activeModal.data.clientName}
                    </p>
                    <p>
                      <strong>Invoice No:</strong>{" "}
                      {activeModal.data.invoiceNumber}
                    </p>
                    <p>
                      <strong>Amount:</strong> {activeModal.data.paymentAmount}
                    </p>
                    <p>
                      <strong>Date:</strong> {activeModal.data.requestedDate}
                    </p>
                    <a
                      href={activeModal.data.invoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.link}
                    >
                      Download Full Invoice PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const styles = {
  container: {
    width: "100%",
    overflowX: "auto",
    margin: "20px 0",
    fontFamily: "Arial, sans-serif",
  },
  loading: {
    padding: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  th: {
    border: "1px solid #000000",
    backgroundColor: "#e8e8e8",
    padding: "10px 12px",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "1.3",
    color: "#000000",
  },
  td: {
    border: "1px solid #000000",
    padding: "10px 12px",
    fontSize: "14px",
    verticalAlign: "middle",
  },
  actionBtn: {
    background: "none",
    border: "none",
    color: "#000000",
    textDecoration: "underline",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "14px",
  },
  circleBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    outline: "none",
  },
  circle: {
    display: "inline-block",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "1px solid #000000",
    backgroundColor: "transparent",
    transition: "all 0.2s ease",
  },
  confirmedCircle: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "6px",
    width: "400px",
    maxWidth: "90%",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  modalBody: {
    paddingTop: "15px",
  },
  modalImage: {
    width: "100%",
    borderRadius: "4px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  link: {
    color: "#0066cc",
    textDecoration: "none",
  },
};

export default PaymentRequest;
