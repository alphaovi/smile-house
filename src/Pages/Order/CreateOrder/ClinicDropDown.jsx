import { useState } from "react";

const ClinicDropdown = ({ clinics, selectedClinic, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredClinics = clinics.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        Select Clinic *
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className={selectedClinic ? "text-slate-900 font-semibold" : "text-slate-400"}>
          {selectedClinic ? selectedClinic.name : "Search & Select Clinic..."}
        </span>
        <span className="text-slate-400 text-xs">▼</span>
      </div>

      {isOpen && (
        <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto p-2">
          <input
            type="text"
            placeholder="Type to search clinic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-xs mb-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-y-1">
            {filteredClinics.length > 0 ? (
              filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  onClick={() => {
                    onSelect(clinic);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className="p-2.5 rounded-lg text-xs hover:bg-blue-50 hover:text-blue-600 font-medium cursor-pointer transition-colors"
                >
                  {clinic.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-xs text-slate-400 text-center">No clinic found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicDropdown;