-- Create enum types
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE quote_status AS ENUM ('draft', 'sent', 'accepted', 'rejected', 'expired');

-- Create invoices table
CREATE TABLE invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    invoice_number VARCHAR(50) NOT NULL,
    status invoice_status DEFAULT 'draft',
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    terms TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create quotes table
CREATE TABLE quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    quote_number VARCHAR(50) NOT NULL,
    status quote_status DEFAULT 'draft',
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    terms TEXT,
    payment_terms TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create invoice_items table
CREATE TABLE invoice_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create quote_items table
CREATE TABLE quote_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_quotes_user_id ON quotes(user_id);
CREATE INDEX idx_quotes_client_id ON quotes(client_id);
CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX idx_quote_items_quote_id ON quote_items(quote_id);

-- Create RLS policies
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

-- Policies for invoices
CREATE POLICY "Users can view their own invoices"
    ON invoices FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own invoices"
    ON invoices FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices"
    ON invoices FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices"
    ON invoices FOR DELETE
    USING (auth.uid() = user_id);

-- Policies for quotes
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

-- Policies for invoice_items
CREATE POLICY "Users can view their own invoice items"
    ON invoice_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM invoices
        WHERE invoices.id = invoice_items.invoice_id
        AND invoices.user_id = auth.uid()
    ));

CREATE POLICY "Users can create their own invoice items"
    ON invoice_items FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM invoices
        WHERE invoices.id = invoice_items.invoice_id
        AND invoices.user_id = auth.uid()
    ));

CREATE POLICY "Users can update their own invoice items"
    ON invoice_items FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM invoices
        WHERE invoices.id = invoice_items.invoice_id
        AND invoices.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete their own invoice items"
    ON invoice_items FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM invoices
        WHERE invoices.id = invoice_items.invoice_id
        AND invoices.user_id = auth.uid()
    ));

-- Policies for quote_items
CREATE POLICY "Users can view their own quote items"
    ON quote_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    ));

CREATE POLICY "Users can create their own quote items"
    ON quote_items FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    ));

CREATE POLICY "Users can update their own quote items"
    ON quote_items FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete their own quote items"
    ON quote_items FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM quotes
        WHERE quotes.id = quote_items.quote_id
        AND quotes.user_id = auth.uid()
    )); 