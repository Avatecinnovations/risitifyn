
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Clock, Calendar, Percent } from "lucide-react";

const DiscountsPage = () => {
  const discounts = [
    {
      code: "SUMMER2023",
      description: "Summer season discount",
      discount: "20% off",
      startDate: "Jun 1, 2023",
      endDate: "Aug 31, 2023",
      status: "expired"
    },
    {
      code: "FALL2023",
      description: "Fall season discount",
      discount: "15% off",
      startDate: "Sep 1, 2023",
      endDate: "Nov 30, 2023",
      status: "active"
    },
    {
      code: "WELCOME10",
      description: "New customer discount",
      discount: "10% off",
      startDate: "Jan 1, 2023",
      endDate: "Dec 31, 2023",
      status: "active"
    },
    {
      code: "FREESHIP",
      description: "Free shipping on orders over $50",
      discount: "Free shipping",
      startDate: "Oct 15, 2023",
      endDate: "Nov 30, 2023",
      status: "active"
    },
    {
      code: "WINTER2023",
      description: "Upcoming winter discount",
      discount: "25% off",
      startDate: "Dec 1, 2023",
      endDate: "Feb 28, 2024",
      status: "scheduled"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Discounts</h1>
        <Button>Create Discount</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Active Discounts</div>
              <Tag className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-500 mt-1">Currently running</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Scheduled</div>
              <Calendar className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-gray-500 mt-1">Upcoming</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Expired</div>
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-gray-500 mt-1">Past discounts</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Avg. Discount</div>
              <Percent className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">17.5%</div>
            <div className="text-sm text-gray-500 mt-1">Across all codes</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold">Discount Codes</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search discounts..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Code</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Discount</th>
                  <th className="px-6 py-3 text-left">Start Date</th>
                  <th className="px-6 py-3 text-left">End Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {discounts.map((discount, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{discount.code}</td>
                    <td className="px-6 py-4 text-sm">{discount.description}</td>
                    <td className="px-6 py-4 text-sm">{discount.discount}</td>
                    <td className="px-6 py-4 text-sm">{discount.startDate}</td>
                    <td className="px-6 py-4 text-sm">{discount.endDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        discount.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : discount.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {discount.status.charAt(0).toUpperCase() + discount.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountsPage;
