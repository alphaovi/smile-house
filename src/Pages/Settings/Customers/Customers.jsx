import { useState } from "react";
import { useNavigate } from "react-router";
import { Settings as SettingsIcon } from "lucide-react";

import DataTable from "../DataTable";
import PageHeader from "../PageHeader";
import StatusToggle from "../StatusToggle";
import CustomerModal from "../Customers/CreateCustomer/CreateCustomerModal";

const Customers = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customers, setCustomers] = useState([
    {
      _id: "1",
      customerId: "CUST-001",
      clinicName: "Smile Dental Clinic",
      attentionName: "Dr. Rahim",
      status: "Active",
    },
    {
      _id: "2",
      customerId: "CUST-002",
      clinicName: "Happy Dental Care",
      attentionName: "Dr. Karim",
      status: "Inactive",
    },
  ]);

  // Generate next Customer ID
  const getNextCustomerId = () => {
    const nextNumber = customers.length + 1;

    return `CUST-${String(nextNumber).padStart(3, "0")}`;
  };

  // Handle Customer Status Change
  const handleStatusChange = (id, newStatus) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer._id === id
          ? {
              ...customer,
              status: newStatus,
            }
          : customer
      )
    );
  };

  // Table Columns
  const columns = [
    {
      key: "customerId",
      label: "Customer ID",
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
          {item.customerId}
        </span>
      ),
    },

    {
      key: "clinicName",
      label: "Clinic Name",
    },

    {
      key: "attentionName",
      label: "Attention Name",
    },

    {
      key: "status",
      label: "Status",
      render: (item) => (
        <StatusToggle
          status={item.status}
          onChange={(newStatus) =>
            handleStatusChange(item._id, newStatus)
          }
        />
      ),
    },
  ];

  // Add Customer
  const handleAdd = () => {
    setIsModalOpen(true);
  };

  // Settings
  const handleSettings = () => {
    navigate("/settings");
  };

  // Save Customer
  const handleSaveCustomer = (newCustomerData) => {
    const newCustomer = {
      _id: String(Date.now()),
      ...newCustomerData,
    };

    setCustomers((prev) => [...prev, newCustomer]);

    console.log("Submitted Customer Payload:", newCustomer);
  };

  // Edit Customer
  const handleEdit = (customer) => {
    console.log("Edit:", customer);
  };

  // Delete Customer
  const handleDelete = (customer) => {
    console.log("Delete:", customer);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader
          title="Customers"
          description="Manage your clinics and customers"
          showAddButton={false}
          action={null}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Settings Button */}
          <button
            type="button"
            onClick={handleSettings}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium shadow-sm cursor-pointer transition-colors"
          >
            <SettingsIcon className="w-4 h-4 text-slate-500" />
            Settings
          </button>

          {/* Add Customer Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md shadow-indigo-600/20 cursor-pointer transition-all"
          >
            Add Customer
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveCustomer}
        nextId={getNextCustomerId()}
      />
    </div>
  );
};

export default Customers;