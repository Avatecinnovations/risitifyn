import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/assets/images/logo";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/users" },
    { name: "Invoices", href: "/admin/invoices" },
    { name: "Reports", href: "/admin/reports" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="fixed top-16 left-0 bottom-0 z-40 hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-full flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <ScrollArea className="mt-5 flex-1 px-2">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate(item.href)}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
            </ScrollArea>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs font-medium text-gray-500">
                  Administrator
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="ml-2"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
