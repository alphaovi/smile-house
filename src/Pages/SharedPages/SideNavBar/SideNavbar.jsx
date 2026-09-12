import { useRef, useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Trash2,
  FilePlus,
  Menu,
  X,
  TrendingDown,
  Briefcase,
  Scale,
  PieChart,
  Settings,
  FileBarChart,
  Clock,
  ClipboardList,
  Wallet,
  ArrowDownLeft,
  Eye,
  PlusCircle,
  Building,
  NotebookTabs,
  DollarSign,
  MinusCircle,
  CheckCircle2,
  UserCheck,
  FileSpreadsheet,
  IdCardLanyard,
  BadgeDollarSign,
  Trash,
} from "lucide-react";
import { Outlet, NavLink } from "react-router";

const SideNavbar = () => {
  const sidebarRef = useRef(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMouseLeave = () => {
    if (sidebarRef.current) {
      const openDetails = sidebarRef.current.querySelectorAll("details[open]");
      openDetails.forEach((detail) => detail.removeAttribute("open"));
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="size-5 shrink-0" />,
    },
    {
      name: "Case Management",
      icon: <ShoppingBag className="size-5 shrink-0" />,
      children: [
        {
          name: "Create Case",
          icon: <FilePlus className="size-4 shrink-0" />,
          link: "/case/create-case",
        },
        {
          name: "Requested Cases",
          icon: <Clock className="size-4 shrink-0" />,
          link: "case/requested-cases",
        },
        {
          name: "Case List",
          icon: <ClipboardList className="size-4 shrink-0" />,
          link: "/case/case-list",
        },
        {
          name: "Deleted Cases",
          icon: <Trash2 className="size-4 shrink-0" />,
          link: "/case/deleted",
        },
      ],
    },
    {
      name: "Finance",
      icon: <Users className="size-5 shrink-0" />,
      children: [
        {
          name: "Income",
          icon: <Wallet className="size-4 shrink-0" />,
          children: [
            {
              name: "Payment Request",
              icon: <ArrowDownLeft className="size-4 shrink-0" />,
              link: "/finance/payment-request",
            },
            {
              name: "Create Payment",
              icon: <PlusCircle className="size-4 shrink-0" />,
              link: "/finance/create-payment",
            },
            {
              name: "View Payment",
              icon: <Eye className="size-4 shrink-0" />,
              link: "/finance/view-payment",
            },
            {
              name: "Other Income",
              icon: <DollarSign className="size-4 shrink-0" />,
              link: "/finance/other-income",
            },
          ],
        },
        {
          name: "Expense",
          icon: <TrendingDown className="size-4 shrink-0" />,
          children: [
            {
              name: "Add Expense",
              icon: <MinusCircle className="size-4 shrink-0" />,
              link: "/finance/expense/add-expenses",
            },
            {
              name: "Expense List",
              icon: <ClipboardList className="size-4 shrink-0" />,
              link: "/finance/expense/expense-list",
            },
          ],
        },
        {
          name: "Asset",
          icon: <Briefcase className="size-4 shrink-0" />,
          children: [
            {
              name: "Asset Buy",
              icon: <PlusCircle className="size-4 shrink-0" />,
              link: "/finance/asset/asset-buy",
            },
            {
              name: "Asset Sell",
              icon: <MinusCircle className="size-4 shrink-0" />,
              link: "/finance/asset/asset-sell",
            },
            {
              name: "Asset List",
              icon: <Building className="size-4 shrink-0" />,
              link: "/finance/asset/asset-list",
            },
          ],
        },
        {
          name: "Liability",
          icon: <Scale className="size-4 shrink-0" />,
          children: [
            {
              name: "Add Liability",
              icon: <PlusCircle className="size-4 shrink-0" />,
              link: "/finance/liability/add-liability",
            },
            {
              name: "Paid Liabilities",
              icon: <CheckCircle2 className="size-4 shrink-0" />,
              link: "/finance/liability/paid-liabilities",
            },
            {
              name: "Liability List",
              icon: <ClipboardList className="size-4 shrink-0" />,
              link: "/finance/liability/liability-list",
            },
          ],
        },
        {
          name: "Equity",
          icon: <PieChart className="size-4 shrink-0" />,
          children: [
            {
              name: "Structure Of Shareholders",
              icon: <UserCheck className="size-4 shrink-0" />,
              link: "/finance/equity/shareholder-structure",
            },
            {
              name: "Equity Summary",
              icon: <FileSpreadsheet className="size-4 shrink-0" />,
              link: "/finance/equity/summary",
            },
          ],
        },
      ],
    },
    {
      name: "Reports",
      icon: <FileBarChart className="size-5 shrink-0" />,
      children: [
        {
          name: "Client Reports",
          icon: <NotebookTabs className="size-4 shrink-0" />,
          link: "/reports/client-reports",
        },
        {
          name: "Employee Reports",
          icon: <IdCardLanyard className="size-4 shrink-0" />,
          link: "/reports/employee-reports",
        },
        {
          name: "Financial Reports",
          icon: <BadgeDollarSign className="size-4 shrink-0" />,
          link: "/reports/financial-reports",
        },
      ],
    },
    {
      name: "Settings",
      icon: <Settings className="size-5 shrink-0" />,
      link: "/settings",
    },
  ];

  const binItem = {
    name: "Bin",
    icon: <Trash className="size-5 shrink-0" />,
    link: "/bin",
  };

  // Dynamic Multi-level Recursive Menu Renderer
  const renderNavList = (items, isMobile = false) => {
    return items.map((item, index) => (
      <li key={index} className="w-full">
        {item.children ? (
          <details
            className={
              !isMobile
                ? "pointer-events-none group-hover:pointer-events-auto"
                : ""
            }
          >
            <summary className="flex items-center justify-between min-h-10 px-3 py-2 hover:bg-base-300 rounded-lg cursor-pointer transition-colors duration-150 list-none [&::-webkit-details-marker]:hidden">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="shrink-0">{item.icon}</span>
                <span
                  className={`${
                    !isMobile
                      ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                      : "whitespace-nowrap"
                  } font-medium text-sm`}
                >
                  {item.name}
                </span>
              </div>
            </summary>
            <ul
              className={`ml-3 mt-1 border-l-2 border-base-300 pl-2 space-y-1 ${
                !isMobile
                  ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  : ""
              }`}
            >
              {renderNavList(item.children, isMobile)}
            </ul>
          </details>
        ) : (
          <NavLink
            to={item.link || "#"}
            onClick={() => isMobile && setIsMobileOpen(false)}
            className="flex items-center gap-3 min-h-10 px-3 py-2 text-sm text-base-content/80 hover:text-primary rounded-lg whitespace-nowrap hover:bg-base-100 transition-colors duration-150"
          >
            <span className="shrink-0">{item.icon}</span>
            <span
              className={
                !isMobile
                  ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                  : "whitespace-nowrap"
              }
            >
              {item.name}
            </span>
          </NavLink>
        )}
      </li>
    ));
  };

  const renderBinItem = (item, isMobile = false) => (
    <li className="w-full">
      <NavLink
        to={item.link || "#"}
        onClick={() => isMobile && setIsMobileOpen(false)}
        className="flex items-center gap-3 min-h-10 px-3 py-2 text-sm text-base-content/80 hover:text-primary rounded-lg whitespace-nowrap hover:bg-base-100 transition-colors duration-150"
      >
        <span className="shrink-0">{item.icon}</span>
        <span
          className={
            !isMobile
              ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              : "whitespace-nowrap"
          }
        >
          {item.name}
        </span>
      </NavLink>
    </li>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-base-100">
      {/* ---------------- Desktop Sidebar ---------------- */}
      <aside
        ref={sidebarRef}
        onMouseLeave={handleMouseLeave}
        className="hidden md:flex group z-20 flex-col bg-base-200 w-16 hover:w-64 transition-all duration-300 ease-in-out shadow-lg overflow-hidden justify-between h-full shrink-0"
      >
        <ul className="menu w-full p-2 space-y-1 grow pt-6 primaryColor overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {renderNavList(navItems, false)}
        </ul>

        {/* Bottom Fixed Bin Item */}
        <div className="w-full shrink-0 bg-base-200 border-t border-base-300">
          <ul className="menu w-full p-2 primaryColor">
            {renderBinItem(binItem, false)}
          </ul>
        </div>
      </aside>

      {/* ---------------- Mobile Overlay ---------------- */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* ---------------- Mobile Sidebar Drawer ---------------- */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-base-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col grow overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-base-300 shrink-0">
            <span className="font-bold text-lg">Smile House</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-md hover:bg-base-300 transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>

          <ul className="menu w-full p-4 space-y-1 grow overflow-y-auto primaryColor [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {renderNavList(navItems, true)}
          </ul>
        </div>

        {/* Bottom Fixed Bin Item (Mobile) */}
        <div className="w-full shrink-0 bg-base-200 border-t border-base-300">
          <ul className="menu w-full p-4 primaryColor">
            {renderBinItem(binItem, true)}
          </ul>
        </div>
      </aside>

      {/* ---------------- Main Content Area ---------------- */}
      <div className="flex flex-1 flex-col overflow-y-auto min-w-0">
        <nav className="navbar h-16 w-full bg-base-300 border-b border-base-200 px-4 secondaryColor flex items-center gap-3 shrink-0">
          {/* Mobile Menu Toggle Button */}
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