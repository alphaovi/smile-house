// mockBackendData.js

// ১. ব্যাকএন্ড থেকে ড্রপডাউন এবং বোতামের জন্য আসা ডাটা
export const mockMasterData = {
  workGroups: [
    "Prosthodontics",
    "Orthodontics",
    "Implantology",
    "Restorative",
  ],
  workTypes: [
    "Zirconia Crown",
    "PFM Crown",
    "Clear Aligners",
    "Acrylic Denture",
    "Night Guard",
  ],
  teethNumbers: {
    upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
    upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
    lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
    lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  },
  jawOptions: [
    "Upper Jaw",
    "Lower Jaw",
    "Both Jaw",
    "Small",
    "Medium",
    "Large",
  ],
};

// ২. ডাটাবেজ থেকে এডিট মোডে লোড হওয়া বিদ্যমান অর্ডার ডাটা (CASE-9001)
export const mockExistingOrder = {
  caseId: "CASE-9001",
  step: 2,
  workGroup: "Prosthodontics",
  workType: "Zirconia Crown",
  additionalCharge: 0,
  discount: 0,
  // Cart Items DB Response Mock
  cartItems: [
    {
      id: "cart-item-1",
      itemName: "Zirconia Crown",
      description: "Tooth #16",
      price: 3000,
      workGroup: "Prosthodontics",
      workType: "Zirconia Crown",
      selection: "16",
    },
    {
      id: "cart-item-2",
      itemName: "Zirconia Crown",
      description: "Upper Jaw",
      price: 60,
      workGroup: "Prosthodontics",
      workType: "Zirconia Crown",
      selection: "Upper Jaw",
    },
    {
      id: "cart-item-3",
      itemName: "Zirconia Crown",
      description: "Lower Jaw",
      price: 60,
      workGroup: "Prosthodontics",
      workType: "Zirconia Crown",
      selection: "Lower Jaw",
    },
  ],
};