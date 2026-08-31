// assetSellData.js
export const assetSellCategories = {
  "Office Equipment": ["Computers & Laptops", "Printers & Scanners", "Monitors"],
  "Furniture & Fixtures": ["Chairs", "Desks & Tables", "Cabinets & Storage"],
  "Vehicles": ["Delivery Vans", "Company Cars"],
};

// Sub-group ভিত্তিক এসেট ইনভেন্টরি ডাটা
export const existingAssetsData = {
  "Computers & Laptops": [
    { invoiceId: "INV-2026-001", productName: "MacBook Pro M3", originalAmount: 220000, currentDepreciation: 30000 },
    { invoiceId: "INV-2026-002", productName: "Dell XPS 15", originalAmount: 180000, currentDepreciation: 25000 },
  ],
  "Printers & Scanners": [
    { invoiceId: "INV-2026-005", productName: "Epson EcoTank Pro", originalAmount: 45000, currentDepreciation: 5000 },
  ],
  "Chairs": [
    { invoiceId: "INV-2026-010", productName: "Ergonomic Executive Chair", originalAmount: 25000, currentDepreciation: 4000 },
  ],
};