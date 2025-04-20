import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
}

interface ClientSelectProps {
  value: string;
  onChange: (value: string) => void;
  onClientSelect?: (client: Client) => void;
}

export function ClientSelect({
  value,
  onChange,
  onClientSelect,
}: ClientSelectProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleClientSelect = (clientId: string) => {
    onChange(clientId);
    if (onClientSelect) {
      const selectedClient = clients.find((client) => client.id === clientId);
      if (selectedClient) {
        onClientSelect(selectedClient);
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="client">Client</Label>
      <Select value={value} onValueChange={handleClientSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a client" />
        </SelectTrigger>
        <SelectContent>
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : clients.length === 0 ? (
            <SelectItem value="empty" disabled>
              No clients found
            </SelectItem>
          ) : (
            clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
