

const StatementSummary = ({ paymentStatus, totalPaid, totalUnpaid, openingBalance }) => {
  // Opening Balance সহ চূড়ান্ত সমাপনী হিসাব
  const finalPaidWithOpening = totalPaid + (paymentStatus !== 'unpaid' ? openingBalance : 0);
  const finalUnpaidWithOpening = totalUnpaid + (paymentStatus === 'unpaid' ? openingBalance : 0);
  const closingBalance = finalPaidWithOpening - finalUnpaidWithOpening;

  return (
    <div className="bg-slate-900 text-white p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Total Paid Amount
        </p>
        <p className="text-2xl font-extrabold text-emerald-400 mt-1">
          ${finalPaidWithOpening.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Total Due / Unpaid
        </p>
        <p className="text-2xl font-extrabold text-rose-400 mt-1">
          ${finalUnpaidWithOpening.toLocaleString()}
        </p>
      </div>

      <div className="md:text-right border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Net Account Balance
        </p>
        <p className={`text-3xl font-black mt-1 ${
          closingBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'
        }`}>
          ${closingBalance.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default StatementSummary;