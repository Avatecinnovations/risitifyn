
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, CreditCard, Calendar } from "lucide-react";

const AccountingPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accounting</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Download Reports</Button>
          <Button>New Transaction</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Revenue</div>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">$24,780.00</div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium text-green-600 mr-1">+12.5%</span>
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-gray-500 ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Expenses</div>
              <CreditCard className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold">$8,450.00</div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium text-red-600 mr-1">+3.2%</span>
              <TrendingUp className="h-3 w-3 text-red-600" />
              <span className="text-xs text-gray-500 ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Profit</div>
              <TrendingUp className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold">$16,330.00</div>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium text-green-600 mr-1">+18.7%</span>
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-gray-500 ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Upcoming</div>
              <Calendar className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">$5,420.00</div>
            <div className="text-sm text-gray-500 mt-1">Due this month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold">Recent Transactions</h2>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { date: "Nov 15, 2023", desc: "Client Payment - Tech Solutions", category: "Income", amount: "$3,200.00", isIncome: true },
                    { date: "Nov 12, 2023", desc: "Office Supplies", category: "Expense", amount: "$450.00", isIncome: false },
                    { date: "Nov 10, 2023", desc: "Client Payment - Acme Corp", category: "Income", amount: "$2,800.00", isIncome: true },
                    { date: "Nov 05, 2023", desc: "Software Subscription", category: "Expense", amount: "$99.00", isIncome: false },
                    { date: "Nov 01, 2023", desc: "Client Payment - Global Enterprises", category: "Income", amount: "$5,400.00", isIncome: true },
                  ].map((transaction, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{transaction.date}</td>
                      <td className="px-6 py-4 text-sm font-medium">{transaction.desc}</td>
                      <td className="px-6 py-4 text-sm">{transaction.category}</td>
                      <td className={`px-6 py-4 text-sm font-medium ${transaction.isIncome ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.isIncome ? '+' : '-'}{transaction.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.isIncome 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.isIncome ? 'Completed' : 'Processed'}
                        </span>
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
            <h2 className="font-semibold">Financial Summary</h2>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Revenue</span>
                  <span className="text-sm font-medium">$24,780.00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Expenses</span>
                  <span className="text-sm font-medium">$8,450.00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Profit</span>
                  <span className="text-sm font-medium">$16,330.00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-brand-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium mb-3">Top Categories</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Services</span>
                    <span className="text-sm font-medium">62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Products</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Consulting</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountingPage;
