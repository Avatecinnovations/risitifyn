import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { clientService } from "@/integrations/supabase/services/clientService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const NewClient = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    taxId: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to create a client");
      return;
    }

    try {
      const newClient = await clientService.createClient({
        user_id: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.zipCode,
        country: formData.country,
        tax_id: formData.taxId,
        notes: formData.notes,
      });

      toast.success("Client created successfully");
      navigate("/clients");
    } catch (error) {
      console.error("Error creating client:", error);
      toast.error("Failed to create client");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/clients"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">New Client</h1>
          <p className="text-gray-500 mt-1">Add a new client to your system</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="taxId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tax ID
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      id="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Address
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Additional Information
                </h2>
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <Link
                to="/clients"
                className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#0f172a] hover:bg-[#0f172a]/90"
              >
                Create Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewClient;
