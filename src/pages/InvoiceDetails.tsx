import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Printer, Download, Mail } from "lucide-react";
import { invoiceService } from "@/services/invoiceService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"] & {
  invoice_items: Database["public"]["Tables"]["invoice_items"]["Row"][];
  clients: Database["public"]["Tables"]["clients"]["Row"];
  issue_date: string;
  tax_amount: number;
  terms?: string;
};

const InvoiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id || !user) return;

      try {
        const data = await invoiceService.getInvoice(id);
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        toast.error("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/invoices"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Link>
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Invoice #{invoice.invoice_number}
              </h1>
              <p className="text-gray-500 mt-1">
                Created on {format(new Date(invoice.created_at), "MMM d, yyyy")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Bill From</h2>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.business_name || "Your Business Name"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.user_metadata?.address || "Your Address"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.user_metadata?.phone || "Your Phone"}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Bill To</h2>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">
                    {invoice.clients.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {invoice.clients.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {invoice.clients.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500">
                <div>
                  <p>Issue Date</p>
                  <p className="mt-1 text-gray-900">
                    {format(new Date(invoice.issue_date), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p>Due Date</p>
                  <p className="mt-1 text-gray-900">
                    {format(new Date(invoice.due_date), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p>Status</p>
                  <Badge
                    variant={getStatusColor(invoice.status)}
                    className="mt-1"
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.invoice_items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${item.unit_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                    >
                      Subtotal
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ${invoice.total_amount.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                    >
                      Tax
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      ${invoice.tax_amount.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-right text-sm font-medium text-gray-900"
                    >
                      Total
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      ${(invoice.total_amount + invoice.tax_amount).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {invoice.notes && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-2 text-sm text-gray-900">{invoice.notes}</p>
              </div>
            )}

            {invoice.terms && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500">Terms</h3>
                <p className="mt-2 text-sm text-gray-900">{invoice.terms}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
