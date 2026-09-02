import { useState } from "react";

import DataTable from "../DataTable";
import PageHeader from "../PageHeader";
import StatusBadge from "../StatusBadge";

const Employees = () => {
  const [employees] = useState([
    {
      _id: "1",
      employeeName: "Rahim Ahmed",
      phone: "01700000000",
      assignedCustomers: 12,
      status: "Active",
    },
    {
      _id: "2",
      employeeName: "Karim Hasan",
      phone: "01800000000",
      assignedCustomers: 8,
      status: "Active",
    },
  ]);

  const columns = [
    {
      key: "employeeName",
      label: "Employee Name",
    },
    {
      key: "phone",
      label: "Phone No",
    },
    {
      key: "assignedCustomers",
      label: "Assigned Customers",
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  const handleAdd = () => {
    console.log("Open Employee Form");
  };

  const handleEdit = (employee) => {
    console.log("Edit:", employee);
  };

  const handleDelete = (employee) => {
    console.log("Delete:", employee);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Employees"
        description="Manage your employees"
        buttonText="Add Employee"
        onAdd={handleAdd}
      />

      <DataTable
        columns={columns}
        data={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Employees;