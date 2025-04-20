import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Calendar, 
  ChevronDown, 
  Edit, 
  FileText, 
  Filter, 
  Home, 
  MoreHorizontal, 
  PieChart, 
  Plus, 
  Settings, 
  ShoppingBag, 
  Users,
  TrendingUp,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  AlertTriangle,
  ChevronLeft,
  Edit2,
  Clock,
  ChevronRight,
  Info,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { APP_LOGO, APP_LOGO_ALT } from "@/lib/constants";

interface NavButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

const NavButton = ({ icon, children, to, onClick }: NavButtonProps) => {
  const content = (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 text-white hover:bg-[#2A2F45]"
      onClick={onClick}
    >
      {icon}
      {children}
    </Button>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeFilter, setActiveFilter] = useState("> 90D");
  const [selectedCompany, setSelectedCompany] = useState("ACME, INC.");

  // Sample data - replace with actual data from your backend
  const salesData = {
    current: "24,931.53 €",
    lastMonth: "18,222 €",
    percentageIncrease: "23.91%",
  };

  const followUpData = {
    pending: "9,137.50 €",
    overdue: "9,137.50 €",
    paid: "0 €",
  };

  const agingBuckets = [
    { label: "> 90D", value: "0.00€", isActive: activeFilter === "> 90D" },
    { label: "90-61D", value: "0.00€", isActive: activeFilter === "90-61D" },
    { label: "60-31D", value: "0.00€", isActive: activeFilter === "60-31D" },
    { label: "30-1D", value: "9,137.50€", isActive: activeFilter === "30-1D" },
    { label: "0-30D", value: "0.00€", isActive: activeFilter === "0-30D" },
    { label: "31-60", value: "0.00€", isActive: activeFilter === "31-60" },
  ];

  const reminders = [
    {
      id: "F-20240124_23",
      type: "Sales SEO / SEA",
      status: "14 days overdue",
      dueDate: "Jan 31, 2024",
      amount: "2,123.50 €",
    },
    {
      id: "F-20240124_23",
      type: "Sales SEO / SEA",
      status: "14 days overdue",
      dueDate: "Jan 31, 2024",
      amount: "7,014.00 €",
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-full bg-[#1B1E2E] text-white p-4">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/dashboard" className="flex items-center">
            <img src={APP_LOGO} alt={APP_LOGO_ALT} className="h-8 w-8" />
          </Link>
      </div>

        <div className="mb-6">
          <div className="relative">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-[#2A2F45] text-white px-4 py-2 rounded appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>ACME, INC.</option>
              <option>Apple, Inc.</option>
              <option>Microsoft Corp.</option>
              <option>Tesla, Inc.</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none" />
              </div>
            </div>

        <div className="space-y-1">
          <NavButton icon={<Clock className="h-5 w-5" />} to="/dashboard">
            Today
          </NavButton>
          <NavButton icon={<FileText className="h-5 w-5" />} to="/transactions">
            Transactions
          </NavButton>
              </div>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Get Paid
          </h3>
          <div className="space-y-1">
            <NavButton icon={<FileText className="h-5 w-5" />} to="/invoices">
              Invoices
            </NavButton>
            <NavButton icon={<Clock className="h-5 w-5" />} to="/follow-ups">
              Follow-ups
            </NavButton>
              </div>
            </div>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Manage
          </h3>
          <div className="space-y-1">
            <NavButton icon={<Users className="h-5 w-5" />} to="/clients">
              Clients
            </NavButton>
            <NavButton icon={<Settings className="h-5 w-5" />} to="/settings">
              Settings
            </NavButton>
              </div>
            </div>

        <div className="absolute bottom-4 left-4 right-4">
          <NavButton
            icon={<LogOut className="h-5 w-5" />}
            onClick={handleSignOut}
          >
            Sign Out
          </NavButton>
                </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Edit2 className="h-4 w-4" />
                Edit Client
              </Button>
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200" />
            )}
          </div>
            </div>
            
        {/* Client Info */}
        <Card className="mb-6 p-6">
          <div className="flex items-start gap-6">
            <div className="h-16 w-16 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-2xl font-semibold">
              {selectedCompany[0]}
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{selectedCompany}</h1>
              <p className="text-gray-600">
                1 Infinite Loop, Cupertino, CA 95014, United States
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white" />
                  <div className="h-8 w-8 rounded-full bg-gray-400 border-2 border-white" />
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Info className="h-4 w-4" />
                  </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
        </Card>

        {/* Sales Stats */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Sales</h2>
              <div className="text-green-500 text-sm">
                +{salesData.percentageIncrease}
              </div>
            </div>
            <div className="text-3xl font-semibold mb-2">
              {salesData.current}
          </div>
            <div className="text-sm text-gray-600">
              Last month: {salesData.lastMonth}
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">
                Share of Global Revenue
              </h3>
              <div className="relative pt-4">
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div
                    className="absolute h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: "25%" }}
                  />
                </div>
                <div className="absolute top-0 left-[25%] transform -translate-x-1/2 text-sm text-blue-500">
                  25%
                </div>
              </div>
            </div>
        </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Follow-up</h2>
              <Button variant="secondary" className="text-purple-600">
                Follow-up Large Accounts
            </Button>
          </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  Pending Payment
                </div>
                <div className="font-semibold">{followUpData.pending}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Overdue</div>
                <div className="font-semibold">{followUpData.overdue}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Not Overdue</div>
                <div className="font-semibold">{followUpData.paid}</div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {agingBuckets.map((bucket, index) => (
                <Button
                  key={index}
                  variant={bucket.isActive ? "default" : "outline"}
                  className={cn(
                    "text-xs p-2 h-auto",
                    bucket.isActive
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => setActiveFilter(bucket.label)}
                >
                  <div>
                    <div className="mb-1">{bucket.label}</div>
                    <div className="font-medium">{bucket.value}</div>
                  </div>
                </Button>
              ))}
            </div>
        </Card>
        </div>

        {/* Reminders Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Follow-ups</h2>
            <div className="flex gap-2">
              <Button variant="outline">Type: All</Button>
              <Button variant="outline">Status: All</Button>
            </div>
          </div>
              <table className="w-full">
                <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="pb-4">Details</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Due Date</th>
                <th className="pb-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
              {reminders.map((reminder, index) => (
                <tr key={index} className="border-t">
                    <td className="py-4">
                    <div className="font-medium">{reminder.id}</div>
                    <div className="text-sm text-gray-600">{reminder.type}</div>
                    </td>
                    <td className="py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      {reminder.status}
                    </span>
                    </td>
                  <td className="py-4">{reminder.dueDate}</td>
                  <td className="py-4 text-right font-medium">
                    {reminder.amount}
                    </td>
                  </tr>
              ))}
                </tbody>
              </table>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
