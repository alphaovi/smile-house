import { useState, useEffect, useMemo } from 'react';
import FilterSection from './FilterSection';
import StatementTable from './StatementTable';
import StatementSummary from './StatementSummary';
import { AlertCircle, X } from 'lucide-react';

const ClientStatement = () => {
  const [reportData, setReportData] = useState([]);
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-09-30');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [searchDoctorText, setSearchDoctorText] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('all'); // Default 'all' rakha hoyeche
  const [isSearched, setIsSearched] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);
  const OPENING_BALANCE = 43843;

  useEffect(() => {
    fetch('/reportData.json')
      .then((res) => res.json())
      .then((data) => {
        setReportData(data || []);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ১. ইউনিক স্টেট লিস্ট
  const statesList = useMemo(() => {
    return Array.from(new Set((reportData || []).map((item) => item.state))).filter(Boolean);
  }, [reportData]);

  // ২. ফিল্টারড ক্লিনিক লিস্ট
  const filteredClinics = useMemo(() => {
    const list = (reportData || [])
      .filter((item) => selectedState === 'All' || item.state === selectedState)
      .map((item) => ({ id: String(item.clinicId), name: item.clinicName }));

    const uniqueMap = new Map();
    list.forEach((c) => uniqueMap.set(c.id, c));
    return Array.from(uniqueMap.values());
  }, [selectedState, reportData]);

  // ৩. ফিল্টারড ডাক্তার লিস্ট
  const filteredDoctors = useMemo(() => {
    const list = (reportData || [])
      .filter((item) => {
        const matchState = selectedState === 'All' || item.state === selectedState;
        const matchSearch = (item.doctorName || '')
          .toLowerCase()
          .includes((searchDoctorText || '').toLowerCase());
        return matchState && matchSearch;
      })
      .map((item) => ({ id: String(item.doctorId), name: item.doctorName }));

    const uniqueMap = new Map();
    list.forEach((d) => uniqueMap.set(d.id, d));
    return Array.from(uniqueMap.values());
  }, [selectedState, searchDoctorText, reportData]);

  // ৪. ডাইনামিক অটো অ্যাড্রেস
  const autoAddress = useMemo(() => {
    if (selectedDoctor) {
      const match = (reportData || []).find((item) => String(item.doctorId) === String(selectedDoctor));
      if (match?.address) return match.address;
    }
    if (selectedClinic) {
      const match = (reportData || []).find((item) => String(item.clinicId) === String(selectedClinic));
      if (match?.address) return match.address;
    }
    return 'Select a Doctor or Clinic to view address';
  }, [selectedClinic, selectedDoctor, reportData]);

  // ৫. ফিল্টার অনুযায়ী ডেটা ফিল্টারিং (এখানে ফিক্স করা হয়েছে)
  const tableData = useMemo(() => {
    if (!isSearched || paymentStatus === 'none' || !selectedDoctor) return [];

    const start = new Date(fromDate);
    const end = new Date(toDate);

    return (reportData || []).filter((item) => {
      // ডক্টর সিলেক্ট থাকলে সরাসরি ডক্টর আইডি ম্যাচ করবে
      const matchDoctor = String(item.doctorId) === String(selectedDoctor);

      const pDate = new Date(item.deliveryDate);
      const matchDate = pDate >= start && pDate <= end;

      let matchStatus = true;
      if (paymentStatus === 'paid') matchStatus = item.status === 'paid';
      if (paymentStatus === 'unpaid') matchStatus = item.status === 'unpaid';

      return matchDoctor && matchDate && matchStatus;
    });
  }, [isSearched, fromDate, toDate, selectedDoctor, paymentStatus, reportData]);

  // ৬. মোট হিসাব
  const { totalPaid, totalUnpaid } = useMemo(() => {
    return tableData.reduce(
      (acc, curr) => {
        const due = curr.dueAmount ?? (curr.status === 'unpaid' ? curr.amount : 0);
        const paid = curr.paidAmount ?? (curr.status === 'paid' ? curr.amount : 0);
        acc.totalPaid += paid;
        acc.totalUnpaid += due;
        return acc;
      },
      { totalPaid: 0, totalUnpaid: 0 }
    );
  }, [tableData]);

  // ৭. সার্চ বাটন ভ্যালিডেশন
  const handleSearch = () => {
    if (!selectedDoctor) {
      triggerToast('Please Select a Doctor to load statement');
      return;
    }
    if (paymentStatus === 'none') {
      triggerToast('Please Select Payment Status (ALL, PAID, or UNPAID)');
      return;
    }
    setIsSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8 font-sans relative">
      {/* Toast Warning */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-rose-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <AlertCircle className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:bg-rose-700 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Client Statement
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Detailed delivery statements and account balance breakdown
          </p>
        </div>

        <FilterSection
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedClinic={selectedClinic}
          setSelectedClinic={setSelectedClinic}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          searchDoctorText={searchDoctorText}
          setSearchDoctorText={setSearchDoctorText}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          autoAddress={autoAddress}
          statesList={statesList}
          filteredClinics={filteredClinics}
          filteredDoctors={filteredDoctors}
          reportData={reportData}
          handleSearch={handleSearch}
        />

        {isSearched && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
            <StatementTable
              tableData={tableData}
              paymentStatus={paymentStatus}
              openingBalance={OPENING_BALANCE}
            />

            <StatementSummary
              paymentStatus={paymentStatus}
              totalPaid={totalPaid}
              totalUnpaid={totalUnpaid}
              openingBalance={OPENING_BALANCE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientStatement;