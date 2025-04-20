-- Create organizations table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    tax_id TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Policy for selecting organizations (users can only see their own organizations)
CREATE POLICY "Users can view their own organizations"
    ON public.organizations
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy for inserting organizations (users can create organizations)
CREATE POLICY "Users can create organizations"
    ON public.organizations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for updating organizations (users can update their own organizations)
CREATE POLICY "Users can update their own organizations"
    ON public.organizations
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy for deleting organizations (users can delete their own organizations)
CREATE POLICY "Users can delete their own organizations"
    ON public.organizations
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create index on user_id for better performance
CREATE INDEX IF NOT EXISTS organizations_user_id_idx ON public.organizations(user_id); 