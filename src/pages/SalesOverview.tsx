
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, FileText, MoreHorizontal, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const SalesOverview = () => {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <span>19 Nov 2023</span>
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <p className={`text-sm font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'} mr-2`}>
                      {stat.isPositive ? (
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" /> {stat.change}/month
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <TrendingDown className="h-4 w-4 mr-1" /> {stat.change}/month
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">{stat.title}</div>
                </div>
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
            <Button className="flex items-center bg-[#1e2547]" size="sm">
              <span className="mr-2">+</span>
              New Invoice
            </Button>
          </div>
        </div>

        <Card className="border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button className="px-6 py-3 text-sm font-medium border-b-2 border-brand-primary text-brand-primary">
                All Invoices (3)
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Drafts (3)
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Unpaid (4)
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Paid (7)
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Pending (8)
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

            <Button variant="outline" className="flex items-center" size="sm">
              Filter
              <Filter className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary" />
                    </th>
                    <th className="px-6 py-3 text-left">Invoice ID</th>
                    <th className="px-6 py-3 text-left">Client</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.map((invoice, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary" />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-brand-primary">
                        <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
                      </td>
                      <td className="px-6 py-4 text-sm">{invoice.client}</td>
                      <td className="px-6 py-4 text-sm">{invoice.email}</td>
                      <td className="px-6 py-4 text-sm">{invoice.date}</td>
                      <td className="px-6 py-4 text-sm font-medium">{invoice.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          invoice.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : invoice.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesOverview;
