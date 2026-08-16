import RecentOrders from "./DashboardComponents/RecentOrder";
import SalesAnalytics from "./DashboardComponents/SalesAnalysis";
import StatCard from "./DashboardComponents/StatCard";
import TopProducts from "./DashboardComponents/TopProducts";


// Centralized Data Object
const dashboardData = {
  stats: {
    totalSales: { value: "$128,450", growth: "+14.2%", positive: true },
    activeOrders: { value: "342", growth: "+8.1%", positive: true },
    completedDelivery: { value: "1,280", growth: "+5.4%", positive: true },
    pendingDelivery: { value: "24", growth: "-2.3%", positive: false }
  },
  analytics: [
    { month: 'Jan', amount: 35, percentage: 45 },
    { month: 'Feb', amount: 48, percentage: 60 },
    { month: 'Mar', amount: 62, percentage: 75 },
    { month: 'Apr', amount: 55, percentage: 68 },
    { month: 'May', amount: 80, percentage: 95 },
    { month: 'Jun', amount: 74, percentage: 88 }
  ],
  recentOrders: [
    { id: "ORD-9021", client: "Apex Dental Clinic", item: "Digital X-Ray Sensor", status: "Completed", amount: "$3,200", date: "16 Aug 2026" },
    { id: "ORD-9022", client: "Smile Care Lab", item: "Ultrasonic Scaler Unit", status: "Pending", amount: "$850", date: "16 Aug 2026" },
    { id: "ORD-9023", client: "City Dental Care", item: "Ergonomic Dental Chair", status: "Processing", amount: "$4,500", date: "15 Aug 2026" },
    { id: "ORD-9024", client: "Metro Orthodontics", item: "Autoclave Sterilizer", status: "Completed", amount: "$1,800", date: "14 Aug 2026" }
  ],
  topProducts: [
    { name: "3D Intraoral Scanner", sales: 142, stock: "18 units" },
    { name: "LED Curing Light Probe", sales: 98, stock: "45 units" },
    { name: "High-Speed Handpiece Kit", sales: 76, stock: "12 units" }
  ]
};

const Dashboard = () => {
  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time dental equipment sales & logistics analysis</p>
        </div>
        <button className="self-start md:self-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95">
          + New Equipment Order
        </button>
      </div>

      {/* 1. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" data={dashboardData.stats.totalSales} icon="💵" />
        <StatCard title="Active Orders" data={dashboardData.stats.activeOrders} icon="📦" />
        <StatCard title="Completed Deliveries" data={dashboardData.stats.completedDelivery} icon="✅" />
        <StatCard title="Pending Shipments" data={dashboardData.stats.pendingDelivery} icon="⏳" />
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SalesAnalytics chartData={dashboardData.analytics} />
          <RecentOrders orders={dashboardData.recentOrders} />
        </div>
        <div>
          <TopProducts products={dashboardData.topProducts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;