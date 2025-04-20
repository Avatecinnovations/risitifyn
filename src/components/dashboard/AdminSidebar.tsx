import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  FileText,
  Home,
  Settings,
  CreditCard,
  Users,
  Building2,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import APP_LOGO from "@/assets/logo.png";
import APP_LOGO_ALT from "@/assets/logo.png";

const AdminSidebar = () => {
  const location = useLocation();
  const [clientsExpanded, setClientsExpanded] = useState(true);
  const [parametersExpanded, setParametersExpanded] = useState(false);
  const [companyExpanded, setCompanyExpanded] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-[#0f172a] text-white h-screen w-64 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link to="/dashboard" className="flex items-center">
          <img src={APP_LOGO} alt={APP_LOGO_ALT} className="h-8 w-8" />
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

          <Link
            to="/dashboard/reminders"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/reminders")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <Calendar className="h-5 w-5 mr-3 text-gray-400" />
            Relances
          </Link>

          <div>
            <button
              onClick={() => setClientsExpanded(!clientsExpanded)}
              className="w-full flex items-center justify-between px-2 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-[#1e293b] hover:text-white"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-gray-400" />
                Clients
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transform ${
                  clientsExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {clientsExpanded && (
              <div className="ml-10 space-y-1 mt-1">
                <Link
                  to="/dashboard/clients"
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Liste des clients
                </Link>
                <Link
                  to="/dashboard/aged-balance"
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Balance âgée
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Structure section */}
        <div className="p-4 text-xs text-gray-400 uppercase mt-4">
          Gérer ma structure
        </div>

        <nav className="px-2 space-y-1">
          <Link
            to="/dashboard/team"
            className={cn(
              "flex items-center px-2 py-2 rounded-md text-sm font-medium",
              isActive("/dashboard/team")
                ? "bg-[#1e293b] text-white"
                : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <Users className="h-5 w-5 mr-3 text-gray-400" />
            Equipe
          </Link>

          <div>
            <button
              onClick={() => setParametersExpanded(!parametersExpanded)}
              className="w-full flex items-center justify-between px-2 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-[#1e293b] hover:text-white"
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-gray-400" />
                Paramètres
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transform ${
                  parametersExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {parametersExpanded && (
              <div className="ml-10 space-y-1 mt-1">
                <Link
                  to="/dashboard/settings/billing"
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Facturation & relances
                </Link>
                <Link
                  to="/dashboard/settings/bank-accounts"
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Comptes bancaires
                </Link>
                <Link
                  to="/dashboard/settings/exports"
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Mes Exports
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setCompanyExpanded(!companyExpanded)}
              className="w-full flex items-center justify-between px-2 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-[#1e293b] hover:text-white"
            >
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-3 text-gray-400" />
                Mon entreprise
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transform ${
                  companyExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {companyExpanded && (
              <div className="ml-10 space-y-1 mt-1">
                <Link
                  to="/dashboard/company/info"
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Editer les informations
                </Link>
                <Link
                  to="/dashboard/company/subscription"
                  className="block px-2 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Mon abonnement Delivoice
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
