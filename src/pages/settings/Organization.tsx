import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, ArrowLeft, Upload } from "lucide-react";
import { invoiceService } from "@/services/invoiceService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface OrganizationData {
  name: string;
  profile_name: string;
  address: string;
  phone: string;
  email: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  logo_url?: string;
}

const Organization = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OrganizationData>({
    name: "",
    profile_name: "",
    address: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    tax_id: "",
    logo_url: "",
  });

  useEffect(() => {
    if (id) {
      fetchOrganization();
    }
  }, [id]);

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getOrganizationById(id!);
      setFormData({
        name: data.name,
        profile_name: data.profile_name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        city: data.city,
        state: data.state,
        country: data.country,
        postal_code: data.postal_code,
        tax_id: data.tax_id,
        logo_url: data.logo_url,
      });
    } catch (error) {
      console.error("Error fetching organization:", error);
      toast.error("Failed to load organization");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      // TODO: Implement file upload to storage
      // const { data, error } = await supabase.storage
      //   .from('organization-logos')
      //   .upload(`${id}/${file.name}`, file);

      // if (error) throw error;
      // setFormData(prev => ({ ...prev, logo_url: data.path }));
      toast.success("Logo uploaded successfully");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      if (id) {
        await invoiceService.updateOrganization(id, formData);
        toast.success("Organization updated successfully");
      } else {
        await invoiceService.createOrganization({
          ...formData,
          user_id: user.id,
        });
        toast.success("Organization created successfully");
      }
      navigate("/settings/organizations");
    } catch (error) {
      console.error("Error saving organization:", error);
      toast.error("Failed to save organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/settings/organizations")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {id ? "Edit Organization" : "New Organization"}
          </h1>
          <p className="text-muted-foreground">
            {id
              ? "Update your organization details"
              : "Create a new organization for your business"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Profile Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter profile name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile_name">Organization Name</Label>
            <Input
              id="profile_name"
              name="profile_name"
              value={formData.profile_name}
              onChange={handleChange}
              placeholder="Enter organization name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state/province"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postal_code">Postal Code</Label>
            <Input
              id="postal_code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              placeholder="Enter postal code"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax_id">Registration Number (RC/BN)</Label>
            <Input
              id="tax_id"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleChange}
              placeholder="Enter registration number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("logo")?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Logo
              </Button>
              {formData.logo_url && (
                <img
                  src={formData.logo_url}
                  alt="Organization logo"
                  className="h-8 w-8 rounded-full"
                />
              )}
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter organization address"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/settings/organizations")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : id
                ? "Update Organization"
                : "Create Organization"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Organization;
