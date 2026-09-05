import { createBrowserRouter } from "react-router";
import Main from "../../Layout/Main";
import Dashboard from "../Dashboard/Dashboard";
// import OrderRequest from "../Order/OrderRequest/OrderRequest";
import NotFound from "../SharedPages/ErrorPage/NotFound";
import CreateOrder from "../Order/CreateOrder/CreateOrder";
import RequestedOrder from "../Order/RequestedOrder/RequestedOrder";
import ViewOrderList from "../Order/ViewOrderList/ViewOrderList/ViewOrderList";

import CreateNewOrder from "../Order/CreateOrder/CreateNewOrder";
import PaymentRequest from "../Accounts/PaymentRequest/PaymentRequest";
import CreatePayment from "../Accounts/CreatePayment/CreatePayment";
import ViewPayment from "../Accounts/ViewPayment/ViewPayment/ViewPayment";
import AddExpense from "../Accounts/Expense/AddExpense/AddExpense";
import ExpenseList from "../Accounts/Expense/ExpenseList/ExpenseList";
import CreateAsset from "../Accounts/Asset/CreateAsset/CreateAsset";
import AssetSell from "../Accounts/Asset/AssetSell/AssetSell";
import AssetList from "../Accounts/Asset/AssetList/AssetList";
import AddLiability from "../Accounts/Liabilities/AddLiability/AddLiability";
import CreatePaidLiability from "../Accounts/Liabilities/PaidLiabilities/CreatePaidLiability";
import LiabilityList from "../Accounts/Liabilities/LiabilityList/LiabilityList";
import StructureOfShareHolders from "../Accounts/Equity/StructureOfShareHolders/StructureOfShareHolders";
import Settings from "../Settings/Settings/Settings";
import Customers from "../Settings/Customers/Customers";
import Employees from "../Settings/Employee/Employees";
import WorkAndPrice from "../Settings/WorkAndPrice/Products";
import WorkSummary from "../Reports/WorkSummary/WorkSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/case/create-case",
        element: <CreateNewOrder></CreateNewOrder>,
      },
      {
        path: "case/requested-cases",
        element: <RequestedOrder></RequestedOrder>,
      },
      {
        path: "case/case-list",
        element: <ViewOrderList></ViewOrderList>,
      },
      {
        path: "/finance/create-payment",
        element: <CreatePayment></CreatePayment>,
      },
      {
        path: "/finance/payment-request",
        element: <PaymentRequest></PaymentRequest>,
      },
      {
        path: "/finance/view-payment",
        element: <ViewPayment></ViewPayment>,
      },
      {
        path: "/finance/expense/add-expenses",
        element: <AddExpense></AddExpense>,
      },
      {
        path: "/finance/expense/expense-list",
        element: <ExpenseList></ExpenseList>,
      },
      {
        path: "/finance/asset/asset-buy",
        element: <CreateAsset></CreateAsset>,
      },
      {
        path: "/finance/asset/asset-sell",
        element: <AssetSell></AssetSell>,
      },
      {
        path: "/finance/asset/asset-list",
        element: <AssetList></AssetList>,
      },
      {
        path: "/finance/liability/add-liability",
        element: <AddLiability></AddLiability>,
      },
      {
        path: "/finance/liability/paid-liabilities",
        element: <CreatePaidLiability></CreatePaidLiability>,
      },
      {
        path: "/finance/liability/liability-list",
        element: <LiabilityList></LiabilityList>,
      },
      {
        path: "/finance/equity/shareholder-structure",
        element: <StructureOfShareHolders></StructureOfShareHolders>,
      },
      {
        path: "/settings",
        element: <Settings></Settings>,
      },
      {
        path: "/settings/customers",
        element: <Customers></Customers>,
      },
      {
        path: "/settings/work-price",
        element: <Customers></Customers>,
      },
      {
        path: "/settings/employees",
        element: <Employees></Employees>,
      },
      {
        path: "/settings/work-and-price",
        element: <WorkAndPrice></WorkAndPrice>,
      },
      {
        path: "/reports/work-summary",
        element: <WorkSummary></WorkSummary>,
      },
      // {
      //     path: "order/create-case",
      //     element: <CreateOrder></CreateOrder>
      // },
      // {
      //     path: "order/order-request",
      //     element: <OrderRequest></OrderRequest>
      // }
    ],
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
