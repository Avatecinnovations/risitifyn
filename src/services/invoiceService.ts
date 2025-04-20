import { supabase } from "../lib/supabase";
import { Database } from "@/types/database";
import { emailService } from "./emailService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { EmailService } from "./emailService";
import { CreateEmailResponseSuccess } from "./emailService";

type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type InvoiceInsert = Database["public"]["Tables"]["invoices"]["Insert"];
type InvoiceItem = Database["public"]["Tables"]["invoice_items"]["Row"];
type InvoiceItemInsert =
  Database["public"]["Tables"]["invoice_items"]["Insert"];

type QuoteBase = Database["public"]["Tables"]["quotes"]["Row"];
type QuoteInsert = Database["public"]["Tables"]["quotes"]["Insert"];
type QuoteItemBase = Database["public"]["Tables"]["quote_items"]["Row"];
type QuoteItemInsert = Database["public"]["Tables"]["quote_items"]["Insert"];

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

type SalesPerson = Database["public"]["Tables"]["sales_persons"]["Row"];
type SalesPersonInsert =
  Database["public"]["Tables"]["sales_persons"]["Insert"];

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

export const invoiceService = {
  // Client operations
  async getClients(userId: string) {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching clients:", error);
      return [];
    }
  },

  async createClient(clientData: any) {
    const { data, error } = await supabase
      .from("clients")
      .insert([clientData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateClient(id: string, clientData: any) {
    const { data, error } = await supabase
      .from("clients")
      .update(clientData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteClient(id: string) {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) throw error;
  },

  // Quote operations
  async getQuotes(userId: string) {
    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        client:clients(id, name),
        quote_items:quote_items(*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createQuote(quoteData: any) {
    try {
      // Validate required fields
      if (!quoteData.user_id || !quoteData.client_id) {
        throw new Error("User ID and Client ID are required");
      }

      // Calculate subtotal from quote items
      const subtotal = quoteData.quote_items.reduce((sum, item) => {
        const amount = Number(item.amount) || 0;
        return sum + amount;
      }, 0);

      // Calculate tax using the tax rate
      const taxRate = Number(quoteData.tax_rate) || 0;
      const tax = (subtotal * taxRate) / 100;

      // Create the quote
      const { data: quote, error: quoteError } = await supabase
        .from("quotes")
        .insert([
          {
            user_id: quoteData.user_id,
            client_id: quoteData.client_id,
            project_id: quoteData.project_id,
            quote_number: quoteData.quote_number,
            status: quoteData.status || "draft",
            issue_date: quoteData.issue_date,
            expiry_date: quoteData.expiry_date,
            subtotal_amount: subtotal,
            tax_rate: taxRate,
            tax_amount: tax,
            total_amount: subtotal + tax,
            notes: quoteData.notes || "",
            terms: quoteData.terms || "",
            payment_terms: JSON.stringify({
              type: quoteData.payment_type || "full",
              percentage: quoteData.payment_percentage || 100,
            }),
          },
        ])
        .select()
        .single();

      if (quoteError) throw quoteError;
      if (!quote) throw new Error("Failed to create quote");

      // Insert quote items if they exist
      if (quoteData.quote_items && quoteData.quote_items.length > 0) {
        const quoteItems = quoteData.quote_items.map((item: any) => ({
          quote_id: quote.id,
          description: item.description || "",
          quantity: Number(item.quantity) || 0,
          unit_price: Number(item.unit_price) || 0,
          amount: Number(item.amount) || 0,
        }));

        const { error: itemsError } = await supabase
          .from("quote_items")
          .insert(quoteItems);

        if (itemsError) throw itemsError;
      }

      return quote;
    } catch (error) {
      console.error("Error creating quote:", error);
      throw error;
    }
  },

  async getQuoteById(id: string) {
    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        client:clients(*),
        quote_items(*),
        project:projects(*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    // Calculate subtotal from quote items
    const subtotal = data.quote_items.reduce((sum, item) => {
      const amount = Number(item.amount) || 0;
      return sum + amount;
    }, 0);

    // Calculate tax using the tax rate
    const taxRate = Number(data.tax_rate) || 0;
    const tax = (subtotal * taxRate) / 100;

    // Update the data with calculated values
    return {
      ...data,
      subtotal_amount: subtotal,
      tax_amount: tax,
      total_amount: subtotal + tax,
    };
  },

  async updateQuote(id: string, quoteData: any) {
    const { data, error } = await supabase
      .from("quotes")
      .update(quoteData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteQuote(id: string) {
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (error) throw error;
  },

  // Invoice operations
  async getInvoices(userId: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select(
        `
        *,
        client:clients(id, name),
        invoice_items:invoice_items(*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createInvoice(invoiceData: any) {
    const { data, error } = await supabase
      .from("invoices")
      .insert([invoiceData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getInvoiceById(id: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select(
        `
        *,
        client:clients(*),
        invoice_items:invoice_items(*)
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateInvoice(id: string, invoiceData: any) {
    const { data, error } = await supabase
      .from("invoices")
      .update(invoiceData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteInvoice(id: string) {
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) throw error;
  },

  // Sales person operations
  async getSalesPersons(userId: string) {
    const { data, error } = await supabase
      .from("sales_persons")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createSalesPerson(salesPersonData: any) {
    const { data, error } = await supabase
      .from("sales_persons")
      .insert([salesPersonData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSalesPerson(id: string, salesPersonData: any) {
    const { data, error } = await supabase
      .from("sales_persons")
      .update(salesPersonData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSalesPerson(id: string) {
    const { error } = await supabase
      .from("sales_persons")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  // Quote number operations
  async getNextQuoteNumber(userId: string) {
    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("quote_number")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (!data || data.length === 0) {
        return "Q-0001";
      }

      const lastQuoteNumber = data[0].quote_number;
      const number = parseInt(lastQuoteNumber.split("-")[1]) + 1;
      return `Q-${number.toString().padStart(4, "0")}`;
    } catch (error) {
      console.error("Error getting next quote number:", error);
      return "Q-0001";
    }
  },

  async sendInvoice(id: string) {
    const invoice = await this.getInvoiceById(id);
    if (!invoice) throw new Error("Invoice not found");

    const { error } = await emailService.sendInvoiceEmail(invoice);
    if (error) throw error;

    await this.updateInvoice(id, { status: "sent" });
  },

  async downloadInvoicePDF(id: string): Promise<Uint8Array> {
    const invoice = await this.getInvoiceById(id);
    if (!invoice) throw new Error("Invoice not found");

    const element = document.getElementById("invoice-pdf");
    if (!element) throw new Error("Invoice PDF element not found");

    const canvas = await html2canvas(element);
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    return pdf.output("arraybuffer");
  },

  async sendQuoteEmail(quoteId: string): Promise<{ id: string }> {
    try {
      // First fetch the complete quote data with client information
      const { data: quote, error: fetchError } = await supabase
        .from("quotes")
        .select(
          `
          *,
          clients:client_id (
            id,
            name,
            email,
            address,
            city,
            state,
            postal_code,
            country
          ),
          quote_items:quote_items (
            id,
            description,
            quantity,
            unit_price,
            tax_rate,
            amount
          )
        `
        )
        .eq("id", quoteId)
        .single();

      if (fetchError) throw fetchError;
      if (!quote) throw new Error("Quote not found");
      if (!quote.clients) throw new Error("Client information not found");
      if (!quote.clients.email) throw new Error("Client email is required");

      // Calculate totals if not already present
      const subtotal = quote.quote_items.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      const tax = subtotal * (quote.tax_rate / 100);
      const total = subtotal + tax;

      // Update quote with calculated values
      const updatedQuote: Quote = {
        ...quote,
        total_amount: total,
        tax_amount: tax,
        quote_items: quote.quote_items,
        clients: quote.clients,
      };

      // Send the email
      const result = await emailService.sendQuoteEmail(updatedQuote);

      // Update quote status to sent
      const { error: updateError } = await supabase
        .from("quotes")
        .update({ status: "sent" })
        .eq("id", quoteId);

      if (updateError) {
        console.error("Failed to update quote status:", updateError);
      }

      return result;
    } catch (error) {
      console.error("Error in sendQuoteEmail:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      throw error;
    }
  },

  // Organization operations
  async getOrganizations() {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createOrganization(organizationData: {
    name: string;
    profile_name: string;
    address: string;
    phone: string;
    email: string;
    user_id: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    tax_id?: string;
    logo_url?: string;
  }) {
    const { data, error } = await supabase
      .from("organizations")
      .insert([organizationData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateOrganization(
    id: string,
    organizationData: {
      name?: string;
      profile_name?: string;
      address?: string;
      phone?: string;
      email?: string;
      city?: string;
      state?: string;
      country?: string;
      postal_code?: string;
      tax_id?: string;
      logo_url?: string;
    }
  ) {
    const { data, error } = await supabase
      .from("organizations")
      .update(organizationData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteOrganization(id: string) {
    const { error } = await supabase
      .from("organizations")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async getOrganizationById(id: string) {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },
};
