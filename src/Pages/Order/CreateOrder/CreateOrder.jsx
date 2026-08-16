import { useState } from 'react';
import ClinicDropdown from './ClinicDropDown';
import CaseIdInput from './CaseIdInput';
import ShippingAddressSection from './ShippingAddressSection';


// Demo Central Database Data
const demoClinics = [
  { id: 1, name: "Apex Dental Clinic, Dhanmondi", addresses: ["House 12, Road 5, Dhanmondi, Dhaka"] },
  { id: 2, name: "Smile Care Dental, Gulshan", addresses: ["Plot 45, Avenue 2, Gulshan-1, Dhaka"] },
  { id: 3, name: "City Dental Hospital, Uttara", addresses: ["Sector 4, Main Road, Uttara, Dhaka"] }
];

const existingCaseIds = ["CS-100201", "CS-100202", "CS-889900"]; // Demo DB Case IDs

const workGroups = ["Prosthodontics", "Orthodontics", "Implantology", "Restorative"];
const workTypes = ["Zirconia Crown", "PFM Crown", "Clear Aligners", "Acrylic Denture", "Night Guard"];

const OrderRequest = () => {
  // Form State
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [caseId, setCaseId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [workGroup, setWorkGroup] = useState('');
  const [workType, setWorkType] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingCaseIds.includes(caseId)) {
      alert("Error: Duplicate Case ID found!");
      return;
    }

    const formData = {
      orderDate,
      deliveryDate,
      clinic: selectedClinic?.name,
      caseId,
      patient: { name: patientName, age: patientAge, gender: patientGender },
      workDetails: { group: workGroup, type: workType },
      shippingAddress
    };

    console.log("Order Data Submitted Successfully:", formData);
    alert("New Order Created Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-3xl border border-slate-200/80 shadow-sm my-8">
      {/* Form Title Header */}
      <div className="border-b border-slate-100 pb-6 mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create New Order</h1>
        <p className="text-slate-500 text-sm mt-1">Fill in order specifications, clinic details, and delivery date.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Dates & Clinic */}
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
              setShippingAddress(clinic.addresses[0] || '');
            }}
          />

          <CaseIdInput
            caseId={caseId}
            setCaseId={setCaseId}
            existingIds={existingCaseIds}
          />
        </div>

        {/* Section 2: Patient Info */}
        <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Patient Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Patient Name *</label>
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
              <label className="block text-xs font-semibold text-slate-500 mb-1">Age *</label>
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
              <label className="block text-xs font-semibold text-slate-500 mb-1">Gender *</label>
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

        {/* Section 3: Work Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <option key={idx} value={group}>{group}</option>
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
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 4: Shipping Address */}
        <ShippingAddressSection
          savedAddresses={selectedClinic ? selectedClinic.addresses : []}
          selectedAddress={shippingAddress}
          setSelectedAddress={setShippingAddress}
        />

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderRequest;