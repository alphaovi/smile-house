import { useState, useEffect } from "react";
import { X, Package, DollarSign, FolderPlus, Layers } from "lucide-react";

const CreateProductModalSetting = ({
  isOpen,
  onClose,
  onSubmit,
  groups = [],
  nextId,
  onOpenGroupManagement,
}) => {
  const [formData, setFormData] = useState({
    productId: nextId,
    group: "",
    subGroup: "",
    productName: "",
    price: "",
  });

  const [availableSubGroups, setAvailableSubGroups] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        productId: nextId,
        group: "",
        subGroup: "",
        productName: "",
        price: "",
        status: "Active",
      });
      setAvailableSubGroups([]);
    }
  }, [isOpen, nextId]);

  const handleGroupChange = (e) => {
    const selectedGroupName = e.target.value;
    const foundGroup = groups.find((g) => g.name === selectedGroupName);

    setFormData((prev) => ({
      ...prev,
      group: selectedGroupName,
      subGroup: "",
    }));

    setAvailableSubGroups(foundGroup ? foundGroup.subGroups || [] : []);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 className="text-xl font-semibold tracking-wide">
              Add New Product
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Fill in details to create a product item
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Buttons inside Product Modal */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-100/70 border-b border-slate-200/60 gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Quick Actions:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenGroupManagement("groups")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add / Edit Group</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenGroupManagement("subgroups")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200 bg-white text-purple-700 hover:bg-purple-50 text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Add / Edit Product</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-1  gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Product ID
              </label>
              <input
                type="text"
                value={formData.productId}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-600 font-mono text-sm font-semibold cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Group <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={formData.group}
                onChange={handleGroupChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer font-medium"
              >
                <option value="">Select Group</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Product <span className="text-rose-500">*</span>
              </label>
              <select
                required
                disabled={!formData.group}
                value={formData.subGroup}
                onChange={(e) =>
                  setFormData({ ...formData, subGroup: e.target.value })
                }
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm transition-all font-medium ${
                  !formData.group
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-50 border-slate-200 text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                }`}
              >
                <option value="">
                  {formData.group ? "Select Sub Group" : "Select Group First"}
                </option>
                {availableSubGroups.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Price (৳) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="number"
                required
                min="0"
                placeholder="e.g. 3500"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModalSetting;
