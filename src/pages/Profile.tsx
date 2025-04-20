import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    businessName: user?.businessName || "",
    currency: user?.currency || "",
    industry: user?.industry || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    postal_code: user?.postal_code || "",
    country: user?.country || "",
    website: user?.website || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        currency: formData.currency,
        industry: formData.industry,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postal_code,
        country: formData.country,
        website: formData.website,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return <div>{/* Render your form here */}</div>;
};

export default Profile;
