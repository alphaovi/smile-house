import  { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderPageOne from "./OrderPageOne";
import OrderPageTwo from "./OrderPageTwo";
import OrderPageThree from "./OrderPageThree";



// --- DEMO DATA ---
const demoClinics = [
  {
    id: 1,
    doctorName: "Dr. John Apex",
    name: "Apex Dental Clinic, Dhanmondi",
    addresses: [
      "House 12, Road 5, Dhanmondi, Dhaka",
      "Branch 2: House 45, Road 8, Dhanmondi, Dhaka"
    ],
  },
  {
    id: 2,
    doctorName: "Dr. Jorge N. Weaver",
    name: "Smile Care Dental, Gulshan",
    addresses: ["Plot 45, Avenue 2, Gulshan-1, Dhaka"],
  },
  {
    id: 3,
    doctorName: "Dr. Beulah J. Delgado",
    name: "City Dental Hospital, Uttara",
    addresses: ["Sector 4, Main Road, Uttara, Dhaka"],
  },
];

const workGroups = ["Prosthodontics", "Orthodontics", "Implantology", "Restorative"];
const workTypes = ["Zirconia Crown", "PFM Crown", "Clear Aligners", "Acrylic Denture", "Night Guard"];

const shadeData = {
  VITA: ["A1", "A2", "A3", "B1", "B2", "C1"],
  "3D_Master": ["1M1", "2M2", "3M3", "4M4"],
  Bleach: ["BL1", "BL2", "BL3", "BL4"],
};

const upperRightTeeth = [18, 17, 16, 15, 14, 13, 12, 11];
const upperLeftTeeth = [21, 22, 23, 24, 25, 26, 27, 28];
const lowerRightTeeth = [48, 47, 46, 45, 44, 43, 42, 41];
const lowerLeftTeeth = [31, 32, 33, 34, 35, 36, 37, 38];

const CreateNewOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Page 1 States
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [shippingAddress, setShippingAddress] = useState("");
  const [caseId, setCaseId] = useState("");

  // Page 2 States
  const [workGroup, setWorkGroup] = useState("");
  const [workType, setWorkType] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [additionalCharge, setAdditionalCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectedJaw, setSelectedJaw] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Page 3 States
  const [shadeGroup, setShadeGroup] = useState("");
  const [shadeType, setShadeType] = useState("");
  const [designSelections, setDesignSelections] = useState({
    metalDesign: "",
    ponticDesign: "",
    occlusalStaining: "Non",
    occlusalType: "Non",
    smilePattern: "",
  });
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [comment, setComment] = useState("");

  const generateCaseId = (clinicObj) => {
    if (!clinicObj) return;
    const prefix = clinicObj.name.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setCaseId(`${prefix}-${randomNum}`);
  };

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    setSelectedDoctor({ name: clinic.doctorName, clinicId: clinic.id });
    setShippingAddress(clinic.addresses[0] || "");
    generateCaseId(clinic);
  };

  const handleDoctorSelect = (docName) => {
    const clinic = demoClinics.find((c) => c.doctorName === docName);
    if (clinic) {
      setSelectedClinic(clinic);
      setSelectedDoctor({ name: clinic.doctorName, clinicId: clinic.id });
      setShippingAddress(clinic.addresses[0] || "");
      generateCaseId(clinic);
    }
  };

  const handleToothClick = (toothNum) => {
    if (!workType) {
      toast.warning("Please select a Work Type first!");
      return;
    }
    const newItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      itemName: workType || "Acrylic Denture Base",
      description: toothNum,
      qty: 1,
      price: 50.0,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const grandTotal = subTotal + Number(additionalCharge) - Number(discount);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedPhotos.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 photos.");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 500;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.4);
          setUploadedPhotos((prev) => [...prev, compressedDataUrl]);
        };
      };
    });
  };

  const handleNextToPage2 = (e) => {
    e.preventDefault();
    if (!selectedClinic) {
      toast.warning("Please select a clinic!");
      return;
    }
    setCurrentPage(2);
  };

  const handleNextToPage3 = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.warning("Please select at least one tooth for the order!");
      return;
    }
    setCurrentPage(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOrderData = {
      orderDate,
      deliveryDate,
      clinic: selectedClinic?.name,
      doctor: selectedDoctor?.name,
      caseId,
      patient: { name: patientName, age: patientAge, gender: patientGender },
      shippingAddress,
      workDetails: { group: workGroup, type: workType },
      cartItems,
      pricing: { subTotal, additionalCharge, discount, grandTotal },
      dentalSpecs: { jaw: selectedJaw, size: selectedSize },
      shadeDetails: { group: shadeGroup, type: shadeType },
      designSelections,
      uploadedPhotosCount: uploadedPhotos.length,
      comment,
    };

    console.log("Complete Form Submission Data:", finalOrderData);
    toast.success("Order Created Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-3xl border border-slate-200/80 shadow-sm my-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="border-b border-slate-100 pb-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Order</h1>
          <p className="text-slate-500 text-sm mt-1">
            {currentPage === 1 && "Step 1: Basic Info, Clinic & Case Details"}
            {currentPage === 2 && "Step 2: Dental Chart, Cart & Pricing"}
            {currentPage === 3 && "Step 3: Shade, Design, Photos & Instructions"}
          </p>
        </div>
        <div className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
          Page {currentPage} of 3
        </div>
      </div>

      {currentPage === 1 && (
        <OrderPageOne
          orderDate={orderDate} setOrderDate={setOrderDate}
          deliveryDate={deliveryDate} setDeliveryDate={setDeliveryDate}
          selectedClinic={selectedClinic} handleClinicSelect={handleClinicSelect}
          selectedDoctor={selectedDoctor} handleDoctorSelect={handleDoctorSelect}
          demoClinics={demoClinics} caseId={caseId}
          patientName={patientName} setPatientName={setPatientName}
          patientAge={patientAge} setPatientAge={setPatientAge}
          patientGender={patientGender} setPatientGender={setPatientGender}
          shippingAddress={shippingAddress} setShippingAddress={setShippingAddress}
          handleNextToPage2={handleNextToPage2}
        />
      )}

      {currentPage === 2 && (
        <OrderPageTwo
          workGroup={workGroup} setWorkGroup={setWorkGroup}
          workType={workType} setWorkType={setWorkType}
          workGroups={workGroups} workTypes={workTypes}
          upperRightTeeth={upperRightTeeth} upperLeftTeeth={upperLeftTeeth}
          lowerRightTeeth={lowerRightTeeth} lowerLeftTeeth={lowerLeftTeeth}
          handleToothClick={handleToothClick}
          selectedJaw={selectedJaw} setSelectedJaw={setSelectedJaw}
          selectedSize={selectedSize} setSelectedSize={setSelectedSize}
          cartItems={cartItems} handleRemoveCartItem={handleRemoveCartItem}
          additionalCharge={additionalCharge} setAdditionalCharge={setAdditionalCharge}
          subTotal={subTotal} discount={discount} setDiscount={setDiscount}
          grandTotal={grandTotal} setCurrentPage={setCurrentPage}
          handleNextToPage3={handleNextToPage3}
        />
      )}

      {currentPage === 3 && (
        <OrderPageThree
          shadeGroup={shadeGroup} setShadeGroup={setShadeGroup}
          shadeType={shadeType} setShadeType={setShadeType}
          shadeData={shadeData}
          setDesignSelections={setDesignSelections}
          handleImageUpload={handleImageUpload}
          uploadedPhotos={uploadedPhotos}
          comment={comment} setComment={setComment}
          setCurrentPage={setCurrentPage}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateNewOrder;