import OverDueCard from "./OverDue/OverDueCard";
import PublicNotesWidget from "./PublicNotes/PublicNotesWidget";
import RecentOrdersWidget from "./RecentOrder/RecentOrderWidget";

const Dashboard = () => {
  return (
    <div className="p-6 md:p-8 bg-slate-50/70 min-h-screen space-y-8">
      {/* Top Cards Row: 3 Premium Dark-Styled Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Over Due Card (Royal Crimson Dark Theme) */}
        <OverDueCard amount="$128,450" />
        
        {/* 2. Case In Process (Electric Indigo Dark Theme) */}
        <div className="relative group cursor-pointer transition-all duration-300 hover:-translate-y-1">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400 rounded-[30px] opacity-35 blur-lg group-hover:opacity-60 transition duration-500" />

          {/* Main Card Surface */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-[26px] p-6 shadow-2xl shadow-indigo-950/40 border border-white/10 overflow-hidden flex flex-col justify-between">
            
            {/* Background Decorative Mesh Glow */}
            <div className="absolute -right-10 -top-10 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/30 transition-all" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-200 bg-indigo-500/20 px-3.5 py-1 rounded-full border border-indigo-400/30 backdrop-blur-md">
                Case In Process
              </span>

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-[1.5px] shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center text-lg">
                  📦
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-1">
              <h3 className="text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-100 tracking-tight leading-none">
                342
              </h3>
              <p className="text-[11px] font-bold text-indigo-200/70 mt-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
                Active lab cases currently in progress
              </p>
            </div>
          </div>
        </div>

        {/* 3. Today's Delivery (Emerald & Teal Forest Dark Theme) */}
        <div className="relative group cursor-pointer transition-all duration-300 hover:-translate-y-1">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-[30px] opacity-35 blur-lg group-hover:opacity-60 transition duration-500" />

          {/* Main Card Surface */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-[26px] p-6 shadow-2xl shadow-emerald-950/40 border border-white/10 overflow-hidden flex flex-col justify-between">
            
            {/* Background Decorative Mesh Glow */}
            <div className="absolute -right-10 -top-10 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/30 transition-all" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-200 bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-400/30 backdrop-blur-md">
                Today's Delivery
              </span>

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center text-lg">
                  🚚
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-1">
              <h3 className="text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-100 tracking-tight leading-none">
                24
              </h3>
              <p className="text-[11px] font-bold text-emerald-200/70 mt-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Scheduled orders ready for dispatch
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Main Split Section: Left Activity Table + Right Messenger Noticeboard */}
      <div className="flex flex-col lg:flex-row gap-6">
        <RecentOrdersWidget />
        <PublicNotesWidget />
      </div>
    </div>
  );
};

export default Dashboard;