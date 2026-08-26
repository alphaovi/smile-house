import { createBrowserRouter } from "react-router";
import Main from "../../Layout/Main";
import Dashboard from "../Dashboard/Dashboard";
// import OrderRequest from "../Order/OrderRequest/OrderRequest";
import NotFound from "../SharedPages/ErrorPage/NotFound";
import CreateOrder from "../Order/CreateOrder/CreateOrder";
import RequestedOrder from "../Order/RequestedOrder/RequestedOrder";
import OrderList from "../Order/OrderList/OrderList/OrderList";
import CreateNewOrder from "../Order/CreateOrder/CreateNewOrder";
import PaymentRequest from "../Accounts/PaymentRequest/PaymentRequest";
import CreatePayment from "../Accounts/CreatePayment/CreatePayment";
import ViewPayment from "../Accounts/ViewPayment/ViewPayment/ViewPayment";

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
        path: "order/requested-order",
        element: <RequestedOrder></RequestedOrder>,
      },
      {
        path: "order/order-list",
        element: <OrderList></OrderList>,
      },
      {
        path: "/accounts/create-payment",
        element: <CreatePayment></CreatePayment>,
      },
      {
        path: "/accounts/payment-request",
        element: <PaymentRequest></PaymentRequest>,
      },
      {
        path: "/accounts/view-payment",
        element: <ViewPayment></ViewPayment>,
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
