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

  const [formData, setFormData] = useState({
    id: order?.id || "",
    orderNo: order?.orderNo || "",
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
    additionalCharge: 0,
    discount: 0,
    shadeGroup: "VITA Classic",
    shadeType: "A2",
    comment: "Handle with precision.",
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      itemName: order?.workType || "Zirconia Crown",
      description: "Tooth #16",
      price: Number(order?.amount) || 150,
    },
  ]);

  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (toothNum) => {
    const newItem = {
      id: Date.now(),
      itemName: formData.workType || "Crown",
      description: `Tooth #${toothNum}`,
      price: 60,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos((prev) => [...prev, ...files]);
  };

  // 🔔 SweetAlert2 + Toastify Approval Handler
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
        const totalAmount =
          cartItems.reduce((acc, i) => acc + Number(i.price || 0), 0) +
          Number(formData.additionalCharge || 0) -
          Number(formData.discount || 0);

        if (onApproveStatus) {
          onApproveStatus(order.id, "Approved", {
            ...formData,
            amount: totalAmount,
          });
        }

        // 🚀 Toastify Alert Trigger
        toast.success(`Order #${formData.orderNo} Approved Successfully!`);

        // Close modal after a micro-tick so toast renders smoothly
        setTimeout(() => {
          onClose();
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