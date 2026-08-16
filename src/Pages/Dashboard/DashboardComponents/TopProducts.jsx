
const TopProducts = ({ products }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-6">Top Selling Items</h2>
        <div className="space-y-4">
          {products.map((prod, index) => (
            <div key={index} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-semibold text-slate-800 text-sm">{prod.name}</p>
                <p className="text-xs text-slate-400">In Stock: {prod.stock}</p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-lg">
                {prod.sales} Sold
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Alert Mini Card */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg shadow-blue-500/20">
        <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Storage Status</p>
        <p className="text-sm font-bold mt-1">Warehouse capacity at 78%</p>
      </div>
    </div>
  );
};

export default TopProducts;