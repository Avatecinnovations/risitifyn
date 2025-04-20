export interface InvoiceSettings {
  id: string;
  user_id: string;
  currency: string;
  language: string;
  tax_type: string;
  tax_rate: number;
  custom_tax_name: string | null;
  payment_terms: string;
  template: string;
  auto_reminders: boolean;
  late_payment_fee: boolean;
  late_fee_percentage: number;
  created_at: string;
  updated_at: string;
}

export type InvoiceSettingsUpdate = Partial<
  Omit<InvoiceSettings, "id" | "user_id" | "created_at" | "updated_at">
>;
