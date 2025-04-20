-- Drop existing RLS policies if they exist
DROP POLICY IF EXISTS "Users can view their own invoice settings" ON invoice_settings;
DROP POLICY IF EXISTS "Users can create their own invoice settings" ON invoice_settings;
DROP POLICY IF EXISTS "Users can update their own invoice settings" ON invoice_settings;
DROP POLICY IF EXISTS "Users can delete their own invoice settings" ON invoice_settings;

-- Create invoice_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS invoice_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    currency VARCHAR(3) DEFAULT 'USD',
    language VARCHAR(20) DEFAULT 'English',
    tax_type VARCHAR(20) DEFAULT 'none',
    tax_rate DECIMAL(5,2) DEFAULT 0,
    custom_tax_name VARCHAR(50),
    payment_terms VARCHAR(20) DEFAULT 'net_30',
    template VARCHAR(20) DEFAULT 'standard',
    auto_reminders BOOLEAN DEFAULT true,
    late_payment_fee BOOLEAN DEFAULT true,
    late_fee_percentage DECIMAL(5,2) DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE invoice_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own invoice settings"
    ON invoice_settings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own invoice settings"
    ON invoice_settings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoice settings"
    ON invoice_settings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoice settings"
    ON invoice_settings FOR DELETE
    USING (auth.uid() = user_id); 