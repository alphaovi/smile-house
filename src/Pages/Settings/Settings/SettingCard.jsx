import CustomerCard from "../Customers/CustomerCard";
import WorkAndPriceCard from "../WorkAndPrice/WorkAndPriceCard";
import EmployeeCard from "../Employee/EmployeeCard";

const SettingCard = () => {
  return (
    <div className="w-full p-4 lg:mt-5">
      <h1 className="text-center text-xl font-semibold pb-5">Settings</h1>
      {/* Auto Responsive Grid Container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CustomerCard />
        <WorkAndPriceCard />
        <EmployeeCard />
       
      </div>
    </div>
  );
};

export default SettingCard;