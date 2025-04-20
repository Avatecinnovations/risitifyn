import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  Home,
  Users,
  FileText,
  CreditCard,
  Settings,
  PlusCircle,
  ChevronDown,
  Bell,
  HelpCircle,
  ScrollText,
  LogOut,
  User,
  Quote,
  BarChart2,
  Building2,
  Plus,
  Briefcase,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { invoiceService } from "@/services/invoiceService";

const ZohoLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [organizationName, setOrganizationName] = useState("Organization Name");

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const organizations = await invoiceService.getOrganizations();
        if (organizations && organizations.length > 0) {
          setOrganizationName(organizations[0].name);
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrganization();
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "Quotes", href: "/quotes", icon: Quote },
    { name: "Invoices", href: "/invoices", icon: FileText },
    { name: "Reports", href: "/reports", icon: BarChart2 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="font-semibold">{organizationName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => navigate("/settings/organizations")}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Manage Organizations
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/settings/organizations/new")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Organization
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/settings/organizations")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Organization Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/quotes/new")}>
                  <Quote className="h-4 w-4 mr-2" />
                  New Quote
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/invoices/new")}>
                  <FileText className="h-4 w-4 mr-2" />
                  New Invoice
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/clients/new")}>
                  <Users className="h-4 w-4 mr-2" />
                  New Client
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    {user?.email?.[0].toUpperCase() || "U"}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/settings/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Fixed Sidebar */}
      <div className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r z-40">
        <div className="h-full py-4">
          <nav className="space-y-1 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pl-64 min-h-screen">
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ZohoLayout;
