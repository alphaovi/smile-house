import {
  FilePlus,
  LayoutDashboardIcon,
  ShoppingBag,
  Users,
} from "lucide-react";

const SideNavbar2 = () => {
  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: (
        <LayoutDashboardIcon className="size-5 shrink-0"></LayoutDashboardIcon>
      ),
    },
    {
      name: "order",
      icon: <ShoppingBag className="size-5 shrink-0" />,
      children: [
        {
          name: "create-order",
          icon: <FilePlus className="size-5 shrink-0" />,
          link: "/order/create-case",
        },
        {
          name: "Reqeusted Order",
          icon: <Users></Users>,
        },
        {
          name: "Order List",
        },
        {
          name: "Delected Order",
        },
      ],
    },
  ];
  return <div></div>;
};

export default SideNavbar2;
