import  { useState, useEffect } from "react";

const ShippingAddressSection = ({ clinicAddresses = [], selectedAddress, onSelectAddress }) => {
  const [addressList, setAddressList] = useState([]);
  const [isChanging, setIsChanging] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState("");

  // Update address list when clinic changes
  useEffect(() => {
    if (clinicAddresses.length > 0) {
      setAddressList(clinicAddresses);
      if (!selectedAddress || !clinicAddresses.includes(selectedAddress)) {
        onSelectAddress(clinicAddresses[0]);
      }
    } else {
      setAddressList([]);
    }
  }, [clinicAddresses]);

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;

    const updated = [...addressList, newAddressInput.trim()];
    setAddressList(updated);
    onSelectAddress(newAddressInput.trim());
    setNewAddressInput("");
    setIsAddingNew(false);
    setIsChanging(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Shipping Address *
        </label>
        <button
          type="button"
          onClick={() => {
            setIsChanging(!isChanging);
            setIsAddingNew(false);
          }}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
        >
          {isChanging ? "Done" : "Change"}
        </button>
      </div>

      {/* Default/Selected Input Box View */}
      {!isChanging && !isAddingNew && (
        <input
          type="text"
          value={selectedAddress || ""}
          onChange={(e) => onSelectAddress(e.target.value)}
          placeholder="Select a clinic or enter shipping address"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      )}

      {/* Select Address Options View */}
      {isChanging && !isAddingNew && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <p className="text-xs font-medium text-slate-500">Select an address or add new:</p>
          <div className="space-y-2">
            {addressList.map((addr, idx) => (
              <label
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-xs font-medium transition-all ${
                  selectedAddress === addr
                    ? "bg-blue-50 border-blue-500 text-blue-900"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <input
                  type="radio"
                  name="shippingAddr"
                  checked={selectedAddress === addr}
                  onChange={() => {
                    onSelectAddress(addr);
                    setIsChanging(false);
                  }}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{addr}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsAddingNew(true)}
            className="w-full py-2 bg-white border border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold text-xs rounded-lg transition-all"
          >
            + Add New Address
          </button>
        </div>
      )}

      {/* Add New Address Form View */}
      {isAddingNew && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <p className="text-xs font-bold text-slate-700">Enter New Address</p>
          <input
            type="text"
            value={newAddressInput}
            onChange={(e) => setNewAddressInput(e.target.value)}
            placeholder="House, Road, Area, City..."
            className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddNewAddress}
              className="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg hover:bg-blue-700"
            >
              Save & Select
            </button>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddressSection;