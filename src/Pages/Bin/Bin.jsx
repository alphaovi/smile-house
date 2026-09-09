import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  RotateCcw,
  ShoppingBag,
  Wallet,
  TrendingDown,
  Search,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

const Bin = () => {
  // ডামি ডাটা
  const [deletedItems, setDeletedItems] = useState([
    {
      id: "1",
      title: "Case #1024 - Property Dispute",
      category: "Case Management",
      deletedAt: "2 hours ago",
      details: "Client: Rahat Ahmed | Lawyer: Tanvir H.",
    },
    {
      id: "2",
      title: "Payment Receipt #PR-882",
      category: "Finance - Income",
      deletedAt: "1 day ago",
      details: "Amount: ৳ 15,000 | Client: Karim Mia",
    },
    {
      id: "3",
      title: "Office Stationary Expense",
      category: "Finance - Expense",
      deletedAt: "3 days ago",
      details: "Amount: ৳ 3,200 | Category: Office Supplies",
    },
    {
      id: "4",
      title: "Case #1011 - Agreement Draft",
      category: "Case Management",
      deletedAt: "5 days ago",
      details: "Client: Soft Tech Ltd.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // কনফার্মেশন মোডাল ও সাকসেস নোটিফিকেশনের জন্য স্টেট
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null, // "restore" | "delete"
    item: null,
  });

  const [toastMessage, setToastMessage] = useState(null);

  // সাকসেস টোস্ট দেখানোর হেলপার ফাংশন
  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  //Restore বা Permanent Delete বাটনে ক্লিক করলে কনফার্মেশন মোডাল ওপেন হবে
  const openConfirmModal = (type, item) => {
    setModalConfig({
      isOpen: true,
      type,
      item,
    });
  };

  // কনফার্ম মোডালে 'Yes' ক্লিক করলে এই ফাংশন এক্সিকিউট হবে
  const handleConfirmAction = () => {
    const { type, item } = modalConfig;
    if (!item) return;

    if (type === "restore") {
      // Restore Logic
      setDeletedItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`"${item.title}" has been restored successfully!`, "success");
      // TODO: Backend API Call -> e.g., axios.patch(`/api/restore/${item.id}`)
    } else if (type === "delete") {
      // Permanent Delete Logic
      setDeletedItems((prev) => prev.filter((i) => i.id !== item.id));
      showToast(`"${item.title}" permanently deleted!`, "error");
      // TODO: Backend API Call -> e.g., axios.delete(`/api/permanent-delete/${item.id}`)
    }

    // মোডাল বন্ধ করা
    setModalConfig({ isOpen: false, type: null, item: null });
  };

  // ক্যাটাগরি ও সার্চ ফিল্টার
  const filteredItems = deletedItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "All" ||
      item.category.toLowerCase().includes(activeTab.toLowerCase());

    return matchesSearch && matchesTab;
  });

  const getCategoryIcon = (category) => {
    if (category.includes("Case"))
      return <ShoppingBag className="size-4 text-primary" />;
    if (category.includes("Income"))
      return <Wallet className="size-4 text-success" />;
    if (category.includes("Expense"))
      return <TrendingDown className="size-4 text-error" />;
    return <Trash2 className="size-4 text-base-content/70" />;
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-base-300">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trash2 className="size-7 text-error" />
            Recycle Bin
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Manage deleted items. Restoring will send them back, or delete them permanently.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/50" />
          <input
            type="text"
            placeholder="Search deleted items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered input-sm w-full pl-9 focus:outline-none rounded-lg"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {["All", "Case", "Income", "Expense"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn btn-sm rounded-full font-medium transition-all ${
              activeTab === tab
                ? "btn-primary text-white"
                : "btn-ghost text-base-content/70 hover:bg-base-200"
            }`}
          >
            {tab === "All" ? "All Items" : tab}
          </button>
        ))}
      </div>

      {/* Deleted Items List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Left Info Area */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-base-200 shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-base text-base-content">
                        {item.title}
                      </h3>
                      <span className="badge badge-sm badge-soft badge-neutral text-xs font-normal">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-base-content/60 mt-1">
                      {item.details}
                    </p>
                    <span className="text-[11px] text-base-content/40 block mt-1">
                      Deleted: {item.deletedAt}
                    </span>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-base-200">
                  {/* Restore Button */}
                  <button
                    onClick={() => openConfirmModal("restore", item)}
                    className="btn btn-sm btn-outline btn-primary rounded-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform"
                    title="Restore Item"
                  >
                    <RotateCcw className="size-4" />
                    <span>Restore</span>
                  </button>

                  {/* Permanent Delete Button */}
                  <button
                    onClick={() => openConfirmModal("delete", item)}
                    className="btn btn-sm btn-error btn-soft hover:btn-error hover:text-white rounded-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform"
                    title="Permanent Delete"
                  >
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            /* Empty State Area */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-base-300 rounded-2xl bg-base-100/50"
            >
              <div className="p-4 rounded-full bg-base-200/60 mb-3">
                <AlertCircle className="size-8 text-base-content/40" />
              </div>
              <h3 className="font-semibold text-lg text-base-content/80">
                No deleted items found
              </h3>
              <p className="text-sm text-base-content/50 max-w-sm mt-1">
                {searchQuery || activeTab !== "All"
                  ? "Try adjusting your search or tab filters."
                  : "Your bin is completely clean and empty!"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ----------------- CONFIRMATION MODAL ----------------- */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-2xl max-w-md w-full relative"
            >
              {/* Close Icon */}
              <button
                onClick={() =>
                  setModalConfig({ isOpen: false, type: null, item: null })
                }
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              >
                <X className="size-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                {/* Icon based on Action */}
                <div
                  className={`p-3.5 rounded-full mb-4 ${
                    modalConfig.type === "restore"
                      ? "bg-primary/10 text-primary"
                      : "bg-error/10 text-error"
                  }`}
                >
                  {modalConfig.type === "restore" ? (
                    <RotateCcw className="size-8" />
                  ) : (
                    <AlertTriangle className="size-8" />
                  )}
                </div>

                <h3 className="text-lg font-bold">
                  {modalConfig.type === "restore"
                    ? "Restore Item?"
                    : "Permanently Delete?"}
                </h3>

                <p className="text-sm text-base-content/70 mt-2">
                  {modalConfig.type === "restore" ? (
                    <>
                      Are you sure you want to restore{" "}
                      <span className="font-semibold text-base-content">
                        "{modalConfig.item?.title}"
                      </span>
                      ? It will move back to its original database location.
                    </>
                  ) : (
                    <>
                      Are you sure you want to permanently delete{" "}
                      <span className="font-semibold text-base-content">
                        "{modalConfig.item?.title}"
                      </span>
                      ? This action cannot be undone.
                    </>
                  )}
                </p>

                {/* Modal Buttons */}
                <div className="flex items-center gap-3 w-full mt-6">
                  <button
                    onClick={() =>
                      setModalConfig({ isOpen: false, type: null, item: null })
                    }
                    className="btn btn-ghost border-base-300 rounded-xl flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    className={`btn flex-1 text-white rounded-xl ${
                      modalConfig.type === "restore"
                        ? "btn-primary"
                        : "btn-error"
                    }`}
                  >
                    {modalConfig.type === "restore"
                      ? "Yes, Restore"
                      : "Yes, Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- ACTION TOAST NOTIFICATION ----------------- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white ${
                toastMessage.type === "success" ? "bg-success" : "bg-error"
              }`}
            >
              {toastMessage.type === "success" ? (
                <CheckCircle2 className="size-5 shrink-0" />
              ) : (
                <Trash2 className="size-5 shrink-0" />
              )}
              <span className="text-sm font-medium">
                {toastMessage.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bin;