
const PageTwo = ({
  workGroup, setWorkGroup,
  workType, setWorkType,
  workGroups, workTypes,
  upperRightTeeth, upperLeftTeeth, lowerRightTeeth, lowerLeftTeeth,
  handleToothClick, selectedJaw, setSelectedJaw, selectedSize, setSelectedSize,
  cartItems, handleRemoveCartItem,
  additionalCharge, setAdditionalCharge,
  subTotal, discount, setDiscount, grandTotal,
  setCurrentPage, handleNextToPage3
}) => {
  return (
    <form onSubmit={handleNextToPage3} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Work Group *</label>
          <select
            value={workGroup}
            onChange={(e) => setWorkGroup(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
            required
          >
            <option value="">-- Select Work Group --</option>
            {workGroups.map((g, idx) => (<option key={idx} value={g}>{g}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Work Type *</label>
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
            required
          >
            <option value="">-- Select Work Type --</option>
            {workTypes.map((t, idx) => (<option key={idx} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      <div className="border border-emerald-600/30 bg-emerald-50/20 p-4 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">Select Tooth (Click to Add item to Cart)</h3>
        <div className="bg-emerald-100/60 p-4 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between gap-1">
              {upperRightTeeth.map((num) => (
                <button key={num} type="button" onClick={() => handleToothClick(num)} className="flex-1 py-2 bg-emerald-200/60 text-slate-700 hover:bg-emerald-400 rounded-lg text-xs font-bold">
                  <span className="block text-[10px]">{num}</span>🦷
                </button>
              ))}
            </div>
            <div className="flex justify-between gap-1">
              {upperLeftTeeth.map((num) => (
                <button key={num} type="button" onClick={() => handleToothClick(num)} className="flex-1 py-2 bg-emerald-200/60 text-slate-700 hover:bg-emerald-400 rounded-lg text-xs font-bold">
                  <span className="block text-[10px]">{num}</span>🦷
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between gap-1">
              {lowerRightTeeth.map((num) => (
                <button key={num} type="button" onClick={() => handleToothClick(num)} className="flex-1 py-2 bg-emerald-200/60 text-slate-700 hover:bg-emerald-400 rounded-lg text-xs font-bold">
                  🦷<span className="block text-[10px]">{num}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between gap-1">
              {lowerLeftTeeth.map((num) => (
                <button key={num} type="button" onClick={() => handleToothClick(num)} className="flex-1 py-2 bg-emerald-200/60 text-slate-700 hover:bg-emerald-400 rounded-lg text-xs font-bold">
                  🦷<span className="block text-[10px]">{num}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-3 gap-2">
            {["Upper Jaw", "Lower Jaw", "Both Jaw"].map((j) => (
              <button key={j} type="button" onClick={() => setSelectedJaw(j)} className={`py-2 text-xs font-bold rounded-lg border ${selectedJaw === j ? "bg-emerald-600 text-white" : "bg-emerald-600/80 text-white"}`}>{j}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Small", "Medium", "Large"].map((s) => (
              <button key={s} type="button" onClick={() => setSelectedSize(s)} className={`py-2 text-xs font-bold rounded-lg border ${selectedSize === s ? "bg-emerald-600 text-white" : "bg-emerald-600/80 text-white"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-4">
        <h3 className="text-center font-bold text-slate-800 text-lg border-b pb-2">Item Summary and Price</h3>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b text-slate-500 uppercase">
              <th className="p-2">Action</th>
              <th className="p-2">Item Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">QTY</th>
              <th className="p-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id} className="border-b text-slate-700">
                  <td className="p-2">
                    <button type="button" onClick={() => handleRemoveCartItem(item.id)} className="bg-red-500 text-white w-5 h-5 rounded flex items-center justify-center font-bold">×</button>
                  </td>
                  <td className="p-2">{item.itemName}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.qty}</td>
                  <td className="p-2 text-right">{item.price.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-slate-400">No teeth selected yet. Click teeth above to add items.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="space-y-2 pt-2 text-xs">
          <div className="flex justify-between items-center border border-slate-200 rounded p-1">
            <span className="font-semibold text-slate-600 px-2">Additional charge</span>
            <input type="number" value={additionalCharge} onChange={(e) => setAdditionalCharge(e.target.value)} className="w-20 border text-right p-1 outline-none rounded" />
          </div>
          <div className="flex justify-between items-center font-bold px-2">
            <span>Sub-Total</span>
            <span>{subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center border border-slate-200 rounded p-1">
            <span className="font-semibold text-slate-600 px-2">Discount</span>
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-20 border text-right p-1 outline-none rounded" />
          </div>
          <div className="flex justify-between items-center font-extrabold text-sm border-t pt-2 px-2">
            <span>Total</span>
            <span>{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button type="button" onClick={() => setCurrentPage(1)} className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl">
          &larr; Back
        </button>
        <button type="submit" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl">
          Next Step &rarr;
        </button>
      </div>
    </form>
  );
};

export default PageTwo;