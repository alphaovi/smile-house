import { useState } from "react";

const ShippingAddressSection = ({ savedAddresses, selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState(savedAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const handleAddNew = () => {
    if (!newAddress.trim()) return;
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    setSelectedAddress(newAddress);
    setNewAddress('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Shipping Address *
        </label>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs font-bold text-blue-600 hover:underline"
        >
          {showAddForm ? "Cancel" : "+ Add New Address"}
        </button>
      </div>

      {/* Dynamic Saved Address Dropdown */}
      <select
        value={selectedAddress}
        onChange={(e) => setSelectedAddress(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">-- Select Saved Address --</option>
        {addresses.map((addr, idx) => (
          <option key={idx} value={addr}>
            {addr}
          </option>
        ))}
      </select>

      {/* Add New Address Input */}
      {showAddForm && (
        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
          <input
            type="text"
            placeholder="Type new shipping address details..."
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Save Address
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingAddressSection;