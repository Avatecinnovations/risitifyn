import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/types/database";
import { formatCurrency } from "@/lib/utils";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Resend } from "resend";

// Log the API key (first few characters only for security)
const apiKey = import.meta.env.VITE_RESEND_API_KEY;
console.log(
  "Resend API Key loaded:",
  apiKey ? `${apiKey.substring(0, 4)}...` : "Not found"
);

if (!apiKey) {
  console.error("Resend API key is missing. Please check your .env file.");
}

const resend = new Resend(apiKey);

type Invoice = Database["public"]["Tables"]["invoices"]["Row"] & {
  invoice_items: Database["public"]["Tables"]["invoice_items"]["Row"][];
  clients: Database["public"]["Tables"]["clients"]["Row"];
};

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  amount: number;
}

interface Quote {
  id: string;
  user_id: string;
  client_id: string;
  quote_number: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  issue_date: string;
  expiry_date: string;
  total_amount: number;
  tax_amount: number;
  notes?: string;
  terms?: string;
  payment_terms?: string;
  created_at: string;
  updated_at: string;
  quote_items: QuoteItem[];
  clients: {
    id: string;
    name: string;
    email: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    currency?: string;
  };
}

export const emailService = {
  async sendInvoiceEmail(invoice: Invoice) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const template = this.generateInvoiceEmailTemplate(invoice);
    const pdfBuffer = await this.generateInvoicePDF(invoice);

    try {
      const { data, error } = await resend.emails.send({
        from: "Risitify <noreply@risitify.com>",
        to: invoice.clients.email,
        subject: `Invoice #${invoice.invoice_number} from ${user.email}`,
        html: template,
        attachments: [
          {
            filename: `invoice-${invoice.invoice_number}.pdf`,
            content: pdfBuffer,
          },
        ],
      });

      if (error) {
        console.error("Resend error:", error);
        throw new Error(`Failed to send email: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("Error in sendInvoiceEmail:", error);
      throw error;
    }
  },

  generateInvoiceEmailTemplate(invoice: Invoice): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .invoice-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            .table th,
            .table td {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            .table th {
              background-color: #f8f9fa;
            }
            .text-right {
              text-align: right;
            }
            .notes {
              margin-top: 30px;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 5px;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Invoice #${invoice.invoice_number}</h1>
              <p style="margin: 10px 0; color: #666;">Date: ${new Date(invoice.issue_date).toLocaleDateString()}</p>
              <p style="margin: 0; color: #666;">Due Date: ${new Date(invoice.due_date).toLocaleDateString()}</p>
            </div>

            <div class="invoice-details">
              <div>
                <h2 style="margin: 0 0 15px 0; font-size: 18px;">Bill To:</h2>
                <p style="margin: 0 0 5px 0; font-weight: 600;">${invoice.clients.name}</p>
                ${invoice.clients.email ? `<p style="margin: 0 0 5px 0;">${invoice.clients.email}</p>` : ""}
                ${invoice.clients.address ? `<p style="margin: 0 0 5px 0;">${invoice.clients.address}</p>` : ""}
                ${invoice.clients.city ? `<p style="margin: 0 0 5px 0;">${invoice.clients.city}, ${invoice.clients.state} ${invoice.clients.postal_code}</p>` : ""}
                ${invoice.clients.country ? `<p style="margin: 0;">${invoice.clients.country}</p>` : ""}
              </div>
              <div>
                <h2 style="margin: 0 0 15px 0; font-size: 18px;">Invoice Details:</h2>
                <p style="margin: 0 0 5px 0;"><strong>Status:</strong> ${invoice.status}</p>
                <p style="margin: 0 0 5px 0;"><strong>Payment Terms:</strong> Net ${invoice.payment_terms} days</p>
                <p style="margin: 0 0 5px 0;"><strong>Currency:</strong> ${invoice.currency}</p>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th class="text-right">Quantity</th>
                  <th class="text-right">Unit Price</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.invoice_items
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.description}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">${formatCurrency(item.unit_price, invoice.currency)}</td>
                    <td class="text-right">${formatCurrency(item.amount, invoice.currency)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right"><strong>Subtotal:</strong></td>
                  <td class="text-right">${formatCurrency(invoice.total_amount - invoice.tax_amount, invoice.currency)}</td>
                </tr>
                ${
                  invoice.tax_amount > 0
                    ? `
                  <tr>
                    <td colspan="3" class="text-right"><strong>Tax (${invoice.tax_rate}%):</strong></td>
                    <td class="text-right">${formatCurrency(invoice.tax_amount, invoice.currency)}</td>
                  </tr>
                `
                    : ""
                }
                <tr>
                  <td colspan="3" class="text-right"><strong>Total:</strong></td>
                  <td class="text-right">${formatCurrency(invoice.total_amount, invoice.currency)}</td>
                </tr>
              </tfoot>
            </table>

            ${
              invoice.notes
                ? `
              <div class="notes">
                <h3 style="margin: 0 0 10px 0; font-size: 16px;">Notes:</h3>
                <p style="margin: 0;">${invoice.notes}</p>
              </div>
            `
                : ""
            }

            ${
              invoice.terms
                ? `
              <div class="notes">
                <h3 style="margin: 0 0 10px 0; font-size: 16px;">Terms:</h3>
                <p style="margin: 0;">${invoice.terms}</p>
              </div>
            `
                : ""
            }

            <div class="footer">
              <p style="margin: 0 0 10px 0;">Thank you for your business!</p>
              <p style="margin: 0;">Please find the attached PDF invoice for your records.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  async sendQuoteEmail(quote: Quote) {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("User not authenticated");

      // Generate PDF
      const pdfBuffer = await this.generateQuotePDF(quote);

      // Generate a unique token for the PDF
      const token = crypto.randomUUID();
      const fileName = `${user.id}/${quote.quote_number}-${token}.pdf`;

      // Upload PDF to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("quotes")
        .upload(fileName, pdfBuffer, {
          contentType: "application/pdf",
          cacheControl: "3600", // 1 hour
          upsert: false,
        });

      if (uploadError) {
        console.error("Error uploading PDF:", uploadError);
        throw new Error(`Failed to upload PDF: ${uploadError.message}`);
      }

      // Get the public URL for the PDF
      const {
        data: { publicUrl },
      } = supabase.storage.from("quotes").getPublicUrl(fileName);

      // Create mailto link with subject and body
      const subject = `Quote #${quote.quote_number} from ${user?.user_metadata?.business_name || user?.email || "Your Business"}`;
      const body = `Dear ${quote.clients.name},\n\nPlease find your quote #${quote.quote_number} below.\n\nTo download the PDF, click the link below (valid for 1 hour):\n${publicUrl}\n\nBest regards,\n${user?.user_metadata?.business_name || user?.email || "Your Business"}`;

      // Create mailto link
      const mailtoLink = `mailto:${quote.clients.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open default email client
      window.location.href = mailtoLink;

      return { success: true };
    } catch (error) {
      console.error("Error in sendQuoteEmail:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to prepare email: ${error.message}`);
      }
      throw error;
    }
  },

  generateQuoteEmailTemplate(quote: Quote): string {
    const paymentTerms = JSON.parse(
      quote.payment_terms || '{"type":"full","percentage":100}'
    );
    const initialPayment =
      paymentTerms.type === "partial"
        ? (quote.total_amount * (paymentTerms.percentage || 0)) / 100
        : quote.total_amount;
    const remainingBalance = quote.total_amount - initialPayment;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Quote ${quote.quote_number}</h2>
        <p>Dear ${quote.clients.name},</p>
        <p>Thank you for your interest in our services. Please find the quote details below:</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p><strong>Quote Number:</strong> ${quote.quote_number}</p>
          <p><strong>Issue Date:</strong> ${new Date(quote.issue_date).toLocaleDateString()}</p>
          <p><strong>Expiry Date:</strong> ${new Date(quote.expiry_date).toLocaleDateString()}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Unit Price</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Tax Rate</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${quote.quote_items
              .map(
                (item) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.description}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${formatCurrency(item.unit_price, "USD")}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${item.tax_rate}%</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${formatCurrency(item.amount, "USD")}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="text-align: right;"><strong>Subtotal:</strong> ${formatCurrency(quote.total_amount - quote.tax_amount, "USD")}</p>
          <p style="text-align: right;"><strong>Tax:</strong> ${formatCurrency(quote.tax_amount, "USD")}</p>
          <p style="text-align: right;"><strong>Total:</strong> ${formatCurrency(quote.total_amount, "USD")}</p>
          
          ${
            paymentTerms.type === "partial"
              ? `
            <p style="text-align: right;"><strong>Initial Payment (${paymentTerms.percentage}%):</strong> ${formatCurrency(initialPayment, "USD")}</p>
            <p style="text-align: right;"><strong>Remaining Balance:</strong> ${formatCurrency(remainingBalance, "USD")}</p>
          `
              : ""
          }
        </div>

        ${
          quote.notes
            ? `
          <div style="margin: 20px 0;">
            <h3>Notes</h3>
            <p>${quote.notes}</p>
          </div>
        `
            : ""
        }

        ${
          quote.terms
            ? `
          <div style="margin: 20px 0;">
            <h3>Terms & Conditions</h3>
            <p>${quote.terms}</p>
          </div>
        `
            : ""
        }

        <p>Please find the attached PDF for your records.</p>
        <p>Best regards,<br>Your Business</p>
      </div>
    `;
  },

  async generateQuotePDF(quote: Quote): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Add header
    page.drawText(`Quote #${quote.quote_number}`, {
      x: 50,
      y: height - 50,
      size: 20,
      font,
      color: rgb(0, 0, 0),
    });

    // Add client information
    page.drawText(`Client: ${quote.clients.name}`, {
      x: 50,
      y: height - 100,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${quote.clients.email}`, {
      x: 50,
      y: height - 120,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    // Add quote details
    page.drawText(
      `Issue Date: ${new Date(quote.issue_date).toLocaleDateString()}`,
      {
        x: 50,
        y: height - 150,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
    );
    page.drawText(
      `Expiry Date: ${new Date(quote.expiry_date).toLocaleDateString()}`,
      {
        x: 50,
        y: height - 170,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
    );

    // Add items table
    let y = height - 220;
    page.drawText("Description", {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText("Quantity", {
      x: 250,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText("Unit Price", {
      x: 350,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText("Amount", {
      x: 450,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 20;
    for (const item of quote.quote_items) {
      page.drawText(item.description, {
        x: 50,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(item.quantity.toString(), {
        x: 250,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(
        formatCurrency(item.unit_price, quote.clients.currency || "USD"),
        {
          x: 350,
          y,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        }
      );
      page.drawText(
        formatCurrency(item.amount, quote.clients.currency || "USD"),
        {
          x: 450,
          y,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        }
      );
      y -= 20;
    }

    // Add totals
    y -= 20;
    page.drawText(
      `Subtotal: ${formatCurrency(quote.total_amount - quote.tax_amount, quote.clients.currency || "USD")}`,
      {
        x: 350,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
    );
    y -= 20;
    page.drawText(
      `Tax: ${formatCurrency(quote.tax_amount, quote.clients.currency || "USD")}`,
      {
        x: 350,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
    );
    y -= 20;
    page.drawText(
      `Total: ${formatCurrency(quote.total_amount, quote.clients.currency || "USD")}`,
      {
        x: 350,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
    );

    // Add payment terms if available
    if (quote.payment_terms) {
      y -= 40;
      page.drawText("Payment Terms:", {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
      page.drawText(quote.payment_terms, {
        x: 50,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Add notes if available
    if (quote.notes) {
      y -= 40;
      page.drawText("Notes:", {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
      page.drawText(quote.notes, {
        x: 50,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }

    // Add terms if available
    if (quote.terms) {
      y -= 40;
      page.drawText("Terms:", {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
      page.drawText(quote.terms, {
        x: 50,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    }

    return await pdfDoc.save();
  },
};
