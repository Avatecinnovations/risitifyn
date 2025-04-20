import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus, MoreVertical, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { invoiceService } from "@/services/invoiceService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Invoices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (!user?.id) return;
        const data = await invoiceService.getInvoices(user.id);
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
        toast.error("Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user?.id]);

  const handleDeleteInvoice = async (invoiceId: string) => {
    try {
      await invoiceService.deleteInvoice(invoiceId);
      setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
      toast.success("Invoice deleted successfully");
    } catch (error) {
      console.error("Failed to delete invoice:", error);
      toast.error("Failed to delete invoice");
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      invoice.invoice_number.toLowerCase().includes(searchLower) ||
      invoice.clients?.name.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Invoices
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Manage and track all your invoices
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-9 px-3 gap-1.5">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-9 px-3 gap-1.5 bg-[#0f172a] hover:bg-[#0f172a]/90"
          >
            <Link to="/invoices/new">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Invoice</span>
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Invoices</CardTitle>
            <div className="relative w-64">
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left">Invoice ID</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Client</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Amount</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Date</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Due Date</th>
                  <th className="px-3 sm:px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      Loading invoices...
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 text-sm font-medium text-brand-primary">
                        {invoice.invoice_number}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm">
                        {invoice.clients?.name}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm font-medium">
                        {formatCurrency(invoice.total_amount, "USD")}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : invoice.status === "overdue"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm">
                        {formatDate(invoice.issue_date)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm">
                        {formatDate(invoice.due_date)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/invoices/${invoice.id}`)
                              }
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/invoices/${invoice.id}/edit`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteInvoice(invoice.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
