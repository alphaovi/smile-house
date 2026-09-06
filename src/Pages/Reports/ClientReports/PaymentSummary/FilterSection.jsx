
import { motion } from 'framer-motion';
import { Calendar, Filter, Building2, UserCheck, Search, MapPin } from 'lucide-react';

const FilterSection = ({
  fromDate, setFromDate,
  toDate, setToDate,
  selectedState, setSelectedState,
  selectedClinic, setSelectedClinic,
  selectedDoctor, setSelectedDoctor,
  searchDoctorText, setSearchDoctorText,
  autoAddress,
  statesList,
  filteredClinics,
  filteredDoctors,
  handleSearch
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* FROM DATE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" /> FROM DATE
          </label>
          <input 
            type="date" 
            value={fromDate}
            onClick={(e) => e.target.showPicker?.()}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          />
        </div>

        {/* TO DATE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" /> TO DATE
          </label>
          <input 
            type="date" 
            value={toDate}
            onClick={(e) => e.target.showPicker?.()}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          />
        </div>

        {/* STATE */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" /> STATE
          </label>
          <select 
            value={selectedState} 
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedClinic('All');
              setSelectedDoctor('All');
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
          >
            <option value="All">All States</option>
            {statesList.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>

        {/* CLINIC */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" /> CLINIC
          </label>
          <select 
            value={selectedClinic} 
            onChange={(e) => {
              setSelectedClinic(e.target.value);
              setSelectedDoctor('All');
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
          >
            <option value="All">All Clinics</option>
            {filteredClinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* DOCTOR FIELD WITH INTEGRATED MINI SEARCH */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" /> DOCTOR
            </label>
            
            <div className="relative flex items-center">
              <Search className="w-3 h-3 text-slate-400 absolute left-2 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchDoctorText}
                onChange={(e) => setSearchDoctorText(e.target.value)}
                className="w-28 bg-slate-100 border border-slate-200 rounded-lg pl-6 pr-2 py-0.5 text-[11px] text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <select 
            value={selectedDoctor} 
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
          >
            <option value="All">All Doctors</option>
            {filteredDoctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        {/* AUTO ADDRESS */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" /> ADDRESS (AUTO FILLED)
          </label>
          <input 
            type="text" 
            readOnly 
            value={autoAddress}
            className="w-full bg-slate-100/70 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-500 cursor-not-allowed italic"
          />
        </div>

      </div>

      <div className="flex justify-end pt-2">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center gap-2.5 transition-all cursor-pointer"
        >
          <Search className="w-4 h-4" /> Load Payment Summary
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FilterSection;