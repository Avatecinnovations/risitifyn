import { useState, useEffect } from "react";
import {
  Settings,
  Building2,
  DollarSign,
  Bell,
  Palette,
  CreditCard,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes("/settings/organizations")) return "organization";
    if (path.includes("/settings/tax")) return "tax";
    if (path.includes("/settings/templates")) return "templates";
    if (path.includes("/settings/payment")) return "payment";
    return "organization";
  });

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/settings/organizations")) setActiveTab("organization");
    else if (path.includes("/settings/tax")) setActiveTab("tax");
    else if (path.includes("/settings/templates")) setActiveTab("templates");
    else if (path.includes("/settings/payment")) setActiveTab("payment");
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case "organization":
        navigate("/settings/organizations");
        break;
      case "tax":
        navigate("/settings/tax");
        break;
      case "templates":
        navigate("/settings/templates");
        break;
      case "payment":
        navigate("/settings/payment");
        break;
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-4 md:py-8 px-4">
      <div className="flex items-center mb-4 md:mb-6">
        <Settings className="h-5 w-5 md:h-6 md:w-6 mr-2 text-gray-700" />
        <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
      </div>

      <Tabs
        defaultValue="organization"
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4 md:space-y-8"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full mb-4 md:mb-8 overflow-x-auto">
          <TabsTrigger
            value="organization"
            className="flex items-center gap-2 px-2 md:px-4"
          >
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Organization</span>
          </TabsTrigger>
          <TabsTrigger
            value="tax"
            className="flex items-center gap-2 px-2 md:px-4"
          >
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Tax</span>
          </TabsTrigger>

          <TabsTrigger
            value="templates"
            className="flex items-center gap-2 px-2 md:px-4"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="flex items-center gap-2 px-2 md:px-4"
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
        </TabsList>

        <Outlet />
      </Tabs>
    </div>
  );
};

export default SettingsPage;
