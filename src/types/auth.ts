export interface ExtendedUser {
  id: string;
  email: string;
  businessName?: string;
  company_name?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
  user_metadata?: {
    businessName?: string;
    company_name?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    phone?: string;
    website?: string;
    logo_url?: string;
    industry?: string;
    currency?: string;
  };
}
