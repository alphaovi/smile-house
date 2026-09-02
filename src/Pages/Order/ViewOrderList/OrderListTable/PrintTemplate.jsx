import html2pdf from "html2pdf.js";

// কাস্টম টেমপ্লেট ডিজাইন
const getInvoiceHTML = (data) => `
  <div style="font-family: Arial, sans-serif; padding: 30px; color: #1e293b;">
    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px;">
      <div>
        <h1 style="color: #2563eb; margin: 0;">INVOICE</h1>
        <p style="color: #64748b; margin: 5px 0;">Order No: #${data.orderNo}</p>
      </div>
      <div style="text-align: right;">
        <p style="margin: 0; font-weight: bold;">Dental Lab Services</p>
        <p style="margin: 0; color: #64748b;">Date: ${data.orderDate}</p>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <p><strong>Client:</strong> ${data.clientName}</p>
      <p><strong>Patient Name:</strong> ${data.patientName}</p>
    </div>
    <h2 style="margin-top: 30px; text-align: right;">Total Amount: $${data.amount}</h2>
  </div>
`;

// Direct Browser Print Option
export const executePrint = (type, data) => {
  const printWindow = window.open("", "_blank", "width=850,height=650");
  if (!printWindow) return;

  let contentHtml = "";

  if (type === "invoice") {
    contentHtml = getInvoiceHTML(data);
  } else if (type === "orderForm") {
    contentHtml = `
      <div style="font-family: Arial, sans-serif; padding: 30px;">
        <div style="text-align: center; border: 2px solid #000; padding: 10px; background: #f8fafc;">
          <h2 style="margin: 0;">LAB ORDER FORM</h2>
          <p style="margin: 5px 0 0 0;">Order No: ${data.orderNo}</p>
        </div>
        <div style="margin-top: 20px; font-size: 14px; line-height: 1.8;">
          <p><strong>Client Name:</strong> ${data.clientName}</p>
          <p><strong>Patient Name:</strong> ${data.patientName}</p>
          <p><strong>Order Date:</strong> ${data.orderDate}</p>
          <p><strong>Delivery Date:</strong> ${data.deliveryDate}</p>
          <p><strong>Current Status:</strong> ${data.status}</p>
        </div>
      </div>
    `;
  } else if (type === "label") {
    contentHtml = `
      <div style="font-family: Arial, sans-serif; padding: 15px; border: 2px dashed #000; width: 280px; margin: 20px auto;">
        <h3 style="text-align: center; margin: 0 0 10px 0;">DENTAL LAB STICKER (LP)</h3>
        <p style="margin: 4px 0; font-size: 12px;"><strong>Order:</strong> #${data.orderNo}</p>
        <p style="margin: 4px 0; font-size: 12px;"><strong>Patient:</strong> ${data.patientName}</p>
        <p style="margin: 4px 0; font-size: 12px;"><strong>Doctor:</strong> ${data.clientName}</p>
        <p style="margin: 4px 0; font-size: 12px;"><strong>Delivery:</strong> ${data.deliveryDate}</p>
      </div>
    `;
  }

  printWindow.document.write(`
    <html>
      <head><title>Print ${type}</title></head>
      <body>${contentHtml}</body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

// 📄 ডাইনামিক PDF ফাইল জেনারেটর (ফাইল শেয়ারের জন্য)
export const generatePdfFile = async (data) => {
  const element = document.createElement("div");
  element.innerHTML = getInvoiceHTML(data);

  const opt = {
    margin: 10,
    filename: `Invoice_${data.orderNo}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  const pdfBlob = await html2pdf().from(element).set(opt).outputBlob();
  return new File([pdfBlob], `Invoice_${data.orderNo}.pdf`, {
    type: "application/pdf",
  });
};