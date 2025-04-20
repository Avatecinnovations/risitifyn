import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { invoiceService } from "@/services/invoiceService";
import { invoiceSettingsService } from "@/services/invoiceSettingsService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Database } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { TEMPLATES, TemplateStyle } from "@/types/invoiceTemplates";

type InvoiceStatus = Database["public"]["Tables"]["invoices"]["Row"]["status"];

interface InvoicePreviewProps {
  formData: {
    client_id: string;
    invoice_number: string;
    issue_date: string;
    due_date: string;
    status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
    total_amount: number;
    tax_amount: number;
    notes: string;
    terms: string;
    currency: string;
    language: string;
    payment_terms: string;
    tax_type: string;
    tax_rate: number;
    custom_tax_name: string;
    template: string;
  };
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
  }>;
  selectedClient: {
    id: string;
    name: string;
    email: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;
  onClose: () => void;
}

const InvoicePreview = ({
  formData,
  items,
  selectedClient,
  onClose,
}: InvoicePreviewProps) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<
    Database["public"]["Tables"]["invoice_settings"]["Row"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const selectedTemplate =
    TEMPLATES.find((t) => t.id === formData.template) || TEMPLATES[0];

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user) {
          const settings = await invoiceSettingsService.getOrCreateSettings(
            user.id
          );
          setSettings(settings);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleSendEmail = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // First create the invoice
      const invoiceData = {
        user_id: user.id,
        client_id: formData.client_id,
        invoice_number: formData.invoice_number,
        status: formData.status,
        issue_date: formData.issue_date,
        due_date: formData.due_date,
        total_amount: formData.total_amount,
        tax_amount: formData.tax_amount,
        notes: formData.notes,
        terms: formData.terms,
        currency: formData.currency,
        language: formData.language,
        payment_terms: formData.payment_terms,
        tax_type: formData.tax_type,
        tax_rate: formData.tax_rate,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Create invoice without items first
      const { data: savedInvoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single();

      if (invoiceError) throw invoiceError;
      if (!savedInvoice) throw new Error("Failed to create invoice");

      // Then create the items with the invoice_id
      const itemsWithInvoiceId = items.map((item) => ({
        ...item,
        id: undefined, // Let the database generate the ID
        invoice_id: savedInvoice.id,
        tax_rate: formData.tax_rate,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsWithInvoiceId);

      if (itemsError) throw itemsError;

      await invoiceService.sendInvoice(savedInvoice.id);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // First create the invoice
      const invoiceData = {
        user_id: user.id,
        client_id: formData.client_id,
        invoice_number: formData.invoice_number,
        status: formData.status,
        issue_date: formData.issue_date,
        due_date: formData.due_date,
        total_amount: formData.total_amount,
        tax_amount: formData.tax_amount,
        notes: formData.notes,
        terms: formData.terms,
        currency: formData.currency,
        language: formData.language,
        payment_terms: formData.payment_terms,
        tax_type: formData.tax_type,
        tax_rate: formData.tax_rate,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Create invoice without items first
      const { data: savedInvoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single();

      if (invoiceError) throw invoiceError;
      if (!savedInvoice) throw new Error("Failed to create invoice");

      // Then create the items with the invoice_id
      const itemsWithInvoiceId = items.map((item) => ({
        ...item,
        id: undefined, // Let the database generate the ID
        invoice_id: savedInvoice.id,
        tax_rate: formData.tax_rate,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsWithInvoiceId);

      if (itemsError) throw itemsError;

      await invoiceService.downloadInvoicePDF(savedInvoice.id);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Invoice Preview</h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div
            className="border rounded-md overflow-hidden"
            style={{
              backgroundColor: selectedTemplate.styles.body.backgroundColor,
              color: selectedTemplate.styles.body.textColor,
              borderColor: selectedTemplate.styles.body.borderColor,
            }}
          >
            <div className="p-8">
              <div
                className="flex justify-between items-start mb-8 p-6 rounded-md"
                style={{
                  backgroundColor:
                    selectedTemplate.styles.header.backgroundColor,
                  color: selectedTemplate.styles.header.textColor,
                  borderColor: selectedTemplate.styles.header.borderColor,
                }}
              >
                <div>
                  <h1 className="text-2xl font-bold">Invoice</h1>
                  <p
                    style={{
                      color: selectedTemplate.styles.header.accentColor,
                    }}
                  >
                    #{formData.invoice_number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {user?.company_name ||
                      user?.businessName ||
                      user?.user_metadata?.businessName ||
                      "Your Business Name"}
                  </p>
                  <p
                    style={{
                      color: selectedTemplate.styles.header.accentColor,
                    }}
                  >
                    {user?.email || "your@email.com"}
                  </p>
                  <p
                    style={{
                      color: selectedTemplate.styles.header.accentColor,
                    }}
                  >
                    {user?.address ||
                      user?.user_metadata?.address ||
                      "Your Address"}
                  </p>
                  <p
                    style={{
                      color: selectedTemplate.styles.header.accentColor,
                    }}
                  >
                    {user?.phone || user?.user_metadata?.phone || "Your Phone"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3
                    className="text-sm font-medium mb-2"
                    style={{ color: selectedTemplate.styles.body.textColor }}
                  >
                    Bill To
                  </h3>
                  {selectedClient ? (
                    <>
                      <p className="font-medium">{selectedClient.name}</p>
                      <p
                        style={{
                          color: selectedTemplate.styles.body.textColor,
                        }}
                      >
                        {selectedClient.email}
                      </p>
                      <p
                        style={{
                          color: selectedTemplate.styles.body.textColor,
                        }}
                      >
                        {selectedClient.address}
                      </p>
                      <p
                        style={{
                          color: selectedTemplate.styles.body.textColor,
                        }}
                      >
                        {[
                          selectedClient.city,
                          selectedClient.state,
                          selectedClient.postal_code,
                          selectedClient.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </>
                  ) : (
                    <p
                      style={{ color: selectedTemplate.styles.body.textColor }}
                    >
                      No client selected
                    </p>
                  )}
                </div>
                <div>
                  <h3
                    className="text-sm font-medium mb-2"
                    style={{ color: selectedTemplate.styles.body.textColor }}
                  >
                    Invoice Details
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <p
                      style={{ color: selectedTemplate.styles.body.textColor }}
                    >
                      Issue Date:
                    </p>
                    <p>{formData.issue_date}</p>
                    <p
                      style={{ color: selectedTemplate.styles.body.textColor }}
                    >
                      Due Date:
                    </p>
                    <p>{formData.due_date}</p>
                    <p
                      style={{ color: selectedTemplate.styles.body.textColor }}
                    >
                      Payment Terms:
                    </p>
                    <p>{formData.payment_terms} days</p>
                  </div>
                </div>
              </div>

              <table
                className="w-full mb-8"
                style={{
                  borderColor: selectedTemplate.styles.table.borderColor,
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor:
                        selectedTemplate.styles.table.headerBackground,
                      color: selectedTemplate.styles.table.headerTextColor,
                    }}
                  >
                    <th className="text-left py-2 px-4">Description</th>
                    <th className="text-right py-2 px-4">Quantity</th>
                    <th className="text-right py-2 px-4">Rate</th>
                    <th className="text-right py-2 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        backgroundColor:
                          selectedTemplate.styles.table.rowBackground,
                        color: selectedTemplate.styles.table.rowTextColor,
                      }}
                    >
                      <td className="py-2 px-4">{item.description}</td>
                      <td className="text-right py-2 px-4">{item.quantity}</td>
                      <td className="text-right py-2 px-4">
                        {formatCurrency(item.unit_price, formData.currency)}
                      </td>
                      <td className="text-right py-2 px-4">
                        {formatCurrency(item.amount, formData.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  {formData.notes && (
                    <>
                      <h3
                        className="text-sm font-medium mb-2"
                        style={{
                          color: selectedTemplate.styles.body.textColor,
                        }}
                      >
                        Notes
                      </h3>
                      <p
                        style={{
                          color: selectedTemplate.styles.body.textColor,
                        }}
                      >
                        {formData.notes}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  {formData.terms && (
                    <>
                      <h3
                        className="text-sm font-medium mb-2"
                        style={{
                          color: selectedTemplate.styles.body.textColor,
                        }}
                      >
                        Terms & Conditions
                      </h3>
                      <p
                        style={{
                          color: selectedTemplate.styles.body.textColor,
                        }}
                      >
                        {formData.terms}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor:
                    selectedTemplate.styles.summary.backgroundColor,
                  color: selectedTemplate.styles.summary.textColor,
                  borderColor: selectedTemplate.styles.summary.borderColor,
                }}
              >
                <div className="flex justify-between py-2">
                  <span>Subtotal:</span>
                  <span>
                    {formatCurrency(
                      items.reduce((sum, item) => sum + item.amount, 0),
                      formData.currency
                    )}
                  </span>
                </div>
                {formData.tax_type !== "none" && (
                  <div className="flex justify-between py-2">
                    <span>
                      {formData.tax_type === "vat" && "VAT"}
                      {formData.tax_type === "gst" && "GST"}
                      {formData.tax_type === "custom" &&
                        formData.custom_tax_name}
                      {` (${formData.tax_rate}%)`}:
                    </span>
                    <span>
                      {formatCurrency(formData.tax_amount, formData.currency)}
                    </span>
                  </div>
                )}
                <div
                  className="flex justify-between py-2 font-bold text-lg border-t"
                  style={{
                    borderColor: selectedTemplate.styles.summary.borderColor,
                  }}
                >
                  <span>Total:</span>
                  <span>
                    {formatCurrency(formData.total_amount, formData.currency)}
                  </span>
                </div>
              </div>

              <div
                className="text-sm mt-8"
                style={{ color: selectedTemplate.styles.body.textColor }}
              >
                <p>Thank you for your business!</p>
                <p className="mt-2">
                  Please make payment within the specified due date.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handleSendEmail}
              disabled={isLoading}
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              disabled={isLoading}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
