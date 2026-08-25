

const PaymentTable = ({ 
  cases, 
  selectedCases, 
  payingAmounts, 
  onSelectAll, 
  onSelectCase, 
  onAmountChange 
}) => {
  const isAllSelected = cases.length > 0 && selectedCases.length === cases.length;

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full border-collapse border border-gray-300 text-sm text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Case Number</th>
            <th className="border border-gray-300 p-2">Received Date</th>
            <th className="border border-gray-300 p-2">Patient Name</th>
            <th className="border border-gray-300 p-2">Work Type</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">
              <div className="flex items-center justify-center gap-1">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className="cursor-pointer"
                />
                <span>Select All</span>
              </div>
            </th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cases.length === 0 ? (
            <tr>
              <td colSpan="8" className="border border-gray-300 p-4 text-gray-400">
                No cases found. Select a doctor/clinic to view cases.
              </td>
            </tr>
          ) : (
            cases.map((item) => {
              const isSelected = selectedCases.includes(item.id);
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 font-mono">{item.caseNumber}</td>
                  <td className="border border-gray-300 p-2">{item.receivedDate}</td>
                  <td className="border border-gray-300 p-2">{item.patientName}</td>
                  <td className="border border-gray-300 p-2">{item.workType}</td>
                  <td className="border border-gray-300 p-2 font-semibold">৳{item.amount}</td>
                  <td className="border border-gray-300 p-2 font-medium text-amber-600">{item.status}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="number"
                        value={payingAmounts[item.id] ?? item.amount}
                        onChange={(e) => onAmountChange(item.id, e.target.value)}
                        disabled={!isSelected}
                        className="w-20 border rounded px-1 text-center border-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                      />
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectCase(item.id)}
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex justify-center items-center gap-2">
                      <button className="text-sky-500 hover:text-sky-700" title="Info">ℹ️</button>
                      <button className="text-gray-600 hover:text-gray-800" title="Print">🖨️</button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;