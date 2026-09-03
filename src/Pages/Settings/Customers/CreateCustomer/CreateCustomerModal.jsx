import { useState, useEffect, useMemo } from "react";
import { X, Eye, EyeOff, Building2, User, MapPin, Phone, Mail, UserCheck, ShieldCheck, Search, ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// JSON ফাইলটি সরাসরি Import করুন (কোথাও Fetch করা লাগবে না)
import rawCountryData from "../../../../data/countriesStates.json"; 

const CreateCustomerModal = ({ isOpen, onClose, onSubmit, nextId = "CUST-003" }) => {
  const defaultPassword = "Clinic@Pass2026";
  const [showPassword, setShowPassword] = useState(false);

  // Parse imported data directly into state
  const countryStateData = useMemo(() => {
    if (Array.isArray(rawCountryData)) {
      return rawCountryData;
    } else if (rawCountryData && Array.isArray(rawCountryData.countries)) {
      return rawCountryData.countries;
    } else if (rawCountryData && typeof rawCountryData === "object") {
      return Object.keys(rawCountryData).map((key) => ({
        name: key,
        states: Array.isArray(rawCountryData[key]) 
          ? rawCountryData[key].map(s => typeof s === "string" ? { name: s } : s) 
          : []
      }));
    }
    return [];
  }, []);

  // Dropdown Open States
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);

  // Search filter states inside dropdowns
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");

  const [formData, setFormData] = useState({
    customerId: nextId,
    clinicName: "",
    attentionName: "",
    country: "",
    state: "",
    area: "",
    address: "",
    phone: "",
    email: "",
    dealingBy: "",
    status: "Active",
    role: "Customer",
    password: defaultPassword,
  });

  // Reset modal state on open
  useEffect(() => {
    if (isOpen) {
      setFormData({
        customerId: nextId,
        clinicName: "",
        attentionName: "",
        country: "",
        state: "",
        area: "",
        address: "",
        phone: "",
        email: "",
        dealingBy: "",
        status: "Active",
        role: "Customer",
        password: defaultPassword,
      });
      setCountrySearch("");
      setStateSearch("");
      setIsCountryOpen(false);
      setIsStateOpen(false);
    }
  }, [isOpen, nextId]);

  // Dynamically update full address
  useEffect(() => {
    const parts = [formData.area, formData.state, formData.country].filter(
      (item) => item && item.trim() !== ""
    );
    setFormData((prev) => ({ ...prev, address: parts.join(", ") }));
  }, [formData.area, formData.state, formData.country]);

  // Safely filter country list
  const filteredCountries = useMemo(() => {
    if (!Array.isArray(countryStateData) || countryStateData.length === 0) return [];
    
    return countryStateData.filter((c) => {
      const name = typeof c === "string" ? c : (c?.name || c?.country || "");
      return name.toLowerCase().includes(countrySearch.toLowerCase());
    });
  }, [countryStateData, countrySearch]);

  // Safely filter state list based on selected country
  const availableStates = useMemo(() => {
    if (!formData.country || !Array.isArray(countryStateData)) return [];

    const selectedC = countryStateData.find((c) => {
      const name = typeof c === "string" ? c : (c?.name || c?.country);
      return name === formData.country;
    });

    if (!selectedC) return [];
    const states = selectedC.states || selectedC.cities || [];
    
    return states.filter((s) => {
      const name = typeof s === "string" ? s : (s?.name || "");
      return name.toLowerCase().includes(stateSearch.toLowerCase());
    });
  }, [countryStateData, formData.country, stateSearch]);

  if (!isOpen) return null;

  const handleSelectCountry = (countryName) => {
    setFormData((prev) => ({
      ...prev,
      country: countryName,
      state: "",
    }));
    setIsCountryOpen(false);
    setCountrySearch("");
  };

  const handleSelectState = (stateName) => {
    setFormData((prev) => ({
      ...prev,
      state: stateName,
    }));
    setIsStateOpen(false);
    setStateSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Confirm Customer Details",
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6; color: #334155;">
          <p><b>Customer ID:</b> ${formData.customerId}</p>
          <p><b>Clinic Name:</b> ${formData.clinicName}</p>
          <p><b>Attention Name:</b> ${formData.attentionName}</p>
          <p><b>Country:</b> ${formData.country || "N/A"}</p>
          <p><b>State:</b> ${formData.state || "N/A"}</p>
          <p><b>Area:</b> ${formData.area || "N/A"}</p>
          <p><b>Full Address:</b> ${formData.address || "N/A"}</p>
          <p><b>Phone:</b> ${formData.phone || "N/A"}</p>
          <p><b>Email:</b> ${formData.email || "N/A"}</p>
          <p><b>Dealing By:</b> ${formData.dealingBy || "N/A"}</p>
          <p><b>Status:</b> ${formData.status}</p>
          <p><b>Role:</b> ${formData.role}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, Save it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmit(formData);

        toast.success("Customer added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 className="text-xl font-semibold tracking-wide">Add New Customer</h3>
            <p className="text-xs text-slate-400 mt-0.5">Fill in the clinic details to register a new account</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* ID and Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Customer ID (Auto Generated)
              </label>
              <input
                type="text"
                value={formData.customerId}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-600 font-mono text-sm font-semibold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                System Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.role}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-600 text-sm font-medium cursor-not-allowed"
                />
                <ShieldCheck className="w-4 h-4 text-emerald-500 absolute right-3.5 top-3" />
              </div>
            </div>
          </div>

          {/* Clinic & Attention */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Clinic Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Smile Dental Clinic"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Attention Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rahim"
                  value={formData.attentionName}
                  onChange={(e) => setFormData({ ...formData, attentionName: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Country & State Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Country Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Country <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsCountryOpen(!isCountryOpen);
                  setIsStateOpen(false);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-left"
              >
                <span>{formData.country || "Select Country"}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isCountryOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-2 max-h-56 overflow-hidden flex flex-col">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 space-y-0.5">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((c, idx) => {
                        const countryName = typeof c === "string" ? c : (c.name || c.country);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectCountry(countryName)}
                            className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-slate-700"
                          >
                            {countryName}
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-xs text-slate-400 p-2 text-center">No countries found</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* State Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                State <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                disabled={!formData.country}
                onClick={() => {
                  setIsStateOpen(!isStateOpen);
                  setIsCountryOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 border rounded-xl text-sm cursor-pointer text-left ${
                  !formData.country
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-50 border-slate-200 text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                }`}
              >
                <span>{formData.state || (formData.country ? "Select State" : "Select Country First")}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isStateOpen && formData.country && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-2 max-h-56 overflow-hidden flex flex-col">
                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search state..."
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 space-y-0.5">
                    {availableStates.length > 0 ? (
                      availableStates.map((s, idx) => {
                        const stateName = typeof s === "string" ? s : (s.name || s.state);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectState(stateName)}
                            className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-slate-700"
                          >
                            {stateName}
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-xs text-slate-400 p-2 text-center">No states found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Area & Full Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Area Name
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Gulshan / Dhanmondi"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Address (Auto Generated)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  readOnly
                  placeholder="Generated address..."
                  value={formData.address}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-600 cursor-not-allowed font-medium"
                />
              </div>
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  placeholder="+880 1700-000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="clinic@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Dealing By & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Dealing By
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Representative name"
                  value={formData.dealingBy}
                  onChange={(e) => setFormData({ ...formData, dealingBy: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Default Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Automated default password generated. Customer can update it later.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerModal;