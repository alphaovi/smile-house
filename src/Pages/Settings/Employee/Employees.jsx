import { useState } from "react";
import { Settings, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import DataTable from "../DataTable";
import PageHeader from "../PageHeader";
import StatusToggle from "../StatusToggle";
import CreateEmployeeModal from "./CreateEmployeeModal";

const Employees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([
    {
      _id: "1",
      employeeId: "EMP-001",
      employeeName: "Rahim Ahmed",
      phone: "01700000000",
      email: "rahim@example.com",
      designation: "Senior Manager",
      department: "Sales",
      role: "Manager",
      assignedCustomers: 12,
      status: "Active",
    },
    {
      _id: "2",
      employeeId: "EMP-002",
      employeeName: "Karim Hasan",
      phone: "01800000000",
      email: "karim@example.com",
      designation: "Lab Technician",
      department: "Production",
      role: "Technician",
      assignedCustomers: 8,
      status: "Active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status Toggle
  const handleStatusChange = (id, newStatus) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee._id === id
          ? {
              ...employee,
              status: newStatus,
            }
          : employee
      )
    );

    toast.success(`Employee status changed to ${newStatus}`);
  };

  const columns = [
    {
      key: "employeeId",
      label: "Employee ID",
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
          {item.employeeId}
        </span>
      ),
    },

    {
      key: "employeeName",
      label: "Employee Name",
    },

    {
      key: "designation",
      label: "Designation",
    },

    {
      key: "phone",
      label: "Phone No",
    },

    {
      key: "role",
      label: "Role",
      render: (item) => (
        <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
          {item.role || "Employee"}
        </span>
      ),
    },

    {
      key: "assignedCustomers",
      label: "Assigned Customers",
    },

    // ⭐ Status
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

  const handleEdit = (employee) => {
    console.log("Edit:", employee);
  };

  const handleDelete = (employee) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees((prev) =>
          prev.filter((item) => item._id !== employee._id)
        );

        toast.success("Employee deleted successfully!");
      }
    });
  };

  const handleAddEmployeeSubmit = (formData) => {
    const newEmployee = {
      _id: Date.now().toString(),
      ...formData,
      assignedCustomers: Number(formData.assignedCustomers || 0),
    };

    setEmployees((prev) => [newEmployee, ...prev]);

    toast.success("Employee created successfully!");
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Employees"
          description="Manage your employees and access roles"
        />

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Go to Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEmployeeSubmit}
        nextEmployeeId={`EMP-00${employees.length + 1}`}
      />
    </div>
  );
};

export default Employees;