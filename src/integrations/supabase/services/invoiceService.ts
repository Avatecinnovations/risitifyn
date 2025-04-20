import { supabase } from "../client";
import { Database } from "@/types/database";

class InvoiceService {
  async createInvoice(
    invoiceData: Omit<
      Database["public"]["Tables"]["invoices"]["Insert"],
      "id" | "created_at"
    >,
    items: Omit<
      Database["public"]["Tables"]["invoice_items"]["Insert"],
      "id" | "created_at" | "invoice_id"
    >[]
  ): Promise<Database["public"]["Tables"]["invoices"]["Row"]> {
    try {
      // First create the invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single();

      if (invoiceError) throw invoiceError;
      if (!invoice) throw new Error("Failed to create invoice");

      // Then create the items with the invoice_id
      const itemsWithInvoiceId = items.map((item) => ({
        ...item,
        invoice_id: invoice.id,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsWithInvoiceId);

      if (itemsError) throw itemsError;

      return invoice;
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  }
}

export default new InvoiceService();
