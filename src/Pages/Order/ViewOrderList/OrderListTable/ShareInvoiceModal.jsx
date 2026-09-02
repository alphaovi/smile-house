import { useState } from "react";
import { generatePdfFile } from "./PrintTemplate";

const ShareInvoiceModal = ({ isOpen, onClose, row }) => {
  const [loadingApp, setLoadingApp] = useState(null);

  if (!isOpen || !row) return null;

  // প্ল্যাটফর্ম সিলেক্ট করার পর ইনস্ট্যান্ট PDF বানিয়ে শেয়ার করার লজিক
  const handleShareClick = async (platformName) => {
    setLoadingApp(platformName);
    try {
      const pdfFile = await generatePdfFile(row);

      // Web Share API দিয়ে ডিরেক্ট ফাইল পাঠানো (WhatsApp, FB, Mail সহ সব অ্যাপস ডায়ালগ ওপেন হবে)
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: `Invoice #${row.orderNo}`,
          files: [pdfFile],
        });
      } else {
        // ফলব্যাক: ডেসকটপ ব্রাউজারে ডিরেক্ট PDF ডাউনলোড হয়ে যাবে
        const url = URL.createObjectURL(pdfFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = pdfFile.name;
        a.click();
        URL.revokeObjectURL(url);
        alert(`PDF ফাইলটি রেডি হয়ে ডাউনলোড হয়েছে। এবার এটি আপনার ${platformName}-এ শেয়ার করুন।`);
      }
    } catch (error) {
      console.error("PDF share error:", error);
    } finally {
      setLoadingApp(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden p-5">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-bold text-slate-800">Share Invoice PDF</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer">✕</button>
        </div>
        <p className="text-xs text-slate-500 mb-5">Order #{row.orderNo} - Select a platform to share PDF file directly</p>

        {/* 🔹 Flexbox Layout (পাশাপাশি সুন্দর Gap মেইনটেইন করা) */}
        <div className="flex items-center justify-between gap-3">
          {/* WhatsApp Button */}
          <button
            disabled={!!loadingApp}
            onClick={() => handleShareClick("WhatsApp")}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-2 rounded-xl text-xs font-bold text-center cursor-pointer transition shadow-xs flex flex-col items-center justify-center gap-1"
          >
            {loadingApp === "WhatsApp" ? (
              <span className="animate-pulse">⏳ PDF Creating...</span>
            ) : (
              <>
                <span className="text-base">💬</span>
                <span>WhatsApp</span>
              </>
            )}
          </button>

          {/* Facebook Button */}
          <button
            disabled={!!loadingApp}
            onClick={() => handleShareClick("Facebook")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-2 rounded-xl text-xs font-bold text-center cursor-pointer transition shadow-xs flex flex-col items-center justify-center gap-1"
          >
            {loadingApp === "Facebook" ? (
              <span className="animate-pulse">⏳ PDF Creating...</span>
            ) : (
              <>
                <span className="text-base">🌐</span>
                <span>Facebook</span>
              </>
            )}
          </button>

          {/* Email Button */}
          <button
            disabled={!!loadingApp}
            onClick={() => handleShareClick("Email")}
            className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-3 px-2 rounded-xl text-xs font-bold text-center cursor-pointer transition shadow-xs flex flex-col items-center justify-center gap-1"
          >
            {loadingApp === "Email" ? (
              <span className="animate-pulse">⏳ PDF Creating...</span>
            ) : (
              <>
                <span className="text-base">✉️</span>
                <span>Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareInvoiceModal;