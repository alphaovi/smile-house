
const StatementTable = ({ tableData, paymentStatus, openingBalance }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-900 text-white text-[13px] font-bold tracking-wider">
            <th className="p-4 pl-6">SL</th>
            <th className="p-4">PATIENT NAME</th>
            <th className="p-4">DELIVERY DATE</th>
            <th className="p-4">DESCRIPTION / PAN</th>
            <th className="p-4 text-right">PAID AMOUNT</th>
            <th className="p-4 text-right">UNPAID AMOUNT</th>
            <th className="p-4 text-center pr-6">STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
          
          {/* Opening Balance Row */}
          <tr className="bg-slate-50/80 font-bold text-slate-900">
            <td className="p-4 pl-6 text-slate-400">#</td>
            <td className="p-4" colSpan={3}>OPENING BALANCE</td>
            <td className="p-4 text-right text-emerald-600">
              {paymentStatus !== 'unpaid' ? `$${openingBalance.toLocaleString()}` : '-'}
            </td>
            <td className="p-4 text-right text-rose-600">
              {paymentStatus === 'unpaid' ? `$${openingBalance.toLocaleString()}` : '-'}
            </td>
            <td className="p-4 text-center pr-6">
              <span className="bg-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                INITIAL
              </span>
            </td>
          </tr>

          {/* Table Data Rows */}
          {tableData.length > 0 ? (
            tableData.map((item, index) => {
              const due = item.dueAmount ?? (item.status === 'unpaid' ? item.amount : 0);
              const paid = item.paidAmount ?? (item.status === 'paid' ? item.amount : 0);

              return (
                <tr key={item.id || index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-6 font-semibold text-slate-400">{index + 1}</td>
                  <td className="p-4 font-bold text-slate-900">{item.patientName}</td>
                  <td className="p-4 text-slate-500">{item.deliveryDate}</td>
                  <td className="p-4 text-slate-600">{item.description || item.panNumber || '-'}</td>
                  <td className="p-4 text-right font-bold text-emerald-600">
                    {paid > 0 ? `$${paid.toLocaleString()}` : '-'}
                  </td>
                  <td className="p-4 text-right font-bold text-rose-600">
                    {due > 0 ? `$${due.toLocaleString()}` : '-'}
                  </td>
                  <td className="p-4 text-center pr-6">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      item.status === 'paid' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="p-12 text-center text-slate-400 font-medium">
                No statement records found for the selected filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatementTable;