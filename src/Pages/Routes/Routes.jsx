import { createBrowserRouter } from "react-router";
import Main from "../../Layout/Main";
import Dashboard from "../Dashboard/Dashboard";
// import OrderRequest from "../Order/OrderRequest/OrderRequest";
import NotFound from "../SharedPages/ErrorPage/NotFound";
import CreateOrder from "../Order/CreateOrder/CreateOrder";
import CreateNewOrder from "../Order/CreateOrder/CreateNewOrder";
import PaymentRequest from "../Accounts/PaymentRequest/PaymentRequest";

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
        path: "order/create-order",
        element: <CreateNewOrder></CreateNewOrder>,
      },
      {
        path: "/accounts/payment-request",
        element: <PaymentRequest></PaymentRequest>,
      },
      // {
      //     path: "order/create-order",
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
