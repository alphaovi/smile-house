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
          name: "Work Summary",
          icon: <NotebookTabs className="size-4 shrink-0"/>,
          link: "/reports/work-summary"
        }
      ],
    },
    {
      name: "Settings",
      icon: <Settings className="size-5 shrink-0" />,
      link: "/settings",
    },
  ];

  // Dynamic Multi-level Recursive Menu Renderer
  const renderNavList = (items, isMobile = false) => {
    return items.map((item, index) => (
      <li key={index}>
        {item.children ? (
          <details
            className={
              !isMobile
                ? "pointer-events-none group-hover:pointer-events-auto"
                : ""
            }
          >
            <summary className="flex items-center justify-between gap-4 py-2.5 hover:bg-base-300 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                {item.icon}
                <span
                  className={`${!isMobile ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap" : ""} font-medium`}
                >
                  {item.name}
                </span>
              </div>
            </summary>
            <ul
              className={`ml-3 mt-1 border-l-2 border-base-300 pl-2 space-y-1 ${!isMobile ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200" : ""}`}
            >
              {renderNavList(item.children, isMobile)}
            </ul>
          </details>
        ) : (
          <NavLink
            to={item.link || "#"}
            onClick={() => isMobile && setIsMobileOpen(false)}
            className="flex items-center gap-3 py-2 text-sm text-base-content/80 hover:text-primary rounded-md whitespace-nowrap hover:bg-base-100"
          >
            {item.icon}
            <span
              className={
                !isMobile
                  ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  : ""
              }
            >
              {item.name}
            </span>
          </NavLink>
        )}
      </li>
    ));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-base-100">
      {/* ---------------- Desktop Sidebar ---------------- */}
      <aside
        ref={sidebarRef}
        onMouseLeave={handleMouseLeave}
        className="hidden md:flex group z-20 flex-col bg-base-200 w-16 hover:w-64 transition-all duration-300 ease-in-out shadow-lg overflow-x-hidden"
      >
        <ul className="menu w-full p-2 space-y-1 grow pt-10 primaryColor">
          {renderNavList(navItems, false)}
        </ul>
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
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-base-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <span className="font-bold text-lg">Smile House</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded-md hover:bg-base-300 transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        <ul className="menu w-full p-4 space-y-1 grow overflow-y-auto primaryColor">
          {renderNavList(navItems, true)}
        </ul>
      </aside>

      {/* ---------------- Main Content Area ---------------- */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="navbar h-16 w-full bg-base-300 border-b border-base-200 px-4 secondaryColor flex items-center gap-3">
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
