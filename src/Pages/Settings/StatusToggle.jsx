

const StatusToggle = ({ status, onChange, disabled = false }) => {
  const isActive = status === "Active";

  const handleToggle = () => {
    if (disabled) return;

    const newStatus = isActive ? "Inactive" : "Active";
    onChange(newStatus);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-label={`Change status to ${
          isActive ? "Inactive" : "Active"
        }`}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isActive
            ? "bg-green-500 focus:ring-green-400"
            : "bg-gray-300 focus:ring-gray-400"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        {/* Toggle Circle */}
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            isActive ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      {/* Status Text - w-16 এবং text-left যোগ করা হয়েছে */}
      <span
        className={`w-16 text-left text-sm font-medium ${
          isActive ? "text-green-600" : "text-red-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

export default StatusToggle;