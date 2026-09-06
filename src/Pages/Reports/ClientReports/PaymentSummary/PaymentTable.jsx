import React from 'react';
import { motion } from 'framer-motion';

const PaymentTable = ({ tableData, selectedDoctor }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
          <tr>
            <th className="py-4 px-6">Date</th>
            <th className="py-4 px-6">
              {selectedDoctor !== 'All' ? 'Voucher ID' : 'Doctor ID'}
            </th>
            <th className="py-4 px-6">
              {selectedDoctor !== 'All' ? 'Doctor / Clinic' : 'Doctor Name'}
            </th>
            <th className="py-4 px-6">Case / Payment Ref</th>
            <th className="py-4 px-6 text-right">Amount (BDT)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tableData.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                No payment record found for selected filters.
              </td>
            </tr>
          ) : (
            tableData.map((row, index) => (
              <motion.tr 
                key={row.id} 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="hover:bg-slate-50/80 transition-colors duration-200"
              >
                <td className="py-4 px-6 font-mono text-xs text-slate-500">{row.date}</td>
                <td className="py-4 px-6 font-bold text-blue-600">{row.col2}</td>
                <td className="py-4 px-6 text-slate-800">
                  <div className="font-semibold">{row.doctorName}</div>
                  {row.clinicName && <div className="text-xs text-slate-400">{row.clinicName}</div>}
                </td>
                <td className="py-4 px-6 text-slate-600">
                  <div>{row.caseNo}</div>
                  <div className="text-xs text-slate-400">{row.ref}</div>
                </td>
                <td className="py-4 px-6 text-right font-mono font-bold text-emerald-600 text-base">
                  ৳ {row.amount.toLocaleString()}
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;