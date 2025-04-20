import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { invoiceService } from "@/services/invoiceService";
import { ArrowLeft, Download, Send, Printer } from "lucide-react";
import { Quote, QuoteItem } from "@/types/database";
import { format } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuotePDF from "@/components/QuotePDF";
import { pdf } from "@react-pdf/renderer";

interface ExtendedQuote {
  id: string;
  user_id: string;
  customer_id: string;
  quote_number: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  issue_date: string;
  expiry_date: string;
  subtotal_amount: number;
  total_amount: number;
  tax_amount: number | null;
  tax_rate: number | null;
  notes: string | null;
  terms: string | null;
  created_at: string;
  updated_at: string;
  project_id: string;
  payment_terms: string;
  client?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  quote_items: Array<{
    id: string;
    quote_id: string;
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
    created_at: string;
    updated_at: string;
  }>;
  project?: {
    id: string;
    name: string;
    description: string;
    start_date?: string;
    end_date?: string;
  };
  currency: string;
}

const QuotePreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quote, setQuote] = useState<ExtendedQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      if (!id) return;
      try {
        const data = await invoiceService.getQuoteById(id);
        console.log("Fetched quote data:", data);

        // Calculate subtotal from quote items
        const subtotal = data.quote_items.reduce((sum, item) => {
          const amount = Number(item.amount) || 0;
          return sum + amount;
        }, 0);

        // Calculate tax using the tax rate
        const taxRate = Number(data.tax_rate) || 0;
        const tax = (subtotal * taxRate) / 100;

        // Update the data with calculated values
        data.subtotal_amount = subtotal;
        data.tax_amount = tax;
        data.total_amount = subtotal + tax;

        console.log("Calculated values:", {
          subtotal,
          taxRate,
          tax,
          total: subtotal + tax,
        });

        setQuote(data);
      } catch (error) {
        console.error("Error fetching quote:", error);
        toast.error("Failed to fetch quote");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  const handleSend = async () => {
    if (!id || !quote) return;

    try {
      toast.loading("Sending quote...");
      await invoiceService.sendQuoteEmail(id);

      // Update the local quote status
      setQuote((prev) => (prev ? { ...prev, status: "sent" } : null));

      toast.success("Quote sent successfully to " + quote.client?.email);
    } catch (error) {
      console.error("Error sending quote:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to send quote"
      );
    }
  };

  const handlePrint = async () => {
    if (!quote) return;

    try {
      const pdfData = {
        ...quote,
        user: {
          user_metadata: {
            businessName:
              user?.user_metadata?.businessName ||
              user?.businessName ||
              "Company Name",
            address: user?.user_metadata?.address || "Address",
            phone: user?.user_metadata?.phone || "Phone",
            email: user?.user_metadata?.email || user?.email || "Email",
            website: user?.user_metadata?.website,
            logo_url: user?.user_metadata?.logo_url,
          },
        },
      };

      // Generate PDF blob
      const blob = await pdf(<QuotePDF quote={pdfData} />).toBlob();

      // Create object URL
      const url = URL.createObjectURL(blob);

      // Open print window
      const printWindow = window.open(url);

      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
          // Clean up the URL after printing
          URL.revokeObjectURL(url);
        };
      }
    } catch (error) {
      console.error("Error generating PDF for print:", error);
      toast.error("Failed to prepare document for printing");
    }
  };

  const handleDownload = () => {
    if (!quote) return null;

    const pdfData = {
      ...quote,
      user: {
        user_metadata: {
          businessName:
            user?.user_metadata?.businessName ||
            user?.businessName ||
            "Company Name",
          address: user?.user_metadata?.address || "Address",
          phone: user?.user_metadata?.phone || "Phone",
          email: user?.user_metadata?.email || user?.email || "Email",
          website: user?.user_metadata?.website,
          logo_url: user?.user_metadata?.logo_url,
        },
      },
    };

    return (
      <PDFDownloadLink
        document={<QuotePDF quote={pdfData} />}
        fileName={`quote-${quote.quote_number}.pdf`}
        style={{ textDecoration: "none" }}
      >
        {({ loading, error }) => (
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => {
              if (error) {
                console.error("PDF generation error:", error);
                toast.error("Failed to generate PDF");
              } else if (!loading) {
                toast.success("Quote downloaded successfully");
              }
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            {loading ? "Generating..." : "Download PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    );
  };

  const getCurrencySymbol = () => {
    const currency = user?.user_metadata?.currency || "USD";
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(0).charAt(0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: quote?.currency || "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quote) {
    return <div>Quote not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          {handleDownload()}
          <Button variant="outline" size="sm" onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card className="bg-white p-8">
        {/* Logo and Quote Number Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            {user?.user_metadata?.logo_url ? (
              <img
                src={user.user_metadata.logo_url}
                alt="Company Logo"
                className="h-12 mb-4"
              />
            ) : (
              <h1 className="text-2xl font-bold mb-4">
                {user?.user_metadata?.businessName ||
                  user?.businessName ||
                  "10AM Creative Studio"}
              </h1>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold mb-1">
              Quote {quote.quote_number}
            </h2>
          </div>
        </div>

        {/* Project and Date Section */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Issue Date</p>
                <p>{format(new Date(quote.issue_date), "dd/MM/yyyy")}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Expiry Date</p>
                <p>{format(new Date(quote.expiry_date), "dd/MM/yyyy")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Project</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Project Details</h3>
                {quote.project ? (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Project Name:</span>{" "}
                      {quote.project.name}
                    </p>
                    {quote.project.description && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Description:</span>{" "}
                        {quote.project.description}
                      </p>
                    )}
                    {quote.project.start_date && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Start Date:</span>{" "}
                        {format(
                          new Date(quote.project.start_date),
                          "dd/MM/yyyy"
                        )}
                      </p>
                    )}
                    {quote.project.end_date && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">End Date:</span>{" "}
                        {format(new Date(quote.project.end_date), "dd/MM/yyyy")}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No project associated with this quote
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* From/To Section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-blue-600 font-medium mb-2">FROM:</p>
            <h3 className="text-xl font-bold mb-2">
              {user?.user_metadata?.businessName ||
                user?.businessName ||
                "10AM Creative Studio"}
            </h3>
            <p className="text-gray-600">
              {user?.user_metadata?.address || "Surabaya, East Java, Indonesia"}
            </p>
            <p className="text-gray-600">
              {user?.user_metadata?.phone || "+62 820 4389 2489"}
            </p>
            <p className="text-gray-600">
              {user?.user_metadata?.email ||
                user?.email ||
                "inquiryfor@10am.com"}
            </p>
          </div>
          <div>
            <p className="text-blue-600 font-medium mb-2">TO:</p>
            <div className="text-sm">
              <p className="font-medium">{quote.client?.name || "N/A"}</p>
              <p>{quote.client?.address || "N/A"}</p>
              <p>
                {quote.client?.city || ""} {quote.client?.state || ""}{" "}
                {quote.client?.postal_code || ""}
              </p>
              <p>{quote.client?.country || ""}</p>
              <p>Phone: {quote.client?.phone || "N/A"}</p>
              <p>Email: {quote.client?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Quote Items Table */}
        <div className="mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quote.quote_items?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(item.unit_price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  Subtotal
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {formatCurrency(quote.subtotal_amount)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  Tax ({quote.tax_rate || 0}%)
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {formatCurrency(quote.tax_amount || 0)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-right text-sm font-medium text-gray-500"
                >
                  Total
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {formatCurrency(quote.total_amount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Notes and Terms Section */}
        {(quote.notes || quote.terms) && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            {quote.notes && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                <p className="text-gray-600">{quote.notes}</p>
              </div>
            )}
            {quote.terms && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Terms</h3>
                <p className="text-gray-600">{quote.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4">Thank you!</h3>
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <div className="flex gap-4">
              <span>{user?.user_metadata?.phone || "+62 820 4389 2489"}</span>
              <span>
                {user?.user_metadata?.address || "East Java, Indonesia"}
              </span>
            </div>
            {user?.user_metadata?.website && (
              <a
                href={user.user_metadata.website}
                className="text-blue-600 hover:underline"
              >
                {user.user_metadata.website}
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuotePreview;
