
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ShoppingBag, Users, Globe, Settings, ExternalLink } from "lucide-react";

const MyStorePage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Store</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Store
          </Button>
          <Button>Store Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Total Orders</div>
              <ShoppingBag className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Revenue</div>
              <Store className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">$12,450.00</div>
            <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Visitors</div>
              <Users className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">3,542</div>
            <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Conversion Rate</div>
              <Globe className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">4.2%</div>
            <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold">Recent Orders</h2>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Order</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { order: "#ORD-2023-156", customer: "John Doe", date: "Nov 15, 2023", amount: "$320.00", status: "completed" },
                    { order: "#ORD-2023-155", customer: "Jane Smith", date: "Nov 14, 2023", amount: "$145.50", status: "processing" },
                    { order: "#ORD-2023-154", customer: "Robert Johnson", date: "Nov 13, 2023", amount: "$78.99", status: "completed" },
                    { order: "#ORD-2023-153", customer: "Emily Wilson", date: "Nov 12, 2023", amount: "$254.75", status: "shipped" },
                    { order: "#ORD-2023-152", customer: "Michael Brown", date: "Nov 11, 2023", amount: "$189.99", status: "completed" },
                  ].map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-brand-primary">{order.order}</td>
                      <td className="px-6 py-4 text-sm">{order.customer}</td>
                      <td className="px-6 py-4 text-sm">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-medium">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'processing'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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

        <Card>
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold">Store Health</h2>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Store Uptime</span>
                  <span className="text-sm font-medium text-green-600">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Page Load Speed</span>
                  <span className="text-sm font-medium text-amber-600">1.2s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mobile Optimization</span>
                  <span className="text-sm font-medium text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-auto py-2">
                    <Settings className="h-4 w-4 mr-1" />
                    <span>Settings</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>Domain</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    <span>Products</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Customers</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyStorePage;
