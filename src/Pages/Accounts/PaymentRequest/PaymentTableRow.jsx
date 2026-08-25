

const PaymentTableRow = ({ row, onOpenReceiptModal, onOpenInvoiceAlert, styles }) => {
  return (
    <tr>
      <td style={styles.td}>{row.requestedDate}</td>
      <td style={styles.td}>{row.clinicName}</td>
      <td style={styles.td}>{row.clientName}</td>
      <td style={styles.td}>{row.paymentAmount}</td>
      <td style={styles.td}>
        <button
          onClick={() => onOpenReceiptModal(row)}
          style={styles.actionBtn}
        >
          View
        </button>
      </td>
      <td style={styles.td}>{row.paymentMode}</td>
      <td style={styles.td}>
        <button
          onClick={() => onOpenInvoiceAlert(row)}
          style={styles.actionBtn}
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default PaymentTableRow;