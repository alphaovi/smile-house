import React from "react";

// =========================================================
// DENTAL TEETH NUMBERS
// =========================================================

const upperRightTeeth = [18, 17, 16, 15, 14, 13, 12, 11];
const upperLeftTeeth = [21, 22, 23, 24, 25, 26, 27, 28];

const lowerRightTeeth = [48, 47, 46, 45, 44, 43, 42, 41];
const lowerLeftTeeth = [31, 32, 33, 34, 35, 36, 37, 38];

// =========================================================
// JAW / SIZE OPTIONS
// =========================================================

const specialArchOptions = [
  "Upper Jaw",
  "Lower Jaw",
  "Both Jaw",
  "Small",
  "Medium",
  "Large",
];

// =========================================================
// WORK GROUP
// =========================================================

const workGroupOptions = [
  "Prosthodontics",
  "Orthodontics",
  "Implantology",
  "Restorative",
];

// =========================================================
// WORK TYPE
// =========================================================

const workTypeOptions = [
  "Zirconia Crown",
  "PFM Crown",
  "Clear Aligners",
  "Acrylic Denture",
  "Night Guard",
];

// =========================================================
// COMPONENT
// =========================================================

const RequestOrderPageTwo = ({
  orderData = {},
  onChange,
  cartItems = [],
  onAddToCart,
  onRemoveCartItem,
  onPrev,
  onNext,
}) => {
  // =======================================================
  // SUBTOTAL & GRAND TOTAL
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
  // RECURSIVE PARSER (Extract Primitive Value)
  // =======================================================

  const parseAnyValue = (input) => {
    if (input === null || input === undefined) return "";

    if (typeof input === "number") return input;

    if (typeof input === "string") return input.trim();

    if (typeof input === "object") {
      // Check common keys directly
      const keysToTry = [
        "number",
        "toothNumber",
        "tooth",
        "value",
        "label",
        "name",
        "description",
        "title",
        "selected",
      ];

      for (const key of keysToTry) {
        if (input[key] !== undefined && input[key] !== null) {
          const extracted = parseAnyValue(input[key]);
          if (extracted !== "") return extracted;
        }
      }

      // If object has other properties, grab the first non-object value
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          const val = input[key];
          if (typeof val === "string" || typeof val === "number") {
            return String(val).trim();
          }
        }
      }
    }

    return "";
  };

  // =======================================================
  // CHECK IF VALUE IS A TOOTH NUMBER
  // =======================================================

  const isTooth = (selection) => {
    const parsed = parseAnyValue(selection);

    if (typeof parsed === "number") return true;

    if (typeof parsed === "string") {
      const clean = parsed.replace(/^Tooth\s*#/i, "").trim();
      return /^\d+$/.test(clean);
    }

    return false;
  };

  // =======================================================
  // GET DISPLAY VALUE FOR CART
  // =======================================================

  const getDisplayValue = (item) => {
    // Try multiple possible sources from item object
    const rawValue =
      item?.description ??
      item?.selection ??
      item?.toothNumber ??
      item?.tooth ??
      item;

    const parsed = parseAnyValue(rawValue);

    if (parsed === "" || parsed === null || parsed === undefined) {
      return "";
    }

    const strValue = String(parsed).trim();

    // If it's already formatted as "Tooth #..."
    if (/^Tooth\s*#/i.test(strValue)) {
      return strValue;
    }

    // If it's purely numeric or single/double digits (Tooth)
    if (/^\d+$/.test(strValue)) {
      return `Tooth #${strValue}`;
    }

    // Jaw / Size / Text (e.g. "Upper Jaw", "Medium", "Prosthodontics - Zirconia Crown")
    return strValue;
  };

  // =======================================================
  // GET ITEM PRICE
  // =======================================================

  const getItemPrice = (selection) => {
    const val = String(parseAnyValue(selection)).trim();

    if (isTooth(selection)) return 50;

    if (val === "Both Jaw") return 150;
    if (val === "Upper Jaw" || val === "Lower Jaw") return 90;
    if (["Small", "Medium", "Large"].includes(val)) return 50;

    return 50;
  };

  // =======================================================
  // ADD ITEM
  // =======================================================

  const handleAddItem = (selection) => {
    if (!orderData.workGroup) {
      alert("দয়া করে প্রথমে Work Group নির্বাচন করুন।");
      return;
    }

    if (!orderData.workType) {
      alert("দয়া করে প্রথমে Work Type নির্বাচন করুন।");
      return;
    }

    const parsedVal = parseAnyValue(selection);

    if (parsedVal === "") return;

    const isToothNum = isTooth(selection);
    const cleanNum = String(parsedVal).replace(/^Tooth\s*#/i, "").trim();

    // Clean description format
    const description = isToothNum
      ? `Tooth #${cleanNum}`
      : String(parsedVal);

    const price = getItemPrice(selection);

    const newItem = {
      id: Date.now() + Math.random(),
      itemName: `${orderData.workGroup} - ${orderData.workType}`,
      description: description,
      price: price,
      workGroup: orderData.workGroup,
      workType: orderData.workType,
      selection: parsedVal,
    };

    if (typeof onAddToCart === "function") {
      onAddToCart(newItem);
    }
  };

  // =======================================================
  // TOOTH BUTTON
  // =======================================================

  const renderToothButton = (toothNumber) => {
    return (
      <button
        key={toothNumber}
        type="button"
        onClick={() => handleAddItem(toothNumber)}
        title={`Add Tooth #${toothNumber}`}
        className="w-8 h-9 bg-emerald-100 hover:bg-emerald-600 border border-emerald-300 hover:border-emerald-600 rounded-md font-semibold text-emerald-900 hover:text-white transition flex flex-col items-center justify-center shadow-sm cursor-pointer"
      >
        <span className="text-[10px] leading-none opacity-50">🦷</span>
        <span className="text-[11px] leading-none">{toothNumber}</span>
      </button>
    );
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderData.workGroup) {
      alert("দয়া করে Work Group নির্বাচন করুন।");
      return;
    }

    if (!orderData.workType) {
      alert("দয়া করে Work Type নির্বাচন করুন।");
      return;
    }

    if (typeof onNext === "function") {
      onNext(e);
    }
  };

  // =======================================================
  // JSX
  // =======================================================

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
      {/* WORK GROUP + WORK TYPE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-bold mb-1 text-slate-700 uppercase tracking-wide">
            Work Group <span className="text-red-500">*</span>
          </label>
          <select
            name="workGroup"
            value={orderData.workGroup || ""}
            onChange={onChange}
            required
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition font-medium text-slate-700"
          >
            <option value="">-- Select Work Group --</option>
            {workGroupOptions.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-1 text-slate-700 uppercase tracking-wide">
            Work Type <span className="text-red-500">*</span>
          </label>
          <select
            name="workType"
            value={orderData.workType || ""}
            onChange={onChange}
            required
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition font-medium text-slate-700"
          >
            <option value="">-- Select Work Type --</option>
            {workTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DENTAL CHART */}
      <div className="border border-emerald-200/60 rounded-2xl p-4 bg-emerald-50/20">
        <p className="font-bold text-emerald-800 mb-3 text-xs uppercase tracking-wide">
          Select Tooth (Click to Add Item to Cart)
        </p>

        {/* TEETH */}
        <div className="bg-emerald-100/50 border border-emerald-200/50 p-3 rounded-xl mb-3">
          <div className="flex justify-center flex-wrap gap-1.5 mb-2">
            {upperRightTeeth.map((num) => renderToothButton(num))}
            <div className="border-r-2 border-emerald-300/80 mx-1 h-8 self-center" />
            {upperLeftTeeth.map((num) => renderToothButton(num))}
          </div>

          <div className="flex justify-center flex-wrap gap-1.5">
            {lowerRightTeeth.map((num) => renderToothButton(num))}
            <div className="border-r-2 border-emerald-300/80 mx-1 h-8 self-center" />
            {lowerLeftTeeth.map((num) => renderToothButton(num))}
          </div>
        </div>

        {/* JAW / SIZE */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {specialArchOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAddItem(option)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition shadow-sm cursor-pointer text-center"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* CART TABLE */}
      <div>
        <h4 className="font-bold text-slate-800 mb-2">Selected Items Cart</h4>

        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="p-2.5 font-bold text-slate-700">Item Name</th>
                  <th className="p-2.5 font-bold text-slate-700">
                    Tooth Description
                  </th>
                  <th className="p-2.5 font-bold text-slate-700">Price ($)</th>
                  <th className="p-2.5 text-center font-bold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => {
                    const safeDescription = getDisplayValue(item);
                    const safeItemName =
                      typeof item?.itemName === "string"
                        ? item.itemName
                        : getDisplayValue(item?.itemName);

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-slate-200 hover:bg-slate-50 transition"
                      >
                        <td className="p-2.5 font-semibold text-slate-800">
                          {safeItemName}
                        </td>
                        <td className="p-2.5 font-medium text-slate-600">
                          {safeDescription}
                        </td>
                        <td className="p-2.5 font-bold text-emerald-600">
                          ${Number(item?.price) || 0}
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof onRemoveCartItem === "function") {
                                onRemoveCartItem(item.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-700 font-bold transition cursor-pointer"
                          >
                            ✕ Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-center text-slate-400 italic"
                    >
                      No teeth or jaw items added yet. Click on tooth number or
                      jaw option above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t pt-3">
        <div>
          <label className="block text-slate-600 font-semibold mb-1">
            Subtotal ($)
          </label>
          <input
            type="number"
            value={subTotal}
            readOnly
            className="w-full border border-slate-300 rounded-lg p-2 bg-slate-100 font-bold text-slate-700 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">
            Additional Charge ($)
          </label>
          <input
            type="number"
            name="additionalCharge"
            value={orderData.additionalCharge || 0}
            onChange={onChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
          />
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">
            Discount ($)
          </label>
          <input
            type="number"
            name="discount"
            value={orderData.discount || 0}
            onChange={onChange}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
          />
        </div>
      </div>

      {/* GRAND TOTAL */}
      <div className="flex justify-between items-center text-sm font-extrabold text-blue-700 bg-blue-50 p-3 rounded-xl border border-blue-200">
        <span>Grand Total:</span>
        <span className="text-base">${grandTotal}</span>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between pt-4 border-t">
        <button
          type="button"
          onClick={onPrev}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-bold transition cursor-pointer"
        >
          ⬅ Step 1
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition cursor-pointer"
        >
          Next: Shade & Photos ➔
        </button>
      </div>
    </form>
  );
};

export default RequestOrderPageTwo;