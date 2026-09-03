import { useState } from "react";
import { Settings, FolderPlus, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import DataTable from "../DataTable";
import PageHeader from "../PageHeader";
import StatusToggle from "../StatusToggle";

import GroupManagementModal from "./GroupManagementModal";
import CreateProductModalSetting from "./CreateProductModalSetting";

const Products = () => {
  const navigate = useNavigate();

  // =========================
  // Groups
  // =========================
  const [groups, setGroups] = useState([
    {
      id: "1",
      name: "Crown",
      subGroups: ["Zirconia", "PFM", "E-Max"],
    },
    {
      id: "2",
      name: "Bridge",
      subGroups: ["Maryland Bridge", "Cantilever"],
    },
  ]);

  // =========================
  // Products
  // =========================
  const [products, setProducts] = useState([
    {
      _id: "1",
      productId: "PRD-001",
      group: "Crown",
      subGroup: "Zirconia",
      productName: "Zirconia Crown",
      price: 3000,
      status: "Active",
    },
    {
      _id: "2",
      productId: "PRD-002",
      group: "Crown",
      subGroup: "PFM",
      productName: "PFM Crown",
      price: 2000,
      status: "Active",
    },
  ]);

  // =========================
  // Modal States
  // =========================
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [initialModalTab, setInitialModalTab] = useState("groups");

  // =========================
  // Status Change
  // =========================
  const handleStatusChange = (id, newStatus) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id
          ? {
              ...product,
              status: newStatus,
            }
          : product
      )
    );

    toast.success(`Product status changed to ${newStatus}`);
  };

  // =========================
  // Table Columns
  // =========================
  const columns = [
    {
      key: "productId",
      label: "Product ID",
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
          {item.productId}
        </span>
      ),
    },

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

    // =========================
    // Status Toggle
    // =========================
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

  // =========================
  // Edit Product
  // =========================
  const handleEdit = (product) => {
    console.log("Edit:", product);
  };

  // =========================
  // Delete Product
  // =========================
  const handleDelete = (product) => {
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
        setProducts((prev) =>
          prev.filter((item) => item._id !== product._id)
        );

        toast.success("Product deleted successfully!");
      }
    });
  };

  // =========================
  // Add Product
  // =========================
  const handleAddProductSubmit = (formData) => {
    const newProduct = {
      _id: Date.now().toString(),
      ...formData,
      price: Number(formData.price),
    };

    setProducts((prev) => [newProduct, ...prev]);

    toast.success("New Product added successfully!");
  };

  // =========================
  // Open Group Management
  // =========================
  const openGroupModalWithTab = (tab = "groups") => {
    setInitialModalTab(tab);
    setIsGroupModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">

      {/* =========================
          Header
      ========================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <PageHeader
          title="Products"
          description="Manage your dental lab products and categories"
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">

          {/* Settings */}
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-500" />

            <span>Go to Settings</span>
          </button>

          {/* Add Product */}
          <button
            type="button"
            onClick={() => setIsProductModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />

            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* =========================
          Product Table
      ========================= */}
      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* =========================
          Group & Subgroup Modal
      ========================= */}
      <GroupManagementModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        groups={groups}
        setGroups={setGroups}
        initialTab={initialModalTab}
        onBackToProductModal={() => {
          setIsGroupModalOpen(false);
          setIsProductModalOpen(true);
        }}
      />

      {/* =========================
          Create Product Modal
      ========================= */}
      <CreateProductModalSetting
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleAddProductSubmit}
        groups={groups}
        nextId={`PRD-00${products.length + 1}`}
        onOpenGroupManagement={(tab) => {
          setIsProductModalOpen(false);
          openGroupModalWithTab(tab);
        }}
      />
    </div>
  );
};

export default Products;