import { useNavigate } from "react-router";
import { Tag, ArrowUpRight } from "lucide-react";

const WorkAndPriceCard = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/settings/work-and-price")}
      className="group relative h-36 w-full cursor-pointer overflow-hidden rounded-2xl border border-fuchsia-200 bg-gradient-to-br from-fuchsia-500/10 via-fuchsia-500/5 to-transparent p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/10 active:scale-[0.98]"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:bg-fuchsia-500/30" />

      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between z-10">
          <div className="flex size-11 items-center justify-center rounded-xl bg-fuchsia-500 text-white shadow-md shadow-fuchsia-500/30 transition-transform duration-300 group-hover:scale-110">
            <Tag className="size-6" />
          </div>
          <span className="flex size-8 items-center justify-center rounded-full bg-fuchsia-500/10 text-fuchsia-600 transition-all duration-300 group-hover:bg-fuchsia-500 group-hover:text-white">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="z-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-fuchsia-600">
            Work & Price
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WorkAndPriceCard;