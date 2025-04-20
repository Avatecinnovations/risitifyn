
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Package, TrendingUp } from "lucide-react";

const OrdersPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button>New Order</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Total Orders</div>
              <ShoppingCart className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold">87</div>
            <div className="text-sm text-gray-500 mt-1">This month</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Pending Orders</div>
              <Package className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-500 mt-1">Awaiting shipment</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Sales Growth</div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">+12.5%</div>
            <div className="text-sm text-gray-500 mt-1">Compared to last month</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold">Recent Orders</h2>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">ORD-2023-{1000 + i}</td>
                    <td className="px-6 py-4 text-sm">Customer {i + 1}</td>
                    <td className="px-6 py-4 text-sm">{new Date().toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium">${(Math.random() * 1000).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        i % 3 === 0 
                          ? 'bg-green-100 text-green-800' 
                          : i % 3 === 1
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Processing'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">View</Button>
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

export default OrdersPage;
