-- Create sales_persons table
CREATE TABLE IF NOT EXISTS sales_persons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_sales_persons_user_id ON sales_persons(user_id);
CREATE INDEX idx_sales_persons_email ON sales_persons(email);

-- Enable RLS
ALTER TABLE sales_persons ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own sales persons"
    ON sales_persons FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sales persons"
    ON sales_persons FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sales persons"
    ON sales_persons FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sales persons"
    ON sales_persons FOR DELETE
    USING (auth.uid() = user_id); 