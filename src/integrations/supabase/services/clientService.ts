import { supabase } from "../client";
import type { Database } from "@/types/database";

export const clientService = {
  async getClients(): Promise<
    Database["public"]["Tables"]["clients"]["Row"][]
  > {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getClient(
    id: string
  ): Promise<Database["public"]["Tables"]["clients"]["Row"]> {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createClient(
    client: Omit<Database["public"]["Tables"]["clients"]["Insert"], "id">
  ): Promise<Database["public"]["Tables"]["clients"]["Row"]> {
    const { data, error } = await supabase
      .from("clients")
      .insert(client)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateClient(
    id: string,
    client: Partial<Database["public"]["Tables"]["clients"]["Update"]>
  ): Promise<Database["public"]["Tables"]["clients"]["Row"]> {
    const { data, error } = await supabase
      .from("clients")
      .update(client)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteClient(id: string): Promise<void> {
    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) throw error;
  },
};
