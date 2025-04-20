import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/types/database";

type InvoiceSettings = Database["public"]["Tables"]["invoice_settings"]["Row"];
type InvoiceSettingsInsert =
  Database["public"]["Tables"]["invoice_settings"]["Insert"];

class InvoiceSettingsService {
  async getSettings(userId: string): Promise<InvoiceSettings | null> {
    try {
      const { data, error } = await supabase
        .from("invoice_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching settings:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in getSettings:", error);
      return null;
    }
  }

  async getOrCreateSettings(userId: string): Promise<InvoiceSettings> {
    try {
      console.log("Getting or creating settings for user:", userId);

      // For admin users, return mock settings
      if (userId === "admin-user") {
        return {
          id: "00000000-0000-0000-0000-000000000000",
          user_id: "admin-user",
          currency: "USD",
          language: "English",
          tax_type: "none",
          tax_rate: 0,
          payment_terms: "net_30",
          template: "standard",
          auto_reminders: true,
          late_payment_fee: true,
          late_fee_percentage: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      const existingSettings = await this.getSettings(userId);
      if (existingSettings) {
        console.log("Found existing settings");
        return existingSettings;
      }

      console.log("No existing settings found, creating default settings");
      const defaultSettings: Omit<
        InvoiceSettingsInsert,
        "id" | "created_at" | "updated_at"
      > = {
        user_id: userId,
        currency: "USD",
        language: "English",
        tax_type: "none",
        tax_rate: 0,
        payment_terms: "net_30",
        template: "standard",
        auto_reminders: true,
        late_payment_fee: true,
        late_fee_percentage: 5,
      };

      return await this.createSettings(defaultSettings);
    } catch (error) {
      console.error("Error in getOrCreateSettings:", error);
      throw new Error("Failed to get or create invoice settings");
    }
  }

  async createSettings(
    settings: Omit<InvoiceSettingsInsert, "id" | "created_at" | "updated_at">
  ): Promise<InvoiceSettings> {
    try {
      const { data, error } = await supabase
        .from("invoice_settings")
        .insert(settings)
        .select()
        .single();

      if (error) {
        console.error("Error creating settings:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in createSettings:", error);
      throw new Error("Failed to create invoice settings");
    }
  }

  async updateSettings(
    userId: string,
    settings: Partial<InvoiceSettings>
  ): Promise<InvoiceSettings> {
    try {
      const { data, error } = await supabase
        .from("invoice_settings")
        .update(settings)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        console.error("Error updating settings:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in updateSettings:", error);
      throw new Error("Failed to update invoice settings");
    }
  }
}

export const invoiceSettingsService = new InvoiceSettingsService();
