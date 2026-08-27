import { useState, useEffect } from "react";
// Fake Data Import (পরে আসল API Fetch দিয়ে বদলে নিবে)
import { mockMasterData } from "../../../../services/mockBackendData";

const RequestOrderPageTwo = ({
  orderData = {},
  onChange,
  cartItems = [],
  onAddToCart,
  onRemoveCartItem,
  onPrev,
  onNext,
}) => {
  // ব্যাকএন্ড ডাটা স্টেট
  const [masterData, setMasterData] = useState({
    workGroups: [],
    workTypes: [],
    teethNumbers: { upperRight: [], upperLeft: [], lowerRight: [], lowerLeft: [] },
    jawOptions: [],
  });

  // ১. ব্যাকএন্ড থেকে ডাটা লোড করার সিমুলেশন (API integration point)
  useEffect(() => {
    setMasterData(mockMasterData);
  }, []);

  // =======================================================
  // PRICING CALCULATIONS
  // =======================================================
  const subTotal = cartItems.reduce(
    (acc, item) => acc + (Number(item?.price) || 0),
    0
  );

  const grandTotal =
    subTotal +
    Number(orderData.additionalCharge || 0) -
    Number(orderData.discount || 0);

  // =======================================================
  // ITEM ADD HANDLER
  // =======================================================
  const handleAddItem = (selection) => {
    if (!orderData.workGroup) {
      alert("Please select Work Group first.");
      return;
    }

    if (!orderData.workType) {
      alert("Please select Work Type first.");
      return;
    }

    const isToothNum = typeof selection === "number" || /^\d+$/.test(selection);
    const description = isToothNum ? `Tooth #${selection}` : String(selection);

    let price = 60; 
    if (selection === 16 || selection === "16") price = 3000;

    const newItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      itemName: orderData.workType,
      description: description,
      price: price,
      workGroup: orderData.workGroup,
      workType: orderData.workType,
      selection: String(selection),
    };

    if (typeof onAddToCart === "function") {
      onAddToCart(newItem);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onNext === "function") {
      onNext(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
      {/* WORK GROUP & WORK TYPE DROPDOWNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold mb-1.5 text-slate-700 uppercase tracking-wide text-[11px]">
            WORK GROUP <span className="text-red-500">*</span>
          </label>
          <select
            name="workGroup"
            value={orderData.workGroup || ""}
            onChange={onChange}
            required
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition font-medium text-slate-700 cursor-pointer"
          >
            <option value="">-- Select Work Group --</option>
            {masterData.workGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-1.5 text-slate-700 uppercase tracking-wide text-[11px]">
            WORK TYPE <span className="text-red-500">*</span>
          </label>
          <select
            name="workType"
            value={orderData.workType || ""}
            onChange={onChange}
            required
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition font-medium text-slate-700 cursor-pointer"
          >
            <option value="">-- Select Work Type --</option>
            {masterData.workTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DENTAL CHART CONTAINER */}
      <div className="border border-emerald-300/70 rounded-2xl p-4 bg-emerald-50/20">
        <p className="font-bold text-emerald-800 mb-3 text-[11px] uppercase tracking-wide">
          SELECT TOOTH (CLICK TO ADD ITEM TO CART)
        </p>

        {/* TEETH GRID */}
        <div className="bg-emerald-50/60 border border-emerald-200/60 p-4 rounded-xl mb-3">
          {/* UPPER TEETH */}
          <div className="flex justify-center items-center gap-1.5 mb-2">
            {masterData.teethNumbers.upperRight.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleAddItem(num)}
                className="w-8 h-9 bg-emerald-100/60 hover:bg-emerald-600 border border-emerald-300/80 hover:border-emerald-600 rounded-md font-semibold text-emerald-900 hover:text-white transition flex flex-col items-center justify-center cursor-pointer shadow-2xs"
              >
                <span className="text-[10px] opacity-40 leading-none mb-0.5">🦷</span>
                <span className="text-[10px] font-bold leading-none">{num}</span>
              </button>
            ))}

            <div className="border-r border-emerald-400 mx-1.5 h-8 opacity-60" />

            {masterData.teethNumbers.upperLeft.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleAddItem(num)}
                className="w-8 h-9 bg-emerald-100/60 hover:bg-emerald-600 border border-emerald-300/80 hover:border-emerald-600 rounded-md font-semibold text-emerald-900 hover:text-white transition flex flex-col items-center justify-center cursor-pointer shadow-2xs"
              >
                <span className="text-[10px] opacity-40 leading-none mb-0.5">🦷</span>
                <span className="text-[10px] font-bold leading-none">{num}</span>
              </button>
            ))}
          </div>

          {/* LOWER TEETH */}
          <div className="flex justify-center items-center gap-1.5">
            {masterData.teethNumbers.lowerRight.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleAddItem(num)}
                className="w-8 h-9 bg-emerald-100/60 hover:bg-emerald-600 border border-emerald-300/80 hover:border-emerald-600 rounded-md font-semibold text-emerald-900 hover:text-white transition flex flex-col items-center justify-center cursor-pointer shadow-2xs"
              >
                <span className="text-[10px] opacity-40 leading-none mb-0.5">🦷</span>
                <span className="text-[10px] font-bold leading-none">{num}</span>
              </button>
            ))}

            <div className="border-r border-emerald-400 mx-1.5 h-8 opacity-60" />

            {masterData.teethNumbers.lowerLeft.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleAddItem(num)}
                className="w-8 h-9 bg-emerald-100/60 hover:bg-emerald-600 border border-emerald-300/80 hover:border-emerald-600 rounded-md font-semibold text-emerald-900 hover:text-white transition flex flex-col items-center justify-center cursor-pointer shadow-2xs"
              >
                <span className="text-[10px] opacity-40 leading-none mb-0.5">🦷</span>
                <span className="text-[10px] font-bold leading-none">{num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* JAW / SIZE BUTTONS */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {masterData.jawOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAddItem(option)}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-2 px-3 rounded-lg text-xs transition shadow-2xs cursor-pointer text-center"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* SELECTED ITEMS CART TABLE */}
      <div>
        <h4 className="font-bold text-slate-800 mb-2.5 text-xs">
          Selected Items Cart
        </h4>

        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 text-[11px]">
                <tr>
                  <th className="p-3 font-bold">Item Name</th>
                  <th className="p-3 font-bold">Tooth Description</th>
                  <th className="p-3 font-bold">Price ($)</th>
                  <th className="p-3 text-right font-bold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition"
                    >
                      <td className="p-3 font-medium text-slate-800">
                        {item.itemName || item.workType}
                      </td>
                      <td className="p-3 text-slate-600 font-medium">
                        {item.description}
                      </td>
                      <td className="p-3 font-bold text-emerald-600">
                        ${item.price}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof onRemoveCartItem === "function") {
                              onRemoveCartItem(item.id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 font-semibold transition cursor-pointer text-[11px]"
                        >
                          ✕ Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-center text-slate-400 italic"
                    >
                      No items selected yet. Click on any tooth or jaw option above to add.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PRICE BREAKDOWN INPUTS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t pt-3">
        <div>
          <label className="block text-slate-600 font-bold mb-1 text-[11px]">
            Subtotal ($)
          </label>
          <input
            type="number"
            value={subTotal}
            readOnly
            className="w-full border border-slate-200 rounded-lg p-2 bg-slate-100 font-bold text-slate-700 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-600 font-bold mb-1 text-[11px]">
            Additional Charge ($)
          </label>
          <input
            type="number"
            name="additionalCharge"
            value={orderData.additionalCharge ?? 0}
            onChange={onChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
          />
        </div>

        <div>
          <label className="block text-slate-600 font-bold mb-1 text-[11px]">
            Discount ($)
          </label>
          <input
            type="number"
            name="discount"
            value={orderData.discount ?? 0}
            onChange={onChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
          />
        </div>
      </div>

      {/* GRAND TOTAL DISPLAY */}
      <div className="flex justify-between items-center text-sm font-bold text-blue-800 bg-blue-50/80 p-3.5 rounded-xl border border-blue-200/80">
        <span>Grand Total:</span>
        <span className="text-lg font-extrabold">${grandTotal}</span>
      </div>

      {/* BUTTON FOOTER */}
      <div className="flex justify-between pt-3 border-t">
        <button
          type="button"
          onClick={onPrev}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5"
        >
          <span>⬅</span> Step 1
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition cursor-pointer shadow-sm"
        >
          Next: Shade & Photos ➔
        </button>
      </div>
    </form>
  );
};

export default RequestOrderPageTwo;