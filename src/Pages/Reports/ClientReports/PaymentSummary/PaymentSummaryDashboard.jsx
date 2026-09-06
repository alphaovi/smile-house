import  { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

import FilterSection from './FilterSection';
import PaymentTable from './PaymentTable';

// HELPER FUNCTION: Convert YYYY-MM-DD to DD/MM/YYYY
const formatToDDMMYYYY = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const PaymentSummaryDashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [fromDate, setFromDate] = useState('2026-01-01'); // Default Start
  const [toDate, setToDate] = useState('2026-09-30');   // Default End
  const [selectedState, setSelectedState] = useState('All');
  const [selectedClinic, setSelectedClinic] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState('All');
  const [searchDoctorText, setSearchDoctorText] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  // FETCH JSON DATA FROM PUBLIC FOLDER
  useEffect(() => {
    fetch('/reportData.json')
      .then((res) => res.json())
      .then((data) => {
        setReportData(data);
      })
      .catch((err) => console.error('Error fetching reportData:', err));
  }, []);

  // States Dynamic Option List
  const statesList = useMemo(() => {
    return Array.from(new Set(reportData.map((item) => item.state)));
  }, [reportData]);

  // Clinics Dynamic Option List
  const filteredClinics = useMemo(() => {
    const list = reportData
      .filter((item) => selectedState === 'All' || item.state === selectedState)
      .map((item) => ({ id: item.clinicId, name: item.clinicName, address: item.address }));

    const uniqueMap = new Map();
    list.forEach((c) => uniqueMap.set(c.id, c));
    return Array.from(uniqueMap.values());
  }, [selectedState, reportData]);

  const selectedClinicObj = useMemo(() => {
    return filteredClinics.find((c) => c.id === selectedClinic);
  }, [selectedClinic, filteredClinics]);

  const autoAddress = selectedClinicObj ? selectedClinicObj.address : 'Auto-filled based on clinic selection';

  // Doctors Dynamic Option List
  const filteredDoctors = useMemo(() => {
    const list = reportData
      .filter((item) => {
        const matchState = selectedState === 'All' || item.state === selectedState;
        const matchClinic = selectedClinic === 'All' || item.clinicId === selectedClinic;
        const matchSearch = item.doctorName.toLowerCase().includes(searchDoctorText.toLowerCase());
        return matchState && matchClinic && matchSearch;
      })
      .map((item) => ({ id: item.doctorId, name: item.doctorName }));

    const uniqueMap = new Map();
    list.forEach((d) => uniqueMap.set(d.id, d));
    return Array.from(uniqueMap.values());
  }, [selectedState, selectedClinic, searchDoctorText, reportData]);

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      alert('Daya kore From Date ebong To Date select korun.');
      return;
    }
    setIsSearched(true);
  };

  // Filter & Data Formatting Logic Fix
  const tableData = useMemo(() => {
    if (!isSearched) return [];

    let activeDocIds = filteredDoctors.map((d) => d.id);
    if (selectedDoctor !== 'All') {
      activeDocIds = [selectedDoctor];
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const filteredPayments = reportData.filter((p) => {
      const isDocMatch = activeDocIds.includes(p.doctorId);
      const isClinicMatch = selectedClinic === 'All' || p.clinicId === selectedClinic;
      const isStateMatch = selectedState === 'All' || p.state === selectedState;
      
      const pDate = new Date(p.date);
      const isDateMatch = pDate >= start && pDate <= end;

      return isDocMatch && isClinicMatch && isStateMatch && isDateMatch;
    });

    if (selectedDoctor !== 'All') {
      return filteredPayments.map((p) => ({
        id: p.id,
        date: formatToDDMMYYYY(p.date), // DD/MM/YYYY Format
        col2: p.voucherId,
        doctorName: p.doctorName,
        clinicName: p.clinicName,
        caseNo: p.caseNo,
        ref: `${p.ref} (${p.status})`,
        amount: p.price
      }));
    } else {
      const grouped = {};
      filteredPayments.forEach((p) => {
        if (!grouped[p.doctorId]) {
          grouped[p.doctorId] = {
            id: p.doctorId,
            date: `${formatToDDMMYYYY(fromDate)} to ${formatToDDMMYYYY(toDate)}`, // DD/MM/YYYY Format
            col2: p.doctorId,
            doctorName: p.doctorName,
            clinicName: p.clinicName,
            caseNo: 'Multiple Cases',
            ref: 'Total Consolidated Sum',
            amount: 0
          };
        }
        grouped[p.doctorId].amount += p.price;
      });
      return Object.values(grouped);
    }
  }, [isSearched, fromDate, toDate, selectedDoctor, selectedClinic, selectedState, filteredDoctors, reportData]);

  const totalAmount = useMemo(() => {
    return tableData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [tableData]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Payment Summary Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Realtime ledger summary report statement</p>
          </div>
        </motion.div>

        {/* FILTER SECTION COMPONENT */}
        <FilterSection 
          fromDate={fromDate} setFromDate={setFromDate}
          toDate={toDate} setToDate={setToDate}
          selectedState={selectedState} setSelectedState={setSelectedState}
          selectedClinic={selectedClinic} setSelectedClinic={setSelectedClinic}
          selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor}
          searchDoctorText={searchDoctorText} setSearchDoctorText={setSearchDoctorText}
          autoAddress={autoAddress}
          statesList={statesList}
          filteredClinics={filteredClinics}
          filteredDoctors={filteredDoctors}
          handleSearch={handleSearch}
        />

        {/* RESULTS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-200/50"
        >
          {!isSearched ? (
            <div className="p-14 text-center text-slate-400 space-y-3">
              <Calendar className="w-12 h-12 mx-auto text-blue-500/60" />
              <p className="text-base font-medium text-slate-600">Select dates and click "Load Payment Summary" to view reports</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedDoctor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PaymentTable tableData={tableData} selectedDoctor={selectedDoctor} />

                {/* TOTAL FOOTER */}
                {tableData.length > 0 && (
                  <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Total Payable Summary</span>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 mr-2 uppercase tracking-wider">Grand Total:</span>
                      <span className="text-xl font-black text-emerald-600 font-mono">
                        ৳ {totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default PaymentSummaryDashboard;