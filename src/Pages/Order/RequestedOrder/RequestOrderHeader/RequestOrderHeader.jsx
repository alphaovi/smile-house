import { useState } from "react";
import { toast } from "react-toastify";
import RequestOrderPageOne from "./ModalSteps/RequestOrderPageOne";
import RequestOrderPageTwo from "./ModalSteps/RequestOrderPageTwo";
import RequestOrderPageThree from "./ModalSteps/RequestOrderPageThree";

/**
 * Multi-Step Pop-up View Modal container for inspecting, editing, and approving an order
 */
const RequestOrderViewModal = ({
  order,
  clinicOptions,
  doctorOptions,
  onClose,
  onApproveStatus,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Safe Guard Check: order available na thakle render bondho rakhbe
  if (!order) return null;

  // Form State pre-populated with optional chaining (?.) for safe fallback
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

  // Generic Field Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add Item to Cart Matrix
  const handleAddToCart = (toothNum) => {
    const newItem = {
      id: Date.now(),
      itemName: formData.workType || "Crown",
      description: `Tooth #${toothNum}`,
      price: 60,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  // Remove Item from Cart Matrix
  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos((prev) => [...prev, ...files]);
  };

  // Final Action: Approve Order
  const handleApprove = () => {
    const totalAmount =
      cartItems.reduce((acc, i) => acc + Number(i.price || 0), 0) +
      Number(formData.additionalCharge || 0) -
      Number(formData.discount || 0);

    if (onApproveStatus) {
      onApproveStatus(order.id, "Approved", { ...formData, amount: totalAmount });
    }
    toast.success("Order Approved Successfully!");
    onClose();
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
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 font-bold flex items-center justify-center transition"
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

            {/* Approval Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-green-200"
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