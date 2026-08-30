// styles.js
export const pageWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  backgroundColor: "#f8fafc",
  padding: "20px",
  fontFamily: "'Inter', sans-serif",
};

export const cardStyle = {
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
  padding: "32px",
  border: "1px solid #e2e8f0",
};

export const headerStyle = {
  borderBottom: "1px solid #f1f5f9",
  paddingBottom: "16px",
  marginBottom: "24px",
};

export const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

export const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  width: "100%",
};

export const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
};

export const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
  color: "#0f172a",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

export const customInputContainerStyle = {
  position: "relative",
  cursor: "pointer",
};

export const dateInputStyle = {
  ...inputStyle,
  cursor: "pointer",
};

export const currencySymbolStyle = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#64748b",
  fontWeight: "bold",
};

export const submitButtonStyle = {
  backgroundColor: "#6366f1",
  color: "#ffffff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background-color 0.2s",
};