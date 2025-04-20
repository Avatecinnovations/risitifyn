import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/types/database";

export type Client = Database["public"]["Tables"]["clients"]["Row"];

export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const createClient = async (
  clientData: Omit<
    Client,
    "id" | "created_at" | "updated_at" | "total_invoices"
  >
): Promise<Client> => {
  const { data, error } = await supabase
    .from("clients")
    .insert([clientData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateClient = async (
  id: string,
  clientData: Partial<Omit<Client, "id" | "created_at" | "updated_at">>
): Promise<Client> => {
  const { data, error } = await supabase
    .from("clients")
    .update(clientData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteClient = async (id: string): Promise<void> => {
  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
