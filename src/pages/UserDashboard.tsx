
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, FileText, MoreHorizontal, Search, Filter, CalendarIcon, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const { user } = useAuth();
  
  const stats = [
    { 
      title: "Total Invoices", 
      value: "$19,679", 
      change: "+17%", 
      isPositive: true 
    },
    { 
      title: "Paid", 
      value: "$28,745", 
      change: "+32%", 
      isPositive: true 
    },
    { 
      title: "Unpaid", 
      value: "$17,678", 
      change: "-17%", 
      isPositive: false 
    },
    { 
      title: "Overdue", 
      value: "$87,857", 
      change: "+17%", 
      isPositive: true 
    }
  ];

  const invoices = [
    { id: "INV-0001", client: "Ethan Mitchell", email: "ethanmitchell@gmail.com", date: "20 Nov, 2023", amount: "$632", status: "paid" },
    { id: "INV-0002", client: "Adrian Carter", email: "adriancarter@gmail.com", date: "21 Nov, 2023", amount: "$632", status: "pending" },
    { id: "INV-0003", client: "Marcus Turner", email: "marcusturner@gmail.com", date: "22 Nov, 2023", amount: "$632", status: "unpaid" },
    { id: "INV-0004", client: "Nolan Foster", email: "nolanfoster@gmail.com", date: "23 Nov, 2023", amount: "$632", status: "paid" },
    { id: "INV-0005", client: "Leo Parker", email: "leoparker@gmail.com", date: "24 Nov, 2023", amount: "$632", status: "pending" },
    { id: "INV-0006", client: "Garrett Evans", email: "garrettevans@gmail.com", date: "25 Nov, 2023", amount: "$632", status: "unpaid" },
    { id: "INV-0007", client: "Henry Nelson", email: "henrynelson@gmail.com", date: "26 Nov, 2023", amount: "$632", status: "paid" },
  ];

  const tabCounts = {
    all: 3,
    drafts: 3,
    unpaid: 4,
    paid: 7,
    pending: 8
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.user_metadata?.name || "User"}</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <span>19 Nov 2023</span>
            <CalendarIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <div className={`text-sm font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'} mb-1`}>
                  {stat.isPositive ? (
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" /> {stat.change}/month
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" /> {stat.change}/month
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 mt-1">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button className="flex items-center bg-[#0D3B29]" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Invoice
            </Button>
          </div>
        </div>

        <Card className="border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button 
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2",
                  selectedTab === "all" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setSelectedTab("all")}
              >
                All Invoices ({tabCounts.all})
              </button>
              <button 
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2", 
                  selectedTab === "drafts" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setSelectedTab("drafts")}
              >
                Drafts ({tabCounts.drafts})
              </button>
              <button 
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2", 
                  selectedTab === "unpaid" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setSelectedTab("unpaid")}
              >
                Unpaid ({tabCounts.unpaid})
              </button>
              <button 
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2", 
                  selectedTab === "paid" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setSelectedTab("paid")}
              >
                Paid ({tabCounts.paid})
              </button>
              <button 
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2", 
                  selectedTab === "pending" 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setSelectedTab("pending")}
              >
                Pending ({tabCounts.pending})
              </button>
            </div>
          </div>

          <div className="py-4 flex justify-between items-center px-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 border-gray-300"
              />
            </div>

            <Button variant="outline" className="flex items-center gap-2" size="sm">
              Filter
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  </TableHead>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    </TableCell>
                    <TableCell className="font-medium text-blue-600">
                      <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.email}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell className="font-medium">{invoice.amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
