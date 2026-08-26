import React, { useRef, useState } from "react";

const RequestOrderPageOne = ({
  orderData = {},
  onChange,
  onNext,
}) => {
  // =========================================================
  // ADDRESS STATE
  // =========================================================

  const [addressList, setAddressList] = useState([
    orderData.shippingAddress || "Dhaka, Bangladesh",
    "Gulshan 2, Dhaka, Bangladesh",
    "Dhanmondi 32, Dhaka, Bangladesh",
    "Uttara Sector 7, Dhaka, Bangladesh",
  ]);

  const [addressError, setAddressError] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState("");

  // Native calendar reference
  const deliveryDateRef = useRef(null);

  // =========================================================
  // DATE FUNCTIONS
  // =========================================================

  // Today => YYYY-MM-DD
  const getTodayISODate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Today => DD-MM-YYYY
  const getTodayFormattedDate = () => {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // YYYY-MM-DD => DD-MM-YYYY
  const formatDateToDDMMYYYY = (dateValue) => {
    if (!dateValue) return "";

    // Already DD-MM-YYYY
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateValue)) {
      return dateValue;
    }

    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      const [year, month, day] = dateValue.split("-");

      return `${day}-${month}-${year}`;
    }

    return "";
  };

  const todayISODate = getTodayISODate();
  const todayFormatted = getTodayFormattedDate();

  // =========================================================
  // ORDER DATE
  // =========================================================

  const orderDateDisplay = orderData.orderDate
    ? formatDateToDDMMYYYY(orderData.orderDate)
    : todayFormatted;

  // =========================================================
  // DELIVERY DATE
  // =========================================================

  const deliveryDateDisplay = formatDateToDDMMYYYY(
    orderData.deliveryDate
  );

  // =========================================================
  // OPEN CALENDAR
  // =========================================================

  const openDeliveryDatePicker = () => {
    const input = deliveryDateRef.current;

    if (!input) return;

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.focus();
        input.click();
      }
    } catch (error) {
      input.focus();
      input.click();
    }
  };

  // =========================================================
  // DELIVERY DATE CHANGE
  // =========================================================

  const handleDeliveryDateChange = (e) => {
    const selectedDate = e.target.value;

    onChange({
      target: {
        name: "deliveryDate",
        value: selectedDate,
      },
    });
  };

  // =========================================================
  // ADDRESS HANDLERS
  // =========================================================

  const handleToggleAddInput = () => {
    if (addressList.length >= 5) {
      setAddressError(
        "আপনার সর্বোচ্চ ৫টি ঠিকানা যুক্ত করা আছে। নতুন ঠিকানা যোগ করতে প্রোফাইল থেকে কোনো একটি ঠিকানা ডিলিট করুন।"
      );
      return;
    }

    setAddressError("");
    setIsAddingAddress(true);
  };

  const handleSaveAddressOnBlur = () => {
    const trimmed = newAddressInput.trim();

    if (trimmed) {
      const updatedList = [...addressList, trimmed];

      setAddressList(updatedList);
      setAddressError("");

      onChange({
        target: {
          name: "shippingAddress",
          value: trimmed,
        },
      });
    }

    setNewAddressInput("");
    setIsAddingAddress(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveAddressOnBlur();
    }
  };

  // =========================================================
  // NEXT BUTTON / FORM SUBMIT
  // =========================================================

  const handleFormSubmit = (e) => {
    // Browser default submit বন্ধ
    e.preventDefault();

    // Delivery Date validation
    if (!orderData.deliveryDate) {
      alert("দয়া করে Delivery Date নির্বাচন করুন।");
      return;
    }

    // Patient Name validation
    if (
      !orderData.patientName ||
      !orderData.patientName.trim()
    ) {
      alert("দয়া করে Patient Name প্রদান করুন।");
      return;
    }

    // Everything valid হলে next page এ যাবে
    if (typeof onNext === "function") {
      onNext();
    } else {
      console.error(
        "RequestOrderPageOne: onNext function পাওয়া যায়নি।"
      );
    }
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="space-y-4 text-xs text-slate-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* =====================================================
            ORDER DATE
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Order Date
          </label>

          <input
            type="text"
            name="orderDate"
            value={orderDateDisplay}
            readOnly
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-100 font-bold text-slate-700 outline-none cursor-not-allowed"
          />
        </div>

        {/* =====================================================
            DELIVERY DATE
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Delivery Date{" "}
            <span className="text-red-500">*</span>
          </label>

          {/* পুরো field click করলে calendar open হবে */}
          <div
            onClick={openDeliveryDatePicker}
            className="relative w-full cursor-pointer"
          >
            {/* Visible Date Field */}
            <input
              type="text"
              value={deliveryDateDisplay}
              placeholder="DD-MM-YYYY"
              readOnly
              className="w-full border border-slate-300 rounded-lg p-2.5 pr-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition cursor-pointer bg-white"
            />

            {/* Calendar Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  width="18"
                  height="18"
                  x="3"
                  y="4"
                  rx="2"
                  ry="2"
                />

                <line
                  x1="16"
                  x2="16"
                  y1="2"
                  y2="6"
                />

                <line
                  x1="8"
                  x2="8"
                  y1="2"
                  y2="6"
                />

                <line
                  x1="3"
                  x2="21"
                  y1="10"
                  y2="10"
                />
              </svg>
            </div>

            {/* Hidden Native Date Picker */}
            <input
              ref={deliveryDateRef}
              type="date"
              name="deliveryDatePicker"
              min={todayISODate}
              value={orderData.deliveryDate || ""}
              onChange={handleDeliveryDateChange}
              tabIndex={-1}
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none w-0 h-0"
            />
          </div>
        </div>

        {/* =====================================================
            CLINIC NAME
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Clinic Name
          </label>

          <input
            type="text"
            name="clinicName"
            value={orderData.clinicName || ""}
            readOnly
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-100 font-bold text-slate-600 outline-none cursor-not-allowed"
          />
        </div>

        {/* =====================================================
            DOCTOR / CLIENT NAME
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Doctor / Client Name
          </label>

          <input
            type="text"
            name="clientName"
            value={orderData.clientName || ""}
            readOnly
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-100 font-bold text-slate-600 outline-none cursor-not-allowed"
          />
        </div>

        {/* =====================================================
            ORDER / CASE ID
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Order / Case ID
          </label>

          <input
            type="text"
            name="orderNo"
            value={orderData.orderNo || ""}
            readOnly
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-100 font-bold text-slate-600 outline-none cursor-not-allowed"
          />
        </div>

        {/* =====================================================
            PATIENT NAME
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Patient Name{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="patientName"
            value={orderData.patientName || ""}
            onChange={onChange}
            placeholder="Enter Patient Full Name"
            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* =====================================================
            PATIENT AGE
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Patient Age
          </label>

          <input
            type="number"
            name="patientAge"
            value={orderData.patientAge || ""}
            onChange={onChange}
            placeholder="e.g. 32"
            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* =====================================================
            GENDER
        ====================================================== */}

        <div>
          <label className="block font-semibold mb-1 text-slate-700">
            Gender
          </label>

          <select
            name="patientGender"
            value={orderData.patientGender || "Male"}
            onChange={onChange}
            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* =======================================================
          SHIPPING ADDRESS
      ======================================================== */}

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="font-semibold text-slate-700">
            Shipping Address
          </label>

          <button
            type="button"
            onClick={handleToggleAddInput}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
          >
            + Add Address ({addressList.length}/5)
          </button>
        </div>

        {/* Address Dropdown */}
        <select
          name="shippingAddress"
          value={
            orderData.shippingAddress || addressList[0]
          }
          onChange={onChange}
          className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white font-medium"
        >
          {addressList.map((addr, idx) => (
            <option key={idx} value={addr}>
              {addr}
            </option>
          ))}
        </select>

        {/* New Address */}
        {isAddingAddress && (
          <div className="mt-2">
            <input
              type="text"
              autoFocus
              value={newAddressInput}
              onChange={(e) =>
                setNewAddressInput(e.target.value)
              }
              onBlur={handleSaveAddressOnBlur}
              onKeyDown={handleKeyDown}
              placeholder="নতুন ঠিকানা লিখুন এবং বাইরে ক্লিক করুন..."
              className="w-full border border-blue-400 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none transition bg-blue-50/30 text-slate-800"
            />

            <p className="text-[10px] text-slate-400 mt-1">
              * ঠিকানা লেখা শেষে বাইরে যেকোনো স্থানে ক্লিক করলে
              তা স্বয়ংক্রিয়ভাবে সেভ হবে।
            </p>
          </div>
        )}

        {/* Address Error */}
        {addressError && (
          <p className="text-[11px] text-red-500 mt-1.5 font-medium">
            ⚠️ {addressError}
          </p>
        )}
      </div>

      {/* =======================================================
          FOOTER / NEXT BUTTON
      ======================================================== */}

      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer"
        >
          Next: Dental Chart ➔
        </button>
      </div>
    </form>
  );
};

export default RequestOrderPageOne;