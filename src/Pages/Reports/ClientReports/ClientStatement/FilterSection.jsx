import {
  Calendar,
  Filter,
  Building2,
  UserCheck,
  Search,
  MapPin,
  DollarSign,
} from "lucide-react";

const FilterSection = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  selectedState,
  setSelectedState,
  selectedClinic,
  setSelectedClinic,
  selectedDoctor,
  setSelectedDoctor,
  searchDoctorText,
  setSearchDoctorText,
  paymentStatus,
  setPaymentStatus,
  autoAddress,
  statesList,
  filteredClinics,
  filteredDoctors,
  reportData,
  handleSearch,
}) => {
  const handleDoctorChange = (docId) => {
    setSelectedDoctor(docId);
    if (docId) {
      const matchDoc = (reportData || []).find(
        (item) => String(item.doctorId) === String(docId),
      );
      if (matchDoc) {
        setSelectedClinic(String(matchDoc.clinicId));
        if (matchDoc.state) setSelectedState(matchDoc.state);
      }
    }
  };

  const handleClinicChange = (clinicId) => {
    setSelectedClinic(clinicId);
    if (clinicId) {
      const matchClinic = (reportData || []).find(
        (item) => String(item.clinicId) === String(clinicId),
      );
      if (matchClinic) {
        setSelectedDoctor(String(matchClinic.doctorId));
        if (matchClinic.state) setSelectedState(matchClinic.state);
      }
    }
  };

  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    setSelectedClinic("");
    setSelectedDoctor("");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* FROM DATE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" /> FROM DATE
          </label>
          <input
            type="date"
            value={fromDate}
            onClick={(e) => e.target.showPicker?.()}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
          />
        </div>

        {/* TO DATE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" /> TO DATE
          </label>
          <input
            type="date"
            value={toDate}
            onClick={(e) => e.target.showPicker?.()}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
          />
        </div>

        {/* STATE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" /> STATE
          </label>
          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="All">All States</option>
            {statesList?.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* DOCTOR SELECT */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" /> DOCTOR
            </label>
            <div className="relative flex items-center">
              <Search className="w-3 h-3 text-slate-400 absolute left-2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchDoctorText}
                onChange={(e) => setSearchDoctorText(e.target.value)}
                className="w-24 bg-slate-100 border border-slate-200 rounded-lg pl-6 pr-2 py-0.5 text-[11px] text-slate-700 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
          <select
            value={selectedDoctor}
            onChange={(e) => handleDoctorChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="" disabled hidden>
              -- Select Doctor --
            </option>
            {filteredDoctors?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* CLINIC SELECT */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" /> CLINIC
          </label>
          <select
            value={selectedClinic}
            onChange={(e) => handleClinicChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="" disabled hidden>
              -- Select Clinic --
            </option>
            {filteredClinics?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* AUTO ADDRESS */}
        <div className="space-y-1.5 lg:col-span-2">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" /> ADDRESS (AUTO FILLED)
          </label>
          <input
            type="text"
            readOnly
            value={autoAddress}
            className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-500 cursor-not-allowed italic"
          />
        </div>

        {/* PAYMENT STATUS */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-600" /> PAYMENT STATUS
          </label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full bg-amber-50 border border-amber-300 rounded-2xl px-4 py-2.5 text-sm font-bold text-amber-900 focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
          >
            <option value="none">-- Select Status --</option>
            <option value="all">ALL</option>
            <option value="paid">PAID</option>
            <option value="unpaid">UNPAID</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Search className="w-4 h-4" /> Load Payment Summary
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
