import { Link } from "react-router";

const OrderListFilter = ({
  selectedClient,
  setSelectedClient,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  searchTerm,
  setSearchTerm,
  onSearch,
  clientOptions = [],
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-4">
      {/* Header */}
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 uppercase tracking-wide">
            View Order List
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate and filter order reports by client and date range
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Primary Blue Button */}
          <Link to="/order/requested-order">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2 rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer">
              Requested Order
            </button>
          </Link>

          {/* Secondary Gray Button */}
          <Link to="/order/create-order">
            <button className="bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2 rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer">
              + Create Order
            </button>
          </Link>
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center pt-2">
        {/* Select Client */}
        <div>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-2.5 bg-amber-400 text-slate-900 font-bold text-xs outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
          >
            <option value="ALL">Select Client (All)</option>
            {clientOptions.map((client, idx) => (
              <option key={idx} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>

        {/* From Date - Single Click Open */}
        <div>
          <input
            type={fromDate ? "date" : "text"}
            onFocus={(e) => {
              e.target.type = "date";
              if (e.target.showPicker) {
                e.target.showPicker();
              }
            }}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            placeholder="FROM DATE"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-2.5 bg-amber-400 font-bold text-xs text-slate-900 outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer placeholder-slate-700 uppercase"
          />
        </div>

        {/* To Date - Single Click Open */}
        <div>
          <input
            type={toDate ? "date" : "text"}
            onFocus={(e) => {
              e.target.type = "date";
              if (e.target.showPicker) {
                e.target.showPicker();
              }
            }}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            placeholder="TO DATE"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-2.5 bg-amber-400 font-bold text-xs text-slate-900 outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer placeholder-slate-700 uppercase"
          />
        </div>

        {/* Real-time Search Input */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH BY ID, NAME, ORDER NO..."
            className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-semibold text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 uppercase"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderListFilter;