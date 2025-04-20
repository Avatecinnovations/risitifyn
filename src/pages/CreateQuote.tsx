import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ClientSelect } from "@/components/quotes/ClientSelect";
import { ProjectSelect } from "@/components/quotes/ProjectSelect";
import { Quote, QuoteItem, QuoteStatus } from "@/types/database";
import { Search, Plus, X, Info, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { invoiceService } from "@/services/invoiceService";

interface CreateQuoteFormData {
  client_id: string;
  project_id: string;
  quote_number: string;
  issue_date: string;
  expiry_date: string;
  payment_terms: string;
  notes: string;
  terms: string;
  tax_rate: number;
  tax_type: string;
  currency: string;
  payment_type: "full" | "partial";
  payment_percentage: number;
  subtotal_amount: number;
  tax_amount: number;
  total_amount: number;
}

interface QuoteItemData extends QuoteItem {}

interface TaxSettings {
  tax_type: string;
  tax_rate: number;
  custom_tax_name?: string;
}

const CreateQuote = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [taxSettings, setTaxSettings] = useState<TaxSettings | null>(null);
  const [showCustomTax, setShowCustomTax] = useState(false);
  const [quoteItems, setQuoteItems] = useState<QuoteItemData[]>([
    { description: "", quantity: 1, unit_price: 0, amount: 0 },
  ]);
  const [quoteNumber, setQuoteNumber] = useState("");

  const [formData, setFormData] = useState<CreateQuoteFormData>({
    client_id: "",
    project_id: "",
    quote_number: "",
    issue_date: new Date().toISOString().split("T")[0],
    expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    payment_terms: "30",
    notes: "",
    terms: "",
    tax_rate: 0,
    tax_type: "none",
    currency: "USD",
    payment_type: "full",
    payment_percentage: 100,
    subtotal_amount: 0,
    tax_amount: 0,
    total_amount: 0,
  });

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "NGN", symbol: "₦" },
    { code: "INR", symbol: "₹" },
  ];

  const taxRates = [
    { value: 0, label: "0%" },
    { value: 5, label: "5%" },
    { value: 10, label: "10%" },
    { value: 15, label: "15%" },
    { value: 20, label: "20%" },
    { value: "custom", label: "Custom" },
  ];

  useEffect(() => {
    generateQuoteNumber();
    fetchClients();
    fetchTaxSettings();
  }, []);

  const generateQuoteNumber = () => {
    const prefix = "QT";
    const randomNum = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const date = new Date().toISOString().slice(2, 4); // YY format
    setQuoteNumber(`${prefix}${date}${randomNum}`);
  };

  const fetchTaxSettings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      const { data, error } = await supabase
        .from("invoice_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      if (!data) {
        // Create default settings if none exist
        const { data: newSettings, error: createError } = await supabase
          .from("invoice_settings")
          .insert([
            {
              user_id: user.id,
              currency: "USD",
              language: "English",
              tax_type: "none",
              tax_rate: 0,
              payment_terms: "net_30",
              template: "standard",
              auto_reminders: true,
              late_payment_fee: true,
              late_fee_percentage: 5,
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        setTaxSettings(newSettings);
      } else {
        setTaxSettings(data);
      }

      // Set default tax rate from settings
      if (data?.tax_rate) {
        setFormData((prev) => ({
          ...prev,
          tax_rate: data.tax_rate,
          tax_type: data.tax_type || "none",
        }));
      }
    } catch (error) {
      console.error("Error fetching tax settings:", error);
      toast.error("Failed to fetch tax settings. Please try again later.");
    }
  };

  const handleTaxTypeChange = (value: string) => {
    setShowCustomTax(value === "custom");

    let taxRate = 0;
    if (value === "none") {
      taxRate = 0;
    } else if (value === "standard" && taxSettings) {
      taxRate = taxSettings.tax_rate;
    } else if (value === "custom") {
      taxRate = formData.tax_rate;
    }

    // Calculate new amounts
    const subtotal = quoteItems.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;

    setFormData((prev) => ({
      ...prev,
      tax_type: value,
      tax_rate: taxRate,
      subtotal_amount: subtotal,
      tax_amount: taxAmount,
      total_amount: total,
    }));
  };

  const fetchClients = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("No authenticated user found");
      }

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to fetch clients");
    }
  };

  const fetchProjects = async (clientId: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("No authenticated user found");
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .eq("client_id", clientId)
        .order("name", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    }
  };

  const handleClientChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      client_id: value,
      project_id: "", // Reset project when client changes
    }));
    if (value) {
      fetchProjects(value);
    } else {
      setProjects([]);
    }
  };

  const calculateItemAmount = (item: QuoteItemData) => {
    return item.quantity * item.unit_price;
  };

  const handleItemChange = (
    index: number,
    field: keyof QuoteItemData,
    value: string | number
  ) => {
    const newItems = [...quoteItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };

    // Recalculate amount for the changed item
    newItems[index].amount = calculateItemAmount(newItems[index]);

    setQuoteItems(newItems);

    // Calculate subtotal
    const subtotal = newItems.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );

    // Calculate tax amount
    const taxAmount = subtotal * (formData.tax_rate / 100);

    // Calculate total
    const total = subtotal + taxAmount;

    // Update form data with new amounts
    setFormData((prev) => ({
      ...prev,
      subtotal_amount: subtotal,
      tax_amount: taxAmount,
      total_amount: total,
    }));
  };

  const addItem = () => {
    setQuoteItems([
      ...quoteItems,
      { description: "", quantity: 1, unit_price: 0, amount: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    const newItems = quoteItems.filter((_, i) => i !== index);
    setQuoteItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: quote, error } = await supabase
        .from("quotes")
        .insert([
          {
            user_id: user?.id,
            client_id: formData.client_id,
            quote_number: quoteNumber,
            status: "draft",
            issue_date: formData.issue_date,
            expiry_date: formData.expiry_date,
            total_amount: formData.total_amount,
            tax_amount: formData.tax_amount,
            notes: formData.notes,
            terms: formData.terms,
            payment_terms: formData.payment_terms,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Insert quote items
      if (quoteItems.length > 0) {
        const { error: itemsError } = await supabase.from("quote_items").insert(
          quoteItems.map((item) => ({
            quote_id: quote.id,
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
            tax_rate: formData.tax_rate,
            amount: item.amount,
          }))
        );

        if (itemsError) throw itemsError;
      }

      toast.success("Quote created successfully");
      navigate("/quotes");
    } catch (error) {
      console.error("Error creating quote:", error);
      toast.error("Failed to create quote");
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = () => {
    return currencies.find((c) => c.code === formData.currency)?.symbol || "$";
  };

  const handleProjectSelect = (project: any) => {
    setFormData((prev) => ({
      ...prev,
      project_id: project.id,
      project_name: project.name,
      description: project.description || "",
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Quote</h1>
        <p className="text-muted-foreground">
          Create a new quote for your client
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="quote_number">Quote Number</Label>
              <Input
                id="quote_number"
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="client">Client</Label>
              <ClientSelect
                value={formData.client_id}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, client_id: value }))
                }
              />
            </div>

            <div>
              <ProjectSelect
                value={formData.project_id}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, project_id: value }))
                }
                onProjectSelect={handleProjectSelect}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="issue_date">Issue Date</Label>
              <Input
                type="date"
                id="issue_date"
                value={formData.issue_date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    issue_date: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                type="date"
                id="expiry_date"
                value={formData.expiry_date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expiry_date: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, currency: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} ({currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="terms">Terms</Label>
              <Textarea
                id="terms"
                value={formData.terms}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, terms: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="payment_type">Payment Type</Label>
              <Select
                value={formData.payment_type}
                onValueChange={(value: "full" | "partial") =>
                  setFormData((prev) => ({
                    ...prev,
                    payment_type: value,
                    payment_percentage: value === "full" ? 100 : 50,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Payment</SelectItem>
                  <SelectItem value="partial">Partial Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.payment_type === "partial" && (
              <div>
                <Label htmlFor="payment_percentage">Payment Percentage</Label>
                <Input
                  type="number"
                  id="payment_percentage"
                  min="0"
                  max="100"
                  value={formData.payment_percentage}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      payment_percentage: Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}

            <div>
              <Label htmlFor="tax">Tax</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.tax_type}
                  onValueChange={handleTaxTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Tax (0%)</SelectItem>
                    <SelectItem value="standard">
                      Standard ({taxSettings?.tax_rate || 0}%)
                    </SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                {showCustomTax && (
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.tax_rate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tax_rate: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-24"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {quoteItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-5">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Unit Price"
                      value={item.unit_price}
                      onChange={(e) =>
                        handleItemChange(index, "unit_price", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.amount}
                      disabled
                      className="text-right"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addItem}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span>
                  {getCurrencySymbol()}
                  {formData.subtotal_amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tax ({formData.tax_rate}%):</span>
                <span>
                  {getCurrencySymbol()}
                  {formData.tax_amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {getCurrencySymbol()}
                  {formData.total_amount.toFixed(2)}
                </span>
              </div>
              {formData.payment_type === "partial" && (
                <div className="flex justify-between text-lg font-bold">
                  <span>Initial Payment ({formData.payment_percentage}%):</span>
                  <span>
                    {getCurrencySymbol()}
                    {(
                      (formData.total_amount * formData.payment_percentage) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="submit" className="w-32" disabled={loading}>
            {loading ? "Creating..." : "Create Quote"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuote;
