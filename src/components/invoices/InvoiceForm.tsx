import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Settings,
  AlertCircle,
  Building,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import InvoiceItems from "./InvoiceItems";
import InvoiceSettings from "./InvoiceSettings";
import RecurringToggle from "./RecurringToggle";
import ScheduleInvoice from "./ScheduleInvoice";
import PaymentMethods from "./PaymentMethods";
import { clientService } from "@/integrations/supabase/services/clientService";
import { invoiceService } from "@/services/invoiceService";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { invoiceSettingsService } from "@/services/invoiceSettingsService";
import { formatCurrency, formatDate } from "@/lib/utils";
import InvoicePreview from "./InvoicePreview";

interface FormData {
  client_id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  status: "draft" | "pending" | "paid" | "overdue" | "cancelled";
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
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
  }>;
}

type Client = Database["public"]["Tables"]["clients"]["Row"];
type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type InvoiceItem = Database["public"]["Tables"]["invoice_items"]["Row"];
type InvoiceSettings = Database["public"]["Tables"]["invoice_settings"]["Row"];

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [items, setItems] = useState<FormData["items"]>([]);
  const [formData, setFormData] = useState<FormData>({
    client_id: "",
    invoice_number: "",
    issue_date: "",
    due_date: "",
    status: "draft",
    total_amount: 0,
    tax_amount: 0,
    notes: "",
    terms: "",
    currency: "USD",
    language: "en",
    payment_terms: "30",
    tax_type: "percentage",
    tax_rate: 0,
    custom_tax_name: "",
    template: "standard",
    items: [],
  });
  // ... existing code ...
};

export default InvoiceForm;
