import React from "react";

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
    <div className="flex-1 w-full overflow-hidden rounded-lg border border-gray-300 shadow-sm bg-white">
      {/* Mobile-এ Horizontal Scroll থাকবে, কিন্তু Medium (md) এবং বড় স্ক্রিনে Full Width হয়ে ফিট হবে */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[650px] md:min-w-full border-collapse text-sm text-center">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-300">
              <th className="border-r border-gray-300 p-2 whitespace-nowrap">Case Number</th>
              <th className="border-r border-gray-300 p-2 whitespace-nowrap">Received Date</th>
              <th className="border-r border-gray-300 p-2 whitespace-nowrap">Patient Name</th>
              <th className="border-r border-gray-300 p-2 whitespace-nowrap">Work Type</th>
              <th className="border-r border-gray-300 p-2 whitespace-nowrap">Amount</th>
              <th className="border-r border-gray-300 p-2 whitespace-nowrap">Status</th>
              <th className="border-r border-gray-300 p-2 whitespace-nowrap">
                <div className="flex items-center justify-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onSelectAll}
                    className="cursor-pointer size-4 accent-emerald-600"
                  />
                  <span>Select All</span>
                </div>
              </th>
              <th className="p-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cases.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-gray-400 font-medium">
                  No cases found. Select a doctor/clinic to view cases.
                </td>
              </tr>
            ) : (
              cases.map((item) => {
                const isSelected = selectedCases.includes(item.id);
                return (
                  <tr 
                    key={item.id} 
                    className={`transition-colors hover:bg-gray-50 ${
                      isSelected ? "bg-emerald-50/50" : "bg-white"
                    }`}
                  >
                    <td className="border-r border-gray-200 p-2 font-mono font-medium text-gray-800">
                      {item.caseNumber}
                    </td>
                    <td className="border-r border-gray-200 p-2 text-gray-600">
                      {item.receivedDate}
                    </td>
                    <td className="border-r border-gray-200 p-2 font-medium text-gray-800">
                      {item.patientName}
                    </td>
                    <td className="border-r border-gray-200 p-2 text-gray-600">
                      {item.workType}
                    </td>
                    <td className="border-r border-gray-200 p-2 font-semibold text-gray-800">
                      ৳{item.amount}
                    </td>
                    <td className="border-r border-gray-200 p-2 font-medium text-amber-600">
                      <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-xs">
                        {item.status}
                      </span>
                    </td>
                    <td className="border-r border-gray-200 p-2">
                      <div className="flex items-center justify-center gap-1.5">
                        <input
                          type="number"
                          value={payingAmounts[item.id] ?? item.amount}
                          onChange={(e) => onAmountChange(item.id, e.target.value)}
                          disabled={!isSelected}
                          className="w-20 border border-gray-300 rounded px-1.5 py-0.5 text-center font-medium focus:outline-none focus:border-emerald-500 disabled:bg-gray-100 disabled:text-gray-400"
                        />
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectCase(item.id)}
                          className="cursor-pointer size-4 accent-emerald-600"
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center items-center gap-2 text-base">
                        <button className="hover:scale-110 transition-transform" title="Info">
                          ℹ️
                        </button>
                        <button className="hover:scale-110 transition-transform" title="Print">
                          🖨️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;