import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  FileText,
  Home,
  Settings,
  Users,
  Building2,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import APP_LOGO from "../../assets/logo.png";

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-[#0f172a] text-white h-screen w-64 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link to="/dashboard" className="flex items-center">
          <img src={APP_LOGO} alt="App Logo" className="h-8 w-8" />
        </Link>
      </div>

      {/* Company select */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between p-2 bg-[#1e293b] rounded-md">
          <div className="flex items-center">
            <div className="bg-gray-700 h-6 w-6 rounded-md mr-2"></div>
            <span className="text-sm font-medium">ACME, INC.</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Menu sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Activity filter */}
        <div className="p-4 text-xs text-gray-400 uppercase">
          Filtrer mon activité
        </div>

        {/* Main navigation */}
        <nav className="px-2 space-y-1">
          <Link
            to="/dashboard/today"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/today")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <Home className="h-5 w-5 mr-3 text-gray-400" />
            Aujourd'hui
          </Link>

          <Link
            to="/dashboard/transactions"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/transactions")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <Calendar className="h-5 w-5 mr-3 text-gray-400" />
            Transactions
          </Link>
        </nav>

        {/* Payment section */}
        <div className="p-4 text-xs text-gray-400 uppercase mt-4">
          Se faire payer
        </div>

        <nav className="px-2 space-y-1">
          <Link
            to="/dashboard/invoices"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/invoices")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <FileText className="h-5 w-5 mr-3 text-gray-400" />
            Factures
            <PlusCircle className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
        </nav>

        {/* Clients section */}
        <div className="p-4 text-xs text-gray-400 uppercase mt-4">Clients</div>

        <nav className="px-2 space-y-1">
          <Link
            to="/dashboard/clients"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/clients")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <Users className="h-5 w-5 mr-3 text-gray-400" />
            Clients
            <PlusCircle className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
        </nav>

        {/* Settings section */}
        <div className="p-4 text-xs text-gray-400 uppercase mt-4">
          Paramètres
        </div>

        <nav className="px-2 space-y-1">
          <Link
            to="/dashboard/settings"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/settings")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <Settings className="h-5 w-5 mr-3 text-gray-400" />
            Paramètres
          </Link>

          <Link
            to="/dashboard/company"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/company")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <Building2 className="h-5 w-5 mr-3 text-gray-400" />
            Entreprise
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
