import React from "react";

const RequestOrderPageThree = ({
  orderData,
  onChange,
  uploadedPhotos = [],
  onPrev,
}) => {
  // Shade Group অনুযায়ী নির্দিষ্ট Shade Type Options
  const shadeTypeOptions = {
    "VITA Classic": ["A1", "A2", "A3", "A3.5", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D2", "D3", "D4"],
    "3D Master": ["1M1", "1M2", "2L1.5", "2M1", "2M2", "3M1", "3M2", "4M1", "5M1"],
    "Bleach": ["OM1", "OM2", "OM3", "BL1", "BL2", "BL3", "BL4"],
  };

  // বর্তমান নির্বাচিত Shade Group অনুযায়ী Types পাওয়ার লজিক
  const availableTypes = shadeTypeOptions[orderData.shadeGroup] || shadeTypeOptions["VITA Classic"];

  return (
    <div className="space-y-4 text-xs text-slate-700">
      {/* Shade Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shade Group Dropdown */}
        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Shade Group
          </label>
          <select
            name="shadeGroup"
            value={orderData.shadeGroup || "VITA Classic"}
            onChange={(e) => {
              onChange(e);
              // Group চেঞ্জ হলে টাইপ যাতে ডিফল্ট প্রথমটায় রিসেট হয় (ঐচ্ছিক)
              const newGroup = e.target.value;
              const defaultType = shadeTypeOptions[newGroup]?.[0] || "";
              onChange({ target: { name: "shadeType", value: defaultType } });
            }}
            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white cursor-pointer"
          >
            <option value="VITA Classic">VITA Classic</option>
            <option value="3D Master">3D Master</option>
            <option value="Bleach">Bleach</option>
          </select>
        </div>

        {/* Dynamic Shade Type Dropdown */}
        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Shade Type
          </label>
          <select
            name="shadeType"
            value={orderData.shadeType || availableTypes[0]}
            onChange={onChange}
            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white cursor-pointer"
          >
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Uploaded Images Display Section */}
      <div>
        <label className="block font-semibold mb-2 text-slate-700">
          Uploaded Photos / Clinical Images
        </label>
        
        {uploadedPhotos && uploadedPhotos.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 border border-slate-200 rounded-xl p-3 bg-slate-50">
            {uploadedPhotos.map((photo, index) => {
              // Photo string (URL) বা File Object দুটিই হ্যান্ডেল করার লজিক
              const imageUrl = typeof photo === "string" ? photo : URL.createObjectURL(photo);

              return (
                <div key={index} className="relative group rounded-lg overflow-hidden border border-slate-300 bg-white aspect-square shadow-sm">
                  <img
                    src={imageUrl}
                    alt={`Uploaded attachment ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1 right-1 bg-slate-900/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                    #{index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50">
            <p className="text-slate-400 text-xs italic">No images uploaded for this order.</p>
          </div>
        )}
      </div>

      {/* Comments & Special Instructions */}
      <div>
        <label className="block font-semibold mb-1 text-slate-700">
          Special Instructions / Lab Notes
        </label>
        <textarea
          rows={3}
          name="comment"
          value={orderData.comment || ""}
          onChange={onChange}
          placeholder="Add specific instructions for the dental technician..."
          className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none"
        />
      </div>

      {/* Step Navigation Back Button */}
      <div className="flex justify-start pt-4 border-t">
        <button
          type="button"
          onClick={onPrev}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-bold transition cursor-pointer"
        >
          ⬅ Step 2
        </button>
      </div>
    </div>
  );
};

export default RequestOrderPageThree;