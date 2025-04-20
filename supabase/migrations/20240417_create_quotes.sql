-- Create quotes table
CREATE TABLE quotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    quote_number VARCHAR(255) NOT NULL,
    reference VARCHAR(255),
    quote_date DATE NOT NULL,
    expiry_date DATE,
    salesperson_id UUID REFERENCES sales_persons(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    subject TEXT,
    payment_type VARCHAR(50) CHECK (payment_type IN ('full', 'partial')),
    pdf_template VARCHAR(255) DEFAULT 'Standard Template',
    status VARCHAR(50) CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
    sub_total DECIMAL(10, 2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create quotes_items table for line items
CREATE TABLE quote_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    details TEXT NOT NULL,
    quantity DECIMAL(10, 2) DEFAULT 1.00,
    rate DECIMAL(10, 2) DEFAULT 0.00,
    tax VARCHAR(50),
    amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX quotes_user_id_idx ON quotes(user_id);
CREATE INDEX quotes_customer_id_idx ON quotes(customer_id);
CREATE INDEX quotes_salesperson_id_idx ON quotes(salesperson_id);
CREATE INDEX quotes_project_id_idx ON quotes(project_id);
CREATE INDEX quote_items_quote_id_idx ON quote_items(quote_id);

-- Enable Row Level Security
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own quotes"
    ON quotes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quotes"
    ON quotes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quotes"
    ON quotes FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quotes"
    ON quotes FOR DELETE
    USING (auth.uid() = user_id);

-- Quote items policies
CREATE POLICY "Users can view their quote items"
    ON quote_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    ));

CREATE POLICY "Users can create quote items"
    ON quote_items FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    ));

CREATE POLICY "Users can update their quote items"
    ON quote_items FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete their quote items"
    ON quote_items FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    )); 