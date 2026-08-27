import ShippingAddressSection from "./ShippingAddressSection";

const OrderPageOne = ({
  orderDate, setOrderDate,
  deliveryDate, setDeliveryDate,
  selectedClinic, handleClinicSelect,
  selectedDoctor, handleDoctorSelect,
  demoClinics, caseId,
  patientName, setPatientName,
  patientAge, setPatientAge,
  patientGender, setPatientGender,
  shippingAddress, setShippingAddress,
  handleNextToPage2
}) => {
  return (
    <form onSubmit={handleNextToPage2} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Order Date *</label>
          <input
            type="date"
            value={orderDate}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            onChange={(e) => setOrderDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none cursor-pointer"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Expected Delivery Date *</label>
          <input
            type="date"
            value={deliveryDate}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none cursor-pointer"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select Clinic *</label>
          <select
            value={selectedClinic?.id || ""}
            onChange={(e) => {
              const c = demoClinics.find((item) => item.id === parseInt(e.target.value));
              handleClinicSelect(c);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
            required
          >
            <option value="">-- Select Clinic --</option>
            {demoClinics.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select Doctor *</label>
          <select
            value={selectedDoctor?.name || ""}
            onChange={(e) => handleDoctorSelect(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
            required
          >
            <option value="">-- Select Doctor --</option>
            {demoClinics.map((c) => (
              <option key={c.id} value={c.doctorName}>{c.doctorName}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Generated Case ID</label>
        <input
          type="text"
          value={caseId}
          readOnly
          placeholder="Auto-generated upon selecting clinic..."
          className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-700 outline-none"
        />
      </div>

      <div className="p-6 bg-slate-50/60 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Patient Name *</label>
          <input
            type="text"
            placeholder="Full Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm outline-none"
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
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Gender *</label>
          <select
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Dynamic Address Manager */}
      <ShippingAddressSection
        clinicAddresses={selectedClinic?.addresses || []}
        selectedAddress={shippingAddress}
        onSelectAddress={setShippingAddress}
      />

      <div className="pt-4 flex justify-end">
        <button type="submit" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all">
          Next Step &rarr;
        </button>
      </div>
    </form>
  );
};

export default OrderPageOne;