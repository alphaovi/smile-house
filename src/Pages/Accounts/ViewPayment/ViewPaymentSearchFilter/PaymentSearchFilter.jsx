import { useState, useMemo } from "react";
import SearchableSelect from "../ViewPaymentSearchableSelect/SearchableSelect";
import paymentData from "../../../../../public/data.json"; 

const PaymentSearchFilter = ({ onFilter }) => {
  const [formData, setFormData] = useState({
    clientName: "", // Doctor Name
    officeName: "", // Clinic/Office Name
    officeAddress: "",
    fromDate: "",
    toDate: "",
  });

  // Extract unique Doctors and Clinics for dynamic dropdown options
  const { doctorNames, officeNames, relations } = useMemo(() => {
    const docs = new Set();
    const offices = new Set();
    const relationList = [];

    if (paymentData?.doctors) {
      paymentData.doctors.forEach((doc) => {
        if (doc.doctor_name) docs.add(doc.doctor_name);
        if (doc.clinic_name) offices.add(doc.clinic_name);

        relationList.push({
          doctorName: doc.doctor_name || "",
          officeName: doc.clinic_name || "",
          officeAddress: doc.clinic_address || "N/A",
        });
      });
    }

    return {
      doctorNames: Array.from(docs),
      officeNames: Array.from(offices),
      relations: relationList,
    };
  }, []);

  // Auto-fill form fields based on selected Doctor Name
  const handleClientChange = (selectedDoctor) => {
    const matched = relations.find((r) => r.doctorName === selectedDoctor);
    setFormData((prev) => ({
      ...prev,
      clientName: selectedDoctor,
      officeName: matched ? matched.officeName : prev.officeName,
      officeAddress: matched ? matched.officeAddress : prev.officeAddress,
    }));
  };

  // Auto-fill form fields based on selected Office Name
  const handleOfficeChange = (selectedOffice) => {
    const matched = relations.find((r) => r.officeName === selectedOffice);
    setFormData((prev) => ({
      ...prev,
      officeName: selectedOffice,
      clientName: matched ? matched.doctorName : prev.clientName,
      officeAddress: matched ? matched.officeAddress : prev.officeAddress,
    }));
  };

  // Standard input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit filter state to parent handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(formData);
  };

  return (
    <div className="bg-white rounded-md shadow border border-gray-200 p-4 mb-6">
      <h3 className="text-center font-semibold text-xs text-gray-700 tracking-wider uppercase mb-4">
        Payment Search
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Client (Doctor) Searchable Dropdown */}
          <SearchableSelect
            label="Select Client Name (Doctor)"
            options={doctorNames}
            value={formData.clientName}
            onChange={handleClientChange}
            placeholder="Select or Search Doctor..."
          />

          {/* Office (Clinic) Searchable Dropdown */}
          <SearchableSelect
            label="Office Name (Clinic)"
            options={officeNames}
            value={formData.officeName}
            onChange={handleOfficeChange}
            placeholder="Select or Search Clinic..."
          />

          {/* Office Address (Auto-filled or manual) */}
          <div>
            <label className="block text-gray-600 mb-1">Office Address</label>
            <input
              type="text"
              name="officeAddress"
              placeholder="Office Address"
              value={formData.officeAddress}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Date Filters with trigger on click anywhere inside */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Select From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Select To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              onChange={handleChange}
              className="w-full border rounded p-2 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default PaymentSearchFilter;