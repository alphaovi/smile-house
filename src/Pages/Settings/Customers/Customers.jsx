import { useState } from "react";

import DataTable from "../DataTable";
import PageHeader from "../PageHeader";
import StatusBadge from "../StatusBadge";

const Customers = () => {
  const [customers] = useState([
    {
      _id: "1",
      clinicName: "Smile Dental Clinic",
      attentionName: "Dr. Rahim",
      status: "Active",
    },
    {
      _id: "2",
      clinicName: "Happy Dental Care",
      attentionName: "Dr. Karim",
      status: "Inactive",
    },
  ]);

  const columns = [
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
        <StatusBadge status={item.status} />
      ),
    },
  ];

  const handleAdd = () => {
    console.log("Open Customer Form");
  };

  const handleEdit = (customer) => {
    console.log("Edit:", customer);
  };

  const handleDelete = (customer) => {
    console.log("Delete:", customer);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Customers"
        description="Manage your clinics and customers"
        buttonText="Add Customer"
        onAdd={handleAdd}
      />

      <DataTable
        columns={columns}
        data={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Customers;