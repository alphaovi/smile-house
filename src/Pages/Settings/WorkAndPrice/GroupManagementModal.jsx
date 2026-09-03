import { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2, Check, Group, Layers, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const GroupManagementModal = ({
  isOpen,
  onClose,
  groups = [],
  setGroups,
  initialTab = "groups",
  onBackToProductModal,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editGroupName, setEditGroupName] = useState("");

  const [newSubGroupInput, setNewSubGroupInput] = useState("");
  const [editingSubGroupIndex, setEditingSubGroupIndex] = useState(null);
  const [editSubGroupName, setEditSubGroupName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      if (groups.length > 0) {
        if (!selectedGroupId || !groups.some((g) => g.id === selectedGroupId)) {
          setSelectedGroupId(groups[0].id);
        }
      } else {
        setSelectedGroupId("");
      }
    }
  }, [isOpen, initialTab, groups]);

  if (!isOpen) return null;

  // Group Handlers
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now().toString(),
      name: newGroupName.trim(),
      subGroups: [],
    };

    setGroups((prev) => [...prev, newGroup]);
    setNewGroupName("");
    setSelectedGroupId(newGroup.id);
    toast.success("Group added successfully!");
  };

  const handleUpdateGroup = (groupId) => {
    if (!editGroupName.trim()) return;
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name: editGroupName.trim() } : g))
    );
    setEditingGroupId(null);
    toast.success("Group updated successfully!");
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    if (selectedGroupId === groupId) {
      const remaining = groups.filter((g) => g.id !== groupId);
      setSelectedGroupId(remaining.length > 0 ? remaining[0].id : "");
    }
    toast.success("Group deleted successfully!");
  };

  // Subgroup Handlers
  const handleAddSubGroup = (e) => {
    e.preventDefault();
    if (!selectedGroupId || !newSubGroupInput.trim()) return;

    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === selectedGroupId) {
          const currentSubs = g.subGroups || [];
          return { ...g, subGroups: [...currentSubs, newSubGroupInput.trim()] };
        }
        return g;
      })
    );
    setNewSubGroupInput("");
    toast.success("Subgroup added successfully!");
  };

  const handleUpdateSubGroup = (index) => {
    if (!editSubGroupName.trim()) return;

    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === selectedGroupId) {
          const updatedSub = [...(g.subGroups || [])];
          updatedSub[index] = editSubGroupName.trim();
          return { ...g, subGroups: updatedSub };
        }
        return g;
      })
    );
    setEditingSubGroupIndex(null);
    toast.success("Subgroup updated successfully!");
  };

  const handleDeleteSubGroup = (index) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === selectedGroupId) {
          return {
            ...g,
            subGroups: (g.subGroups || []).filter((_, i) => i !== index),
          };
        }
        return g;
      })
    );
    toast.success("Subgroup deleted successfully!");
  };

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToProductModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Back to Product Form"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-lg font-semibold tracking-wide">Manage Categories</h3>
              <p className="text-xs text-slate-400">Add or edit product groups and subgroups</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-start p-3 bg-slate-100/70 border-b border-slate-200/60 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("groups")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "groups"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Group className="w-4 h-4" />
            <span>Groups</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("subgroups")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "subgroups"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Subgroups</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === "groups" ? (
            /* Groups View */
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800">Add & Edit Groups</h4>
              <form onSubmit={handleAddGroup} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter New Group Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-xl hover:bg-indigo-700 flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </form>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {groups.length > 0 ? (
                  groups.map((g) => (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-3 rounded-xl text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                    >
                      {editingGroupId === g.id ? (
                        <div className="flex items-center gap-2 w-full mr-2">
                          <input
                            type="text"
                            value={editGroupName}
                            onChange={(e) => setEditGroupName(e.target.value)}
                            className="w-full px-2.5 py-1 border border-slate-300 rounded-lg bg-white text-xs focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdateGroup(g.id)}
                            className="text-emerald-600 hover:text-emerald-700 p-1 cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-700">{g.name}</span>
                          <span className="text-[10px] bg-slate-200/60 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                            {(g.subGroups || []).length} sub-items
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingGroupId(g.id);
                            setEditGroupName(g.name);
                          }}
                          className="p-1.5 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGroup(g.id)}
                          className="p-1.5 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-4">
                    No groups created yet.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Subgroups View */
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800">Add & Edit Subgroups</h4>

              {/* Full Width Select Group Section */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1.5">
                <label className="block text-xs font-semibold text-slate-600">
                  Select Parent Group <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedGroupId}
                  onChange={(e) => setSelectedGroupId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
                >
                  {groups.length === 0 && (
                    <option value="">No groups available</option>
                  )}
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} ({(g.subGroups || []).length} subgroups)
                    </option>
                  ))}
                </select>
              </div>

              {selectedGroup ? (
                <>
                  <form onSubmit={handleAddSubGroup} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      placeholder={`New subgroup for "${selectedGroup.name}"`}
                      value={newSubGroupInput}
                      onChange={(e) => setNewSubGroupInput(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-xl hover:bg-indigo-700 flex items-center gap-1 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" /> Add Subgroup
                    </button>
                  </form>

                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {selectedGroup.subGroups && selectedGroup.subGroups.length > 0 ? (
                      selectedGroup.subGroups.map((sub, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                        >
                          {editingSubGroupIndex === idx ? (
                            <div className="flex items-center gap-2 w-full mr-2">
                              <input
                                type="text"
                                value={editSubGroupName}
                                onChange={(e) => setEditSubGroupName(e.target.value)}
                                className="w-full px-2.5 py-1 border border-slate-300 rounded-lg bg-white text-xs focus:outline-none focus:border-indigo-500"
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateSubGroup(idx)}
                                className="text-emerald-600 hover:text-emerald-700 p-1 cursor-pointer"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="font-semibold text-slate-700">{sub}</span>
                          )}

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingSubGroupIndex(idx);
                                setEditSubGroupName(sub);
                              }}
                              className="p-1.5 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubGroup(idx)}
                              className="p-1.5 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic text-center py-4">
                        No subgroups found for "{selectedGroup.name}". Add one above!
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-400 italic text-center py-4">
                  Please add a Group first before creating Subgroups.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-100">
          <button
            type="button"
            onClick={onBackToProductModal}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all cursor-pointer"
          >
            Back to Add Product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupManagementModal;