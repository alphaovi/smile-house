

const PaymentModal = ({ activeModal, onClose, onApprove, styles }) => {
  if (!activeModal.type) return null;

  const { type, data } = activeModal;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div
        style={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0 }}>
            {type === "receipt"
              ? `Receipt - ${data.clientName}`
              : `Invoice Details (${data.invoiceNumber})`}
          </h3>
          {/* Top-right Cross Button */}
          <button style={styles.closeBtn} onClick={onClose} title="Close">
            &times;
          </button>
        </div>

        <div style={styles.modalBody}>
          {type === "receipt" ? (
            <img
              src={data.receiptUrl}
              alt="Receipt"
              style={styles.modalImage}
            />
          ) : (
            <div>
              <p>
                <strong>Client:</strong> {data.clientName}
              </p>
              <p>
                <strong>Invoice No:</strong> {data.invoiceNumber}
              </p>
              <p>
                <strong>Amount:</strong> {data.paymentAmount}
              </p>
              <p>
                <strong>Date:</strong> {data.requestedDate}
              </p>
              <p style={{ marginBottom: "15px" }}>
                <a
                  href={data.invoiceUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  Download Full Invoice PDF
                </a>
              </p>

              {/* Action Buttons in Modal Footer */}
              <div style={styles.modalFooter}>
                <button style={styles.cancelBtn} onClick={onClose}>
                  Cancel
                </button>
                <button
                  onClick={() => onApprove(data.id)}
                  style={styles.approveBtn}
                >
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;