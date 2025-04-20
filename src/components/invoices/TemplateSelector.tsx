import { useState } from "react";
import { TEMPLATES, TemplateStyle } from "@/types/invoiceTemplates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export const TemplateSelector = ({
  selectedTemplate,
  onTemplateSelect,
}: TemplateSelectorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateStyle | null>(
    null
  );

  const handlePreviewClick = (template: TemplateStyle) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setPreviewTemplate(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary"
                : "hover:shadow-md"
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md mb-2 overflow-hidden">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600">{template.description}</p>
              <Button
                variant="ghost"
                className="mt-2 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviewClick(template);
                }}
              >
                Preview
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showPreview && previewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {previewTemplate.name} Template Preview
              </h2>
              <Button variant="ghost" onClick={handleClosePreview}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div
              className="border rounded-md overflow-hidden"
              style={{
                backgroundColor: previewTemplate.styles.body.backgroundColor,
                color: previewTemplate.styles.body.textColor,
                borderColor: previewTemplate.styles.body.borderColor,
              }}
            >
              <div className="p-8">
                <div
                  className="flex justify-between items-start mb-8 p-6 rounded-md"
                  style={{
                    backgroundColor:
                      previewTemplate.styles.header.backgroundColor,
                    color: previewTemplate.styles.header.textColor,
                    borderColor: previewTemplate.styles.header.borderColor,
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
                    borderColor: previewTemplate.styles.table.borderColor,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor:
                          previewTemplate.styles.table.headerBackground,
                        color: previewTemplate.styles.table.headerTextColor,
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
                          previewTemplate.styles.table.rowBackground,
                        color: previewTemplate.styles.table.rowTextColor,
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
                      previewTemplate.styles.summary.backgroundColor,
                    color: previewTemplate.styles.summary.textColor,
                    borderColor: previewTemplate.styles.summary.borderColor,
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
