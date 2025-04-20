import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { clientService } from "@/integrations/supabase/services/clientService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/database";

type Client = Database["public"]["Tables"]["clients"]["Row"] & {
  current: number;
  overdue_30: number;
  overdue_60: number;
  overdue_90: number;
  overdue_120: number;
};

const AgedBalance = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgedBalance = async () => {
      if (!user) return;

      try {
        const data = await clientService.getClients();
        // TODO: Calculate aging amounts for each client
        const clientsWithAging = data.map((client) => ({
          ...client,
          current: 0,
          overdue_30: 0,
          overdue_60: 0,
          overdue_90: 0,
          overdue_120: 0,
        }));
        setClients(clientsWithAging);
      } catch (error) {
        console.error("Error fetching aged balance:", error);
        toast.error("Failed to load aged balance");
      } finally {
        setLoading(false);
      }
    };

    fetchAgedBalance();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/clients"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Aged Balance
          </h1>
          <p className="text-gray-500 mt-1">View client aging reports</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    1-30 Days
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    31-60 Days
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    61-90 Days
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    90+ Days
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {client.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      ${client.current.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      ${client.overdue_30.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      ${client.overdue_60.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      ${client.overdue_90.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      ${client.overdue_120.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      $
                      {(
                        client.current +
                        client.overdue_30 +
                        client.overdue_60 +
                        client.overdue_90 +
                        client.overdue_120
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgedBalance;
