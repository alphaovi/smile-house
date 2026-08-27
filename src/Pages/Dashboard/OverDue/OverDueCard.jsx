const OverDueCard = ({ amount = "$128,450" }) => {
  return (
    <div className="relative group cursor-pointer transition-all duration-300 hover:-translate-y-1">
      {/* 1. Background Outer Glow - সুন্দর অ্যাম্বিয়েন্ট লাইট ছড়িয়ে থাকবে */}
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-orange-400 to-amber-500 rounded-[30px] opacity-35 blur-lg group-hover:opacity-60 transition duration-500 animate-pulse" />

      {/* 2. Main Card Container with Rich Background Palette */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-[26px] p-6 shadow-2xl shadow-rose-950/40 border border-white/10 overflow-hidden flex flex-col justify-between">
        
        {/* Background Decorative Mesh Shapes (উজ্জ্বল ফোটানোর জন্য) */}
        <div className="absolute -right-10 -top-10 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/30 transition-all" />
        <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Live Pulsing Radar Dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-sm shadow-rose-500/80"></span>
            </span>

            {/* Glowing Pill Badge */}
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-200 bg-rose-500/20 px-3.5 py-1 rounded-full border border-rose-400/30 shadow-inner backdrop-blur-md">
              Over Due
            </span>
          </div>

          {/* Premium Glowing Icon Frame */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-400 p-[1.5px] shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center text-lg">
              💳
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="relative z-10 mt-1">
          <h3 className="text-3.5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-100 tracking-tight leading-none drop-shadow-sm">
            {amount}
          </h3>
          <p className="text-[11px] font-bold text-rose-200/70 mt-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-bounce" />
            Total pending overdue balance
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverDueCard;