import { useState, useEffect, useMemo } from "react";
import Filters from "./Filters";
import SummaryTable from "./SummaryTable";

const WorkSummary = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Date States
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filters State
  const [filters, setFilters] = useState({
    state: "",
    doctor: "",
    clinic: "",
    sr: "",
    status: "",
  });

  // Fetch report data on component mount
  useEffect(() => {
    fetch("/report.json")
      .then((res) => res.json())
      .then((data) => {
        setReportData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading report data:", err);
        setLoading(false);
      });
  }, []);

  // Handle filter state updates and dependent dropdown logic
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };

      // Reset doctor and clinic when SR changes
      if (key === "sr") {
        updated.doctor = "";
        updated.clinic = "";
      }

      // Automatically sync clinic when a doctor is selected or deselected
      if (key === "doctor") {
        if (value) {
          const docRecord = reportData.find((item) => item.doctorId === value);
          if (docRecord) updated.clinic = docRecord.clinicId;
        } else {
          // Reset clinic to "All Clinics" when doctor filter is cleared
          updated.clinic = "";
        }
      }

      // Automatically sync doctor when a clinic is selected or deselected
      if (key === "clinic") {
        if (value) {
          const clinicRecord = reportData.find((item) => item.clinicId === value);
          if (clinicRecord) updated.doctor = clinicRecord.doctorId;
        } else {
          // Reset doctor to "All Doctors" when "All Clinics" is selected
          updated.doctor = "";
        }
      }

      return updated;
    });
  };

  // Handle date input changes
  const handleDateChange = (type, val) => {
    if (type === "startDate") setStartDate(val);
    if (type === "endDate") setEndDate(val);
  };

  // Extract unique states for dropdown options
  const uniqueStates = useMemo(
    () => Array.from(new Set(reportData.map((i) => i.state))),
    [reportData]
  );

  // Extract unique statuses for dropdown options
  const uniqueStatuses = useMemo(
    () => Array.from(new Set(reportData.map((i) => i.status))),
    [reportData]
  );

  // Filter dataset based on selected date range and filter dropdowns
  const filteredData = useMemo(() => {
    return reportData.filter((item) => {
      // Date range filter
      if (startDate || endDate) {
        const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
        const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
        const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        if (start && itemDate < start) return false;
        if (end && itemDate > end) return false;
      }

      // Dropdown filters
      if (filters.state && item.state !== filters.state) return false;
      if (filters.sr && item.srId !== filters.sr) return false;
      if (filters.doctor && item.doctorId !== filters.doctor) return false;
      if (filters.clinic && item.clinicId !== filters.clinic) return false;
      if (filters.status && item.status !== filters.status) return false;

      return true;
    });
  }, [reportData, startDate, endDate, filters]);

  // Calculate total revenue from filtered records
  const totalAmount = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.price, 0),
    [filteredData]
  );

  // Calculate dynamic status count card based on selected status filter
  const activeStatusLabel = filters.status ? filters.status : "Delivered";
  const statusCardCount = useMemo(() => {
    const targetStatus = filters.status || "Delivered";
    return filteredData.filter((i) => i.status === targetStatus).length;
  }, [filteredData, filters.status]);

  // Reset all filters and date states
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilters({ state: "", doctor: "", clinic: "", sr: "", status: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 font-medium animate-pulse">
          Loading report details...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Work Summary Report
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Filter and analyze orders by dates, doctors, clinics, and representatives.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-lg transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase">Total Orders</span>
            <p className="text-2xl font-bold text-gray-800 mt-1">{filteredData.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase">Total Revenue</span>
            <p className="text-2xl font-bold text-blue-600 mt-1">৳ {totalAmount.toLocaleString()}</p>
          </div>
          {/* Dynamic Status Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              {activeStatusLabel} Orders
            </span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {statusCardCount}
            </p>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
          <Filters
            data={reportData}
            startDate={startDate}
            endDate={endDate}
            filters={filters}
            onDateChange={handleDateChange}
            onFilterChange={handleFilterChange}
            uniqueStates={uniqueStates}
            uniqueStatuses={uniqueStatuses}
          />
        </div>

        {/* Summary Table */}
        <SummaryTable reportData={filteredData} />
      </div>
    </div>
  );
};

export default WorkSummary;