import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import RequestOrderPageOne from "../RequestOrderPageOne/RequestOrderPageOne";
import RequestOrderPageTwo from "../RequestOrderPageTwo/RequestOrderPageTwo";
import RequestOrderPageThree from "../RequestOrderPageThree/RequestOrderPageThree";

/**
 * Multi-Step Pop-up View Modal container with SweetAlert2 & Toastify
 */
const RequestOrderViewModal = ({
  order,
  clinicOptions,
  doctorOptions,
  onClose,
  onApproveStatus,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!order) return null;

  // 1. Initial State from Order Props
  const [formData, setFormData] = useState({
    id: order?.id || "",
    orderNo: order?.orderNo || order?.caseId || "CASE-9001",
    caseId: order?.caseId || order?.orderNo || "CASE-9001",
    clientId: order?.clientId || "",
    clientName: order?.clientName || "",
    clinicName: order?.clinicName || "",
    orderDate: order?.orderDate || "",
    deliveryDate: order?.deliveryDate || "",
    patientName: order?.patientName || "",
    patientAge: order?.patientAge || "30",
    patientGender: order?.patientGender || "Male",
    shippingAddress: order?.shippingAddress || "",
    workGroup: order?.workGroup || "Prosthodontics",
    workType: order?.workType || "Zirconia Crown",
    additionalCharge: order?.additionalCharge || 0,
    discount: order?.discount || 0,
    shadeGroup: order?.shadeGroup || "VITA Classic",
    shadeType: order?.shadeType || "A2",
    comment: order?.comment || "Handle with precision.",
  });

  // 2. Initial Cart Items (Populated from Order or Mock Default)
  const [cartItems, setCartItems] = useState(
    order?.cartItems || [
      {
        id: "item-1",
        itemName: order?.workType || "Zirconia Crown",
        description: "Tooth #16",
        price: Number(order?.amount) || 3000,
        workGroup: order?.workGroup || "Prosthodontics",
        workType: order?.workType || "Zirconia Crown",
        selection: "16",
      },
    ]
  );

  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  // Form Field Update Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Safe Add to Cart Handler (Accepts full object or selection payload)
  const handleAddToCart = (newItemOrSelection) => {
    let newItem;

    // If payload is already a structured item object from RequestOrderPageTwo
    if (
      typeof newItemOrSelection === "object" &&
      newItemOrSelection !== null &&
      newItemOrSelection.description
    ) {
      newItem = newItemOrSelection;
    } else {
      // Fallback if primitive value passed
      const selectionStr = String(newItemOrSelection);
      const isToothNum = /^\d+$/.test(selectionStr);

      newItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        itemName: formData.workType || "Zirconia Crown",
        description: isToothNum ? `Tooth #${selectionStr}` : selectionStr,
        price: selectionStr === "16" ? 3000 : 60,
        workGroup: formData.workGroup,
        workType: formData.workType,
        selection: selectionStr,
      };
    }

    setCartItems((prev) => [...prev, newItem]);
  };

  // Remove Cart Item Handler
  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos((prev) => [...prev, ...files]);
  };

  // 🔔 SweetAlert2 + Toastify Approval Handler (Fixed Issue)
  const handleApprove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to approve Order #${formData.orderNo}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a", // Green
      cancelButtonColor: "#ef4444", // Red
      confirmButtonText: "Yes, Approve it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-xl font-bold px-4 py-2",
        cancelButton: "rounded-xl font-bold px-4 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const subTotal = cartItems.reduce(
          (acc, i) => acc + Number(i.price || 0),
          0
        );
        const totalAmount =
          subTotal +
          Number(formData.additionalCharge || 0) -
          Number(formData.discount || 0);

        if (onApproveStatus) {
          onApproveStatus(order.id, "Approved", {
            ...formData,
            cartItems: cartItems,
            amount: totalAmount,
          });
        }

        // 1. আগে মডাল ক্লোজ করুন
        onClose();

        // 2. মডাল অনমাউন্ট হওয়ার পর Toast ট্রিগার করুন
        setTimeout(() => {
          toast.success(`Order #${formData.orderNo} Approved Successfully!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }, 100);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Order Review & Edit ({formData.orderNo})
            </h2>
            <p className="text-xs text-blue-600 font-bold mt-1">
              Step {currentPage} of 3
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 font-bold flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Step 1 View */}
        {currentPage === 1 && (
          <RequestOrderPageOne
            orderData={formData}
            clinicOptions={clinicOptions}
            doctorOptions={doctorOptions}
            onChange={handleInputChange}
            onNext={(e) => {
              e?.preventDefault();
              setCurrentPage(2);
            }}
          />
        )}

        {/* Step 2 View */}
        {currentPage === 2 && (
          <RequestOrderPageTwo
            orderData={formData}
            onChange={handleInputChange}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onRemoveCartItem={handleRemoveCartItem}
            onPrev={() => setCurrentPage(1)}
            onNext={(e) => {
              e?.preventDefault();
              setCurrentPage(3);
            }}
          />
        )}

        {/* Step 3 View */}
        {currentPage === 3 && (
          <div>
            <RequestOrderPageThree
              orderData={formData}
              onChange={handleInputChange}
              onImageUpload={handleImageUpload}
              uploadedPhotos={uploadedPhotos}
              onPrev={() => setCurrentPage(2)}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition shadow-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-green-200 cursor-pointer"
              >
                Approve Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestOrderViewModal;