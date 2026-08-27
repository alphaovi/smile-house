import { useRef, useState } from "react";
import {
  CircleDollarSign,
  LayoutDashboard,
  ShoppingBag,
  Users,
  List,
  Trash2,
  ReceiptText,
  FilePlus,
  CreditCard,
  Menu,
  X,
  Receipt,
} from "lucide-react";
import { Outlet, NavLink } from "react-router";

const SideNavbar = () => {
  const sidebarRef = useRef(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
          name: "Create Order",
          icon: <FilePlus className="size-4 shrink-0" />,
          link: "/order/create-order",
        },
        {
          name: "Requested Order",
          icon: <CircleDollarSign className="size-4 shrink-0" />,
          link: "/order/requested-order",
        },
        {
          name: "Order List",
          icon: <List className="size-4 shrink-0" />,
          link: "/order/order-list",
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
          name: "Payment Request",
          icon: <CircleDollarSign className="size-4 shrink-0" />,
          link: "/accounts/payment-request",
        },
        {
          name: "Create Payment",
          icon: <CreditCard className="size-4 shrink-0" />,
          link: "/accounts/create-payment",
        },
        {
          name: "View Payment",
          icon: <Receipt className="size-4 shrink-0" />,
          link: "/accounts/view-payment",
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
    <div className="flex h-screen overflow-hidden bg-base-100">
      {/* ---------------- Desktop Sidebar (Unchanged) ---------------- */}
      <aside
        ref={sidebarRef}
        onMouseLeave={handleMouseLeave}
        className="hidden md:flex group z-20 flex-col bg-base-200 w-16 hover:w-64 transition-all duration-300 ease-in-out shadow-lg overflow-x-hidden"
      >
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

                  <ul className="ml-4 mt-1 border-l-2 border-base-300 pl-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <NavLink
                          to={child.link || "#"}
                          className="flex items-center gap-3 py-2 text-sm text-base-content/80 hover:text-primary rounded-md whitespace-nowrap hover:bg-white"
                        >
                          {child.icon && child.icon}
                          <span>{child.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <NavLink
                  to={item.link}
                  className="flex items-center gap-4 py-3 hover:bg-base-300 rounded-lg"
                >
                  {item.icon}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
                    {item.name}
                  </span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* ---------------- Mobile Sidebar Overlay ---------------- */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* ---------------- Mobile Drawer Sidebar ---------------- */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-base-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <span className="font-bold text-lg">Smile House</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded-md hover:bg-base-300"
          >
            <X className="size-6" />
          </button>
        </div>

        <ul className="menu w-full p-4 space-y-1 grow overflow-y-auto primaryColor">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                <details>
                  <summary className="flex items-center justify-between gap-4 py-3 hover:bg-base-300 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </summary>

                  <ul className="ml-4 mt-1 border-l-2 border-base-300 pl-2 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <NavLink
                          to={child.link || "#"}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-3 py-2 text-sm text-base-content/80 hover:text-primary rounded-md"
                        >
                          {child.icon && child.icon}
                          <span>{child.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <NavLink
                  to={item.link}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-4 py-3 hover:bg-base-300 rounded-lg"
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* ---------------- Main Content Area ---------------- */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="navbar h-16 w-full bg-base-300 border-b border-base-200 px-4 secondaryColor flex items-center gap-3">
          {/* Mobile Menu Button (Only visible on mobile/tablet) */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="size-6" />
          </button>

          <div className="font-bold text-lg">Smile House</div>
        </nav>

        <div className="m-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
