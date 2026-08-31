# Accounts & Expense Management Module

An intuitive and modern React-based feature component designed for tracking and managing business/personal expenses efficiently.

---

## 🚀 Features

* **Interactive Form Input**: Easily select dates, category groups, specific expense types, payment sources, and notes.
* **Dynamic Category Filtering**: `TypeSelect` automatically populates categories based on the selected `GroupSelect`.
* **Confirmation Dialogue**: Integrates **SweetAlert2** to confirm transaction details before saving.
* **Instant Notifications**: Utilizes **React Toastify** for immediate, sleek visual feedback upon submission.
* **Smooth Navigation**: Fast client-side routing powered by **React Router** (`useNavigate`).
* **Responsive & Clean UI**: Styled using custom JavaScript style objects and styled components with smooth visual hierarchy.

---

## 🛠️ Components Structure

```text
src/
└── components/
    └── Accounts/
        └── Expense/
            ├── AddExpense.jsx      # Main parent component for adding expenses
            ├── DateInput.jsx       # Input field for date selection
            ├── GroupSelect.jsx     # Dropdown for primary expense groups
            ├── TypeSelect.jsx      # Dynamic dropdown filtered by selected group
            ├── PaidFromSelect.jsx  # Bank/Payment method selection
            ├── AmountInput.jsx     # Numeric input field for amounts (৳)
            └── NoteInput.jsx       # Text area or input for transaction notes