import { FileText, Languages, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { TEMPLATES, TemplateStyle } from "@/types/invoiceTemplates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { invoiceSettingsService } from "@/services/invoiceSettingsService";
import { toast } from "@/components/ui/sonner";

interface InvoiceSettingsProps {
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  taxType: string;
  setTaxType: (taxType: string) => void;
  taxRate: number;
  setTaxRate: (rate: number) => void;
  customTaxName: string;
  setCustomTaxName: (name: string) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  paymentTerms: string;
  setPaymentTerms: (terms: string) => void;
  user: ExtendedUser | null;
}

const InvoiceSettings = ({
  currency,
  setCurrency,
  language,
  setLanguage,
  taxType,
  setTaxType,
  taxRate,
  setTaxRate,
  customTaxName,
  setCustomTaxName,
  selectedTemplate,
  setSelectedTemplate,
  paymentTerms,
  setPaymentTerms,
  user,
}: InvoiceSettingsProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const selectedTemplateData = TEMPLATES.find((t) => t.id === selectedTemplate);

  const handlePreviewClick = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await invoiceSettingsService.updateSettings(user.id, {
        currency,
        language,
        tax_type: taxType,
        tax_rate: taxRate,
        custom_tax_name: customTaxName,
        payment_terms: paymentTerms,
        template: selectedTemplate,
      });

      toast.success("Invoice settings saved successfully!");
    } catch (error) {
      console.error("Error saving invoice settings:", error);
      toast.error("Failed to save invoice settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full lg:w-80">
      <div className="bg-white rounded-lg shadow p-6 sticky top-6">
        <h3 className="text-lg font-medium mb-4">Invoice Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="GHS">GHS - Ghanaian Cedi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="Arabic">Arabic</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Swahili">Swahili</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Type
            </label>
            <select
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
            >
              <option value="none">No Tax</option>
              <option value="vat">VAT</option>
              <option value="gst">GST</option>
              <option value="custom">Custom Tax</option>
            </select>
          </div>

          {taxType !== "none" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {taxType === "custom" ? "Custom Tax Name" : "Tax Rate (%)"}
              </label>
              {taxType === "custom" && (
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary mb-2"
                  value={customTaxName}
                  onChange={(e) => setCustomTaxName(e.target.value)}
                  placeholder="e.g. Sales Tax"
                />
              )}
              <input
                type="number"
                className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Terms
            </label>
            <select
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            >
              <option value="due_on_receipt">Due on Receipt</option>
              <option value="net_15">Net 15</option>
              <option value="net_30">Net 30</option>
              <option value="net_60">Net 60</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Template
            </label>
            <Select
              value={selectedTemplate}
              onValueChange={(value) => setSelectedTemplate(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{
                          backgroundColor:
                            template.styles.header.backgroundColor,
                          border: `1px solid ${template.styles.header.borderColor}`,
                        }}
                      />
                      <span>{template.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTemplateData && (
              <div className="mt-2 text-sm text-gray-500">
                {selectedTemplateData.description}
              </div>
            )}
            <Button
              variant="ghost"
              className="mt-2 w-full"
              onClick={handlePreviewClick}
            >
              <FileText className="h-4 w-4 mr-2" />
              Preview Template
            </Button>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                Enable auto-reminders
              </span>
            </label>
            <p className="text-xs text-gray-500 ml-6 mt-1">
              Automatically remind clients about unpaid invoices
            </p>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                Enable late payment fee
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Late Fee (%)
            </label>
            <input
              type="number"
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
              defaultValue="5"
              min="0"
              max="100"
            />
          </div>

          <div className="border-t pt-4">
            <Button
              variant="ghost"
              className="flex items-center text-brand-primary text-sm mb-4"
              onClick={handlePreviewClick}
            >
              <FileText className="h-4 w-4 mr-1" />
              Preview Invoice Template
            </Button>

            <Button className="w-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </div>

      {showPreview && selectedTemplateData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Template Preview</h2>
              <Button variant="ghost" onClick={handleClosePreview}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div
              className="border rounded-md overflow-hidden"
              style={{
                backgroundColor:
                  selectedTemplateData.styles.body.backgroundColor,
                color: selectedTemplateData.styles.body.textColor,
                borderColor: selectedTemplateData.styles.body.borderColor,
              }}
            >
              <div className="p-8">
                <div
                  className="flex justify-between items-start mb-8 p-6 rounded-md"
                  style={{
                    backgroundColor:
                      selectedTemplateData.styles.header.backgroundColor,
                    color: selectedTemplateData.styles.header.textColor,
                    borderColor: selectedTemplateData.styles.header.borderColor,
                  }}
                >
                  <div>
                    <h1 className="text-2xl font-bold">Invoice</h1>
                    <p className="text-gray-500">#INV-001</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Your Business Name</p>
                    <p className="text-gray-500">your@email.com</p>
                    <p className="text-gray-500">123 Business St</p>
                    <p className="text-gray-500">City, State 12345</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Bill To
                    </h3>
                    <p className="font-medium">Client Name</p>
                    <p className="text-gray-500">client@email.com</p>
                    <p className="text-gray-500">123 Client St</p>
                    <p className="text-gray-500">City, State 12345</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Invoice Details
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Issue Date:</p>
                      <p>2024-03-20</p>
                      <p className="text-gray-500">Due Date:</p>
                      <p>2024-04-20</p>
                      <p className="text-gray-500">Payment Terms:</p>
                      <p>Net 30</p>
                    </div>
                  </div>
                </div>

                <table
                  className="w-full mb-8"
                  style={{
                    borderColor: selectedTemplateData.styles.table.borderColor,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor:
                          selectedTemplateData.styles.table.headerBackground,
                        color:
                          selectedTemplateData.styles.table.headerTextColor,
                      }}
                    >
                      <th className="text-left py-2 px-4">Item</th>
                      <th className="text-right py-2 px-4">Quantity</th>
                      <th className="text-right py-2 px-4">Rate</th>
                      <th className="text-right py-2 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        backgroundColor:
                          selectedTemplateData.styles.table.rowBackground,
                        color: selectedTemplateData.styles.table.rowTextColor,
                      }}
                    >
                      <td className="py-2 px-4">Sample Item</td>
                      <td className="text-right py-2 px-4">1</td>
                      <td className="text-right py-2 px-4">$100.00</td>
                      <td className="text-right py-2 px-4">$100.00</td>
                    </tr>
                  </tbody>
                </table>

                <div
                  className="flex justify-end mb-8 p-6 rounded-md"
                  style={{
                    backgroundColor:
                      selectedTemplateData.styles.summary.backgroundColor,
                    color: selectedTemplateData.styles.summary.textColor,
                    borderColor:
                      selectedTemplateData.styles.summary.borderColor,
                  }}
                >
                  <div className="w-64">
                    <div className="flex justify-between py-2">
                      <span>Subtotal:</span>
                      <span>$100.00</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Tax (10%):</span>
                      <span>$10.00</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold border-t">
                      <span>Total:</span>
                      <span>$110.00</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Thank you for your business!</p>
                  <p className="mt-2">
                    Please make payment within the specified due date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceSettings;
