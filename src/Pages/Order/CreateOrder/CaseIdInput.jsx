import { useState } from "react";

const CaseIdInput = ({ caseId, setCaseId, existingIds }) => {
  const [isManual, setIsManual] = useState(false);
  const [error, setError] = useState('');

  // Generate Unique Auto Case ID
  const generateAutoId = () => {
    let newId = '';
    do {
      newId = 'CS-' + Math.floor(100000 + Math.random() * 900000);
    } while (existingIds.includes(newId));
    
    setCaseId(newId);
    setError('');
    setIsManual(false);
  };

  const handleManualChange = (e) => {
    const val = e.target.value;
    setCaseId(val);
    if (existingIds.includes(val)) {
      setError('This Case ID already exists! Unique ID required.');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Case ID *
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={generateAutoId}
            className="text-xs text-blue-600 hover:underline font-semibold"
          >
            Auto-Generate
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => {
              setIsManual(true);
              setCaseId('');
            }}
            className="text-xs text-slate-500 hover:underline font-semibold"
          >
            Manual
          </button>
        </div>
      </div>

      <input
        type="text"
        value={caseId}
        onChange={handleManualChange}
        disabled={!isManual}
        placeholder={isManual ? "Enter custom unique Case ID" : "Click Auto-Generate or Manual"}
        className={`w-full bg-slate-50 border rounded-xl p-3 text-sm focus:outline-none ${
          error ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:ring-2 focus:ring-blue-500'
        } ${!isManual && 'cursor-not-allowed opacity-80'}`}
      />
      {error && <p className="text-xs text-rose-500 mt-1 font-semibold">{error}</p>}
    </div>
  );
};

export default CaseIdInput;