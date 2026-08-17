import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ClinicDropdown from "./ClinicDropDown";
import CaseIdInput from "./CaseIdInput";
import ShippingAddressSection from "./ShippingAddressSection";
import DoctorDropdown from "./DoctorDropDown";

const demoClinics = [
  {
    id: 1,
    doctorName: "John Apex",
    name: "Apex Dental Clinic, Dhanmondi",
    addresses: ["House 12, Road 5, Dhanmondi, Dhaka"],
  },
  {
    id: 2,
    doctorName: "Jorge N. Weaver",
    name: "Smile Care Dental, Gulshan",
    addresses: ["Plot 45, Avenue 2, Gulshan-1, Dhaka"],
  },
  {
    id: 3,
    doctorName: "Beulah J. Delgado",
    name: "City Dental Hospital, Uttara",
    addresses: ["Sector 4, Main Road, Uttara, Dhaka"],
  },
];

const existingCaseIds = ["CS-100201", "CS-100202", "CS-889900"];
const workGroups = [
  "Prosthodontics",
  "Orthodontics",
  "Implantology",
  "Restorative",
];
const workTypes = [
  "Zirconia Crown",
  "PFM Crown",
  "Clear Aligners",
  "Acrylic Denture",
  "Night Guard",
];

// Dental Chart Teeth Numbers
const upperRightTeeth = [18, 17, 16, 15, 14, 13, 12, 11];
const upperLeftTeeth = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerRightTeeth = [48, 47, 46, 45, 44, 43, 42, 41];
const lowerLeftTeeth = [31, 32, 33, 34, 35, 36, 37, 38];

const CreateOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Form States
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [workGroup, setWorkGroup] = useState("");
  const [workType, setWorkType] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  // Page 2 States
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedJaw, setSelectedJaw] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [caseId, setCaseId] = useState("");
  const [comment, setComment] = useState("");

  // Reset Form
  const resetForm = () => {
    setOrderDate(new Date().toISOString().split("T")[0]);
    setDeliveryDate("");
    setSelectedClinic(null);
    setPatientName("");
    setPatientAge("");
    setPatientGender("Male");
    setWorkGroup("");
    setWorkType("");
    setShippingAddress("");
    setSelectedTeeth([]);
    setSelectedJaw("");
    setSelectedSize("");
    setCaseId("");
    setComment("");
    setCurrentPage(1);
  };

  // Teeth Selection Toggle Handler
  const handleToothClick = (toothNum) => {
    setSelectedTeeth((prev) =>
      prev.includes(toothNum)
        ? prev.filter((t) => t !== toothNum)
        : [...prev, toothNum],
    );
  };

  // Next Page Handler
  const handleNextPage = (e) => {
    e.preventDefault();
    if (!selectedClinic) {
      toast.warning("Please select a clinic!", { position: "top-right" });
      return;
    }
    setCurrentPage(2);
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingCaseIds.includes(caseId)) {
      toast.error("Error: Duplicate Case ID found!", { position: "top-right" });
      return;
    }

    const formData = {
      orderDate,
      deliveryDate,
      clinic: selectedClinic?.name,
      patient: { name: patientName, age: patientAge, gender: patientGender },
      workDetails: { group: workGroup, type: workType },
      shippingAddress,
      dentalDetails: {
        selectedTeeth,
        jaw: selectedJaw,
        size: selectedSize,
      },
      caseId,
      comment,
    };

    console.log("Order Data Submitted Successfully:", formData);
    toast.success("New Order Created Successfully!", { position: "top-right" });

    // Reset Form after Submit
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-3xl border border-slate-200/80 shadow-sm my-8">
      {/* Toast Notification Container (Top Right) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      {/* Step Indicator / Header */}
      <div className="border-b border-slate-100 pb-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Order
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {currentPage === 1
              ? "Step 1: Basic Information & Specifications"
              : "Step 2: Dental Chart & Case Details"}
          </p>
        </div>
        <div className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
          Page {currentPage} of 2
        </div>
      </div>

      {currentPage === 1 ? (
        /* PAGE 1 */
        <form onSubmit={handleNextPage} className="space-y-8">
          {/* Dates & Clinic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Order Date *
              </label>
              <input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Expected Delivery Date *
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <ClinicDropdown
              clinics={demoClinics}
              selectedClinic={selectedClinic}
              onSelect={(clinic) => {
                setSelectedClinic(clinic);
                setShippingAddress(clinic.addresses[0] || "");
              }}
            />
            <DoctorDropdown
              clinics={demoClinics}
              selectedClinic={selectedClinic}
              onSelect={(clinic) => {
                setSelectedClinic(clinic);
                setShippingAddress(clinic.addresses[0] || "");
              }}
            />
          </div>

          {/* Patient Info */}
          <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-4">
            {/* <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Patient Information</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  placeholder="Age"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Gender *
                </label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Case ID Input */}
          <CaseIdInput
            caseId={caseId}
            setCaseId={setCaseId}
            existingIds={existingCaseIds}
          />

          
          {/* Shipping Address */}
          <ShippingAddressSection
            savedAddresses={selectedClinic ? selectedClinic.addresses : []}
            selectedAddress={shippingAddress}
            setSelectedAddress={setShippingAddress}
          />

          {/* Next Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Next Step &rarr;
            </button>
          </div>
        </form>
      ) : (
        /* PAGE 2 */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dental Chart Container */}
          <div className="border border-green-600/30 bg-green-50/20 p-4 rounded-2xl space-y-4">
            {/* Teeth Grid */}
            <div className="bg-emerald-100/60 p-4 rounded-xl space-y-4">
              {/* Work Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Work Group *
                  </label>
                  <select
                    value={workGroup}
                    onChange={(e) => setWorkGroup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">-- Select Work Group --</option>
                    {workGroups.map((group, idx) => (
                      <option key={idx} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Work Type *
                  </label>
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">-- Select Work Type --</option>
                    {workTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Upper Teeth */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between gap-1">
                  {upperRightTeeth.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleToothClick(num)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                        selectedTeeth.includes(num)
                          ? "bg-emerald-600 text-white border-emerald-700"
                          : "bg-emerald-200/50 text-slate-700 border-emerald-300 hover:bg-emerald-300"
                      }`}
                    >
                      <span className="block text-[10px]">{num}</span>
                      🦷
                    </button>
                  ))}
                </div>
                <div className="flex justify-between gap-1">
                  {upperLeftTeeth.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleToothClick(num)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                        selectedTeeth.includes(num)
                          ? "bg-emerald-600 text-white border-emerald-700"
                          : "bg-emerald-200/50 text-slate-700 border-emerald-300 hover:bg-emerald-300"
                      }`}
                    >
                      <span className="block text-[10px]">{num}</span>
                      🦷
                    </button>
                  ))}
                </div>
              </div>

              {/* Lower Teeth */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between gap-1">
                  {lowerRightTeeth.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleToothClick(num)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                        selectedTeeth.includes(num)
                          ? "bg-emerald-600 text-white border-emerald-700"
                          : "bg-emerald-200/50 text-slate-700 border-emerald-300 hover:bg-emerald-300"
                      }`}
                    >
                      🦷
                      <span className="block text-[10px]">{num}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between gap-1">
                  {lowerLeftTeeth.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleToothClick(num)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                        selectedTeeth.includes(num)
                          ? "bg-emerald-600 text-white border-emerald-700"
                          : "bg-emerald-200/50 text-slate-700 border-emerald-300 hover:bg-emerald-300"
                      }`}
                    >
                      🦷
                      <span className="block text-[10px]">{num}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Jaw Options */}
            <div className="grid grid-cols-3 gap-3">
              {["Upper Jaw", "Lower Jaw", "Both Jaw"].map((jaw) => (
                <button
                  key={jaw}
                  type="button"
                  onClick={() => setSelectedJaw(jaw)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    selectedJaw === jaw
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : "bg-emerald-600/80 text-white hover:bg-emerald-700"
                  }`}
                >
                  {jaw}
                </button>
              ))}
            </div>

            {/* Size Options */}
            <div className="grid grid-cols-3 gap-3">
              {["Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    selectedSize === size
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : "bg-emerald-600/80 text-white hover:bg-emerald-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Comment / Instructions
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write any additional instructions or comments here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all"
            >
              &larr; Back
            </button>
            <button
              type="submit"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Submit Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateOrder;
