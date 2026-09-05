import  { useMemo, useRef } from "react";

const Filters = ({
  data,
  startDate,
  endDate,
  filters,
  onDateChange,
  onFilterChange,
  uniqueStates,
  uniqueStatuses,
}) => {
  const startRef = useRef(null);
  const endRef = useRef(null);

  // 1. Extract Unique SRs
  const srs = useMemo(() => {
    return Array.from(new Map(data.map((item) => [item.srId, item])).values());
  }, [data]);

  // 2. Extract Available Doctors based on SR and State Filter
  const availableDoctors = useMemo(() => {
    return Array.from(
      new Map(
        data
          .filter((item) => {
            if (filters.sr && item.srId !== filters.sr) return false;
            if (filters.state && item.state !== filters.state) return false;
            return true;
          })
          .map((item) => [item.doctorId, item])
      ).values()
    );
  }, [data, filters.sr, filters.state]);

  // 3. Extract Clinics dynamically based on selected Doctor / SR
  const availableClinics = useMemo(() => {
    return Array.from(
      new Map(
        data
          .filter((item) => {
            if (filters.doctor && item.doctorId !== filters.doctor) return false;
            if (filters.sr && item.srId !== filters.sr) return false;
            return true;
          })
          .map((item) => [item.clinicId, item])
      ).values()
    );
  }, [data, filters.doctor, filters.sr]);

  // 4. Extract SR's assigned doctors
  const srDoctors = useMemo(() => {
    if (!filters.sr) return [];
    return Array.from(
      new Map(
        data
          .filter((item) => item.srId === filters.sr)
          .map((item) => [item.doctorId, item])
      ).values()
    );
  }, [data, filters.sr]);

  const selectClass =
    "w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none cursor-pointer";

  return (
    <div className="space-y-4">
      {/* ================= TOP ROW: Dates, State, Status ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
        {/* From Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            From Date
          </label>
          <input
            ref={startRef}
            type="date"
            value={startDate}
            max={endDate || undefined}
            onClick={() => startRef.current?.showPicker?.()}
            onChange={(e) => onDateChange("startDate", e.target.value)}
            className={selectClass}
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            To Date
          </label>
          <input
            ref={endRef}
            type="date"
            value={endDate}
            min={startDate || undefined}
            onClick={() => endRef.current?.showPicker?.()}
            onChange={(e) => onDateChange("endDate", e.target.value)}
            className={selectClass}
          />
        </div>

        {/* State */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            State
          </label>
          <select
            value={filters.state}
            onChange={(e) => onFilterChange("state", e.target.value)}
            className={selectClass}
          >
            <option value="">All States</option>
            {uniqueStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className={selectClass}
          >
            <option value="">All Statuses</option>
            {uniqueStatuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= BOTTOM ROW: Doctor, Clinic, SR, SR's Doctors ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doctor Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Doctor Name
          </label>
          <select
            value={filters.doctor}
            onChange={(e) => onFilterChange("doctor", e.target.value)}
            className={selectClass}
          >
            <option value="">All Doctors</option>
            {availableDoctors.map((doc) => (
              <option key={doc.doctorId} value={doc.doctorId}>
                {doc.doctorName}
              </option>
            ))}
          </select>
        </div>

        {/* Clinic Name (Shows Doctor specific clinic or All Clinics) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Clinic Name
          </label>
          <select
            value={filters.clinic}
            onChange={(e) => onFilterChange("clinic", e.target.value)}
            className={selectClass}
          >
            <option value="">All Clinics</option>
            {availableClinics.map((cl) => (
              <option key={cl.clinicId} value={cl.clinicId}>
                {cl.clinicName}
              </option>
            ))}
          </select>
        </div>

        {/* SR Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
            SR Name
          </label>
          <select
            value={filters.sr}
            onChange={(e) => onFilterChange("sr", e.target.value)}
            className={selectClass}
          >
            <option value="">All SRs</option>
            {srs.map((sr) => (
              <option key={sr.srId} value={sr.srId}>
                {sr.srName}
              </option>
            ))}
          </select>
        </div>

        {/* SR's Under Doctor List */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-600">
            SR's Assigned Doctors
          </label>
          <select
            disabled={!filters.sr}
            value={filters.doctor}
            onChange={(e) => onFilterChange("doctor", e.target.value)}
            className={`${selectClass} ${
              !filters.sr
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : "border-blue-300 ring-2 ring-blue-50/50"
            }`}
          >
            <option value="">
              {!filters.sr
                ? "Select an SR first"
                : `All Doctors under SR (${srDoctors.length})`}
            </option>
            {srDoctors.map((doc) => (
              <option key={doc.doctorId} value={doc.doctorId}>
                {doc.doctorName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;