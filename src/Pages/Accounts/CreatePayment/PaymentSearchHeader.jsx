import  { useState, useEffect, useRef } from 'react';

const PaymentSearchHeader = ({ 
  clientName, 
  setClientName, 
  clinicName, 
  setClinicName, 
  address, 
  doctorsList, 
  onSelectDoctor, 
  onSelectClinic, 
  
}) => {
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showClinicDropdown, setShowClinicDropdown] = useState(false);

  const doctorDropdownRef = useRef(null);
  const clinicDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (doctorDropdownRef.current && !doctorDropdownRef.current.contains(event.target)) {
        setShowDoctorDropdown(false);
      }
      if (clinicDropdownRef.current && !clinicDropdownRef.current.contains(event.target)) {
        setShowClinicDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter Doctors
  const filteredDoctors = doctorsList.filter((doc) =>
    doc.doctor_name?.toLowerCase().includes(clientName.toLowerCase()) ||
    doc.doctor_id?.toLowerCase().includes(clientName.toLowerCase())
  );

  // Unique & Filtered Clinics
  const uniqueClinics = Array.from(new Set(doctorsList.map((d) => d.clinic_name)));
  const filteredClinics = uniqueClinics.filter((clinic) =>
    clinic?.toLowerCase().includes(clinicName.toLowerCase())
  );

  return (
    <div className="bg-sky-100 p-4 rounded-md mb-6">
      <h1 className="text-2xl font-bold text-center text-sky-600 mb-1">CREATE PAYMENT</h1>
      <p className="text-xs text-center text-sky-500 mb-4">
        (Can be searched by Client or Clinic name. After selecting any from the list, address will be auto filled up.)
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {/* Client / Doctor Search */}
        <div className="relative flex-1 min-w-[200px]" ref={doctorDropdownRef}>
          <input
            type="text"
            placeholder="Client Name Search"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
              setShowDoctorDropdown(true);
            }}
            onFocus={() => setShowDoctorDropdown(true)}
            className="w-full p-2 bg-amber-400 font-semibold placeholder-amber-900 rounded border border-amber-500 focus:outline-none"
          />
          {showDoctorDropdown && filteredDoctors.length > 0 && (
            <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto z-50 text-sm">
              {filteredDoctors.map((doc) => (
                <li
                  key={doc.doctor_id}
                  onClick={() => {
                    onSelectDoctor(doc);
                    setShowDoctorDropdown(false);
                  }}
                  className="p-2 hover:bg-sky-50 cursor-pointer border-b border-gray-100 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-800">{doc.doctor_name}</span>
                  <span className="text-xs text-gray-500">{doc.clinic_name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Clinic Search */}
        <div className="relative flex-1 min-w-[200px]" ref={clinicDropdownRef}>
          <input
            type="text"
            placeholder="Clinic Name Search"
            value={clinicName}
            onChange={(e) => {
              setClinicName(e.target.value);
              setShowClinicDropdown(true);
            }}
            onFocus={() => setShowClinicDropdown(true)}
            className="w-full p-2 bg-amber-400 font-semibold placeholder-amber-900 rounded border border-amber-500 focus:outline-none"
          />
          {showClinicDropdown && filteredClinics.length > 0 && (
            <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto z-50 text-sm">
              {filteredClinics.map((clinic, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    onSelectClinic(clinic);
                    setShowClinicDropdown(false);
                  }}
                  className="p-2 hover:bg-sky-50 cursor-pointer border-b border-gray-100 text-gray-800"
                >
                  {clinic}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Auto-filled Address */}
        <input
          type="text"
          placeholder="Address Auto Fill up"
          value={address}
          readOnly
          className="flex-1 min-w-[200px] p-2 bg-amber-400 font-semibold placeholder-amber-900 rounded border border-amber-500 outline-none cursor-not-allowed"
        />

        {/* Search Button */}
        
      </div>
    </div>
  );
};

export default PaymentSearchHeader;