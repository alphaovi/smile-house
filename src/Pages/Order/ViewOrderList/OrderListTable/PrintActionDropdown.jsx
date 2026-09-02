import { useState, useRef, useEffect } from "react";
import { executePrint } from "./PrintTemplate";

const PrintActionDropdown = ({ row, onOpenShare }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1.5 rounded-md font-bold text-[10px] cursor-pointer flex items-center gap-1 shadow-xs transition"
      >
        <span>🖨️ Print</span>
        <span className="text-[8px]">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 text-slate-700 font-medium text-xs">
          <button
            onClick={() => { executePrint("invoice", row); setIsOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-2 cursor-pointer"
          >
            📄 Print Invoice
          </button>

          <button
            onClick={() => { executePrint("orderForm", row); setIsOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
          >
            📋 Print Order Form
          </button>

          <button
            onClick={() => { executePrint("label", row); setIsOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
          >
            🏷️ Label Print (LP)
          </button>

          <button
            onClick={() => { onOpenShare(row); setIsOpen(false); }}
            className="w-full text-left px-3 py-2 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-2 border-t border-slate-100 cursor-pointer font-bold text-slate-800"
          >
            📤 Share Invoice PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PrintActionDropdown;