import { createBrowserRouter } from "react-router";
import Main from "../../Layout/Main";
import Dashboard from "../Dashboard/Dashboard";
import OrderRequest from "../Order/OrderRequest/OrderRequest";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element: <Dashboard></Dashboard>
        },
        {
            path: "/dashboard",
            element: <Dashboard></Dashboard>
        },
        {
            path: "order/order-request",
            element: <OrderRequest></OrderRequest>
        }
    ]
  },
]);

export default router;
