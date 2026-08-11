import { useRef } from "react";
import {
  CircleDollarSign,
  LayoutDashboard,
  ShoppingBag,
  Users,
  List,
  Trash2,
  ReceiptText,
} from "lucide-react";
import { Outlet } from "react-router";


const SideNavbar = () => {
  
  const sidebarRef = useRef(null);

  const handleMouseLeave = () => {
    if (sidebarRef.current) {
      const openDetails = sidebarRef.current.querySelectorAll("details[open]");
      openDetails.forEach((detail) => {
        detail.removeAttribute("open");
      });
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="size-5 shrink-0" />,
    },
    {
      name: "Order",
      icon: <ShoppingBag className="size-5 shrink-0" />,
      children: [
        {
          name: "Order Request",
          icon: <CircleDollarSign className="size-4 shrink-0" />,
          link: "/order/order-request",
        },
        {
          name: "Order List",
          icon: <List className="size-4 shrink-0" />,
          link: "/order/list",
        },
        {
          name: "Deleted Orders",
          icon: <Trash2 className="size-4 shrink-0" />,
          link: "/order/deleted",
        },
      ],
    },
    {
      name: "Accounts",
      icon: <Users className="size-5 shrink-0" />,
      children: [
        {
          name: "Customer Payment",
          icon: <CircleDollarSign className="size-4 shrink-0" />,
          link: "/accounts/payment",
        },
        {
          name: "Voucher",
          icon: <ReceiptText className="size-4 shrink-0" />,
          link: "/accounts/voucher",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-base-100 ">
      {/* Sidebar Section */}
      <aside
        ref={sidebarRef}
        onMouseLeave={handleMouseLeave}
        className="group z-20 flex flex-col bg-base-200 w-16 hover:w-64 transition-all duration-300 ease-in-out shadow-lg overflow-x-hidden"
      >
        {/* Sidebar Menu Items */}
        <ul className="menu w-full p-2 space-y-1 grow pt-10 primaryColor">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <details className="pointer-events-none group-hover:pointer-events-auto">
                  <summary className="flex items-center justify-between gap-4 py-3 hover:bg-base-300 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
                        {item.name}
                      </span>
                    </div>
                  </summary>

                  {/* Child Items will show in this Map function */}
                  <ul className="ml-4 mt-1 border-l-2 border-base-300 pl-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex} >
                        <a
                          href={child.link || "#"}
                          className="flex items-center gap-3 py-2 text-sm text-base-content/80 hover:text-primary rounded-md whitespace-nowrap hover:bg-white"
                        >
                          {child.icon && child.icon}
                          <span>{child.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a
                  href={item.link}
                  className="flex items-center gap-4 py-3 hover:bg-base-300 rounded-lg"
                >
                  {item.icon}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
                    {item.name}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="navbar h-16 w-full bg-base-300 border-b border-base-200 px-4 secondaryColor">
          <div className="font-bold text-lg ">Smile House</div>
        </nav>

        <div className="m-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;