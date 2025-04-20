export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";
export type QuoteStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired";

export interface Invoice {
  id: string;
  user_id: string;
  client_id: string;
  invoice_number: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  total_amount: number;
  tax_amount: number;
  notes?: string;
  terms?: string;
  currency: string;
  language: string;
  payment_terms: string;
  tax_type: string;
  tax_rate: number;
  custom_tax_name?: string;
  template: string;
  created_at: string;
  updated_at: string;
  client?: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

export interface DatabaseQuote {
  id: string;
  user_id: string;
  client_id: string;
  quote_number: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  issue_date: string;
  expiry_date: string;
  total_amount: number;
  notes: string | null;
  terms: string | null;
  created_at: string;
  updated_at: string;
  client?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface Quote {
  id: string;
  user_id: string;
  customer_id: string;
  project_id: string;
  quote_number: string;
  date: string;
  due_date: string;
  subtotal_amount: number;
  tax_amount: number;
  tax_rate: number;
  total_amount: number;
  notes: string;
  terms: string;
  status: QuoteStatus;
  quote_items: QuoteItem[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  amount: number;
  created_at: string;
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      invoices: {
        Row: {
          id: string;
          user_id: string;
          client_id: string;
          invoice_number: string;
          status: "draft" | "sent" | "paid" | "overdue";
          issue_date: string;
          due_date: string;
          total_amount: number;
          tax_amount: number;
          notes: string | null;
          terms: string | null;
          created_at: string;
          updated_at: string;
          client?: {
            id: string;
            name: string;
            email: string;
            phone: string;
            address: string;
          };
        };
        Insert: Omit<
          Database["public"]["Tables"]["invoices"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>;
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          amount: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["invoice_items"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["invoice_items"]["Insert"]
        >;
      };
      quotes: {
        Row: {
          id: string;
          user_id: string;
          client_id: string;
          quote_number: string;
          status: "draft" | "sent" | "accepted" | "rejected";
          issue_date: string;
          expiry_date: string;
          total_amount: number;
          notes: string | null;
          terms: string | null;
          created_at: string;
          updated_at: string;
          client?: {
            id: string;
            name: string;
            email: string;
            phone: string;
            address: string;
          };
        };
        Insert: Omit<
          Database["public"]["Tables"]["quotes"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["quotes"]["Insert"]>;
      };
      quote_items: {
        Row: {
          id: string;
          quote_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          amount: number;
        };
        Insert: Omit<Database["public"]["Tables"]["quote_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["quote_items"]["Insert"]>;
      };
      sales_persons: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["sales_persons"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["sales_persons"]["Insert"]
        >;
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["clients"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      invoice_settings: {
        Row: {
          id: string;
          user_id: string;
          company_name: string;
          company_address: string;
          company_phone: string;
          company_email: string;
          tax_id: string;
          bank_details: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["invoice_settings"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["invoice_settings"]["Insert"]
        >;
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string;
          client_id: string;
          sales_person_id: string;
          status: "active" | "completed" | "on_hold";
          start_date: string;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["projects"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type InvoiceSettings =
  Database["public"]["Tables"]["invoice_settings"]["Row"];
