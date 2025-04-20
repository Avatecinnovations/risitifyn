
import { useState } from "react";
import { Link } from "react-router-dom";
import { DollarSign, Download, Filter, Search, ChevronDown, Tag, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaymentTracking from "@/components/payments/PaymentTracking";

const PaymentHistoryPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState("INV-0001");
  
  const payments = [
    { id: "PAY-001", invoice: "INV-0001", client: "Ethan Mitchell", date: "May 15, 2023", amount: "$750.00", method: "Credit Card", status: "completed" },
    { id: "PAY-002", invoice: "INV-0002", client: "Adrian Carter", date: "May 17, 2023", amount: "$1,200.00", method: "Bank Transfer", status: "completed" },
    { id: "PAY-003", invoice: "INV-0005", client: "Leo Parker", date: "May 20, 2023", amount: "$450.00", method: "PayPal", status: "completed" },
    { id: "PAY-004", invoice: "INV-0007", client: "Henry Nelson", date: "May 22, 2023", amount: "$2,500.00", method: "Stripe", status: "completed" },
    { id: "PAY-005", invoice: "INV-0003", client: "Marcus Turner", date: "May 23, 2023", amount: "$320.00", method: "Credit Card", status: "pending" },
    { id: "PAY-006", invoice: "INV-0010", client: "Samuel Blake", date: "May 25, 2023", amount: "$1,800.00", method: "Bank Transfer", status: "processing" },
    { id: "PAY-007", invoice: "INV-0012", client: "Oliver Williams", date: "May 28, 2023", amount: "$900.00", method: "Bank Transfer", status: "failed" }
  ];
  
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <DollarSign className="h-6 w-6 mr-2 text-gray-700" />
            Payment History
          </h1>
          <p className="text-gray-500 mt-1">Track and manage all your invoice payments</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#0D3B29]">
                <DollarSign className="h-4 w-4 mr-2" />
                Record Payment
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/invoices/new" className="flex items-center w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Create & Record Payment
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/payment-links" className="flex items-center w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Generate Payment Link
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
              <div className="border-b">
                <div className="px-4">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="failed">Failed</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search payments..." className="pl-9" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="card">Credit Card</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <TabsContent value="all" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map(payment => (
                        <TableRow 
                          key={payment.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedInvoice(payment.invoice)}
                        >
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>
                            <Link to={`/invoices/${payment.invoice}`} className="text-blue-600 hover:underline">
                              {payment.invoice}
                            </Link>
                          </TableCell>
                          <TableCell>{payment.client}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="font-medium">{payment.amount}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Tag className="h-3 w-3 mr-1 text-gray-400" />
                              {payment.method}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              payment.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : payment.status === 'processing'
                                ? 'bg-blue-100 text-blue-800'
                                : payment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="completed" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter(payment => payment.status === 'completed')
                        .map(payment => (
                          <TableRow 
                            key={payment.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedInvoice(payment.invoice)}
                          >
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>
                              <Link to={`/invoices/${payment.invoice}`} className="text-blue-600 hover:underline">
                                {payment.invoice}
                              </Link>
                            </TableCell>
                            <TableCell>{payment.client}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="font-medium">{payment.amount}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Tag className="h-3 w-3 mr-1 text-gray-400" />
                                {payment.method}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                Completed
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="pending" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter(payment => payment.status === 'pending' || payment.status === 'processing')
                        .map(payment => (
                          <TableRow 
                            key={payment.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedInvoice(payment.invoice)}
                          >
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>
                              <Link to={`/invoices/${payment.invoice}`} className="text-blue-600 hover:underline">
                                {payment.invoice}
                              </Link>
                            </TableCell>
                            <TableCell>{payment.client}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="font-medium">{payment.amount}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Tag className="h-3 w-3 mr-1 text-gray-400" />
                                {payment.method}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                payment.status === 'processing'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="failed" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter(payment => payment.status === 'failed')
                        .map(payment => (
                          <TableRow 
                            key={payment.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedInvoice(payment.invoice)}
                          >
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>
                              <Link to={`/invoices/${payment.invoice}`} className="text-blue-600 hover:underline">
                                {payment.invoice}
                              </Link>
                            </TableCell>
                            <TableCell>{payment.client}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="font-medium">{payment.amount}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Tag className="h-3 w-3 mr-1 text-gray-400" />
                                {payment.method}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                Failed
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <PaymentTracking invoiceId={selectedInvoice} />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
