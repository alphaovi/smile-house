import { useState } from "react";

import DataTable from "../DataTable";
import PageHeader from "../PageHeader";
import StatusBadge from "../StatusBadge";

const Products = () => {
  const [products] = useState([
    {
      _id: "1",
      group: "Crown",
      subGroup: "Zirconia",
      productName: "Zirconia Crown",
      price: 3000,
      status: "Active",
    },
    {
      _id: "2",
      group: "Crown",
      subGroup: "PFM",
      productName: "PFM Crown",
      price: 2000,
      status: "Active",
    },
  ]);

  const columns = [
    {
      key: "group",
      label: "Group",
    },
    {
      key: "subGroup",
      label: "Sub Group",
    },
    {
      key: "productName",
      label: "Product Name",
    },
    {
      key: "price",
      label: "Price",
      render: (item) => `৳${item.price}`,
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
    console.log("Open Product Form");
  };

  const handleEdit = (product) => {
    console.log("Edit:", product);
  };

  const handleDelete = (product) => {
    console.log("Delete:", product);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Products"
        description="Manage your dental lab products"
        buttonText="Add Product"
        onAdd={handleAdd}
      />

      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Products;