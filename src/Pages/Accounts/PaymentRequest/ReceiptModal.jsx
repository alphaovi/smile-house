

const ReceiptModal = ({ activeReceipt, onClose, styles }) => {
  if (!activeReceipt) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div
        style={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0 }}>Receipt - {activeReceipt.clientName}</h3>
          <button style={styles.closeBtn} onClick={onClose} title="Close">
            &times;
          </button>
        </div>

        <div style={styles.modalBody}>
          <img
            src={activeReceipt.receiptUrl}
            alt="Receipt"
            style={styles.modalImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;