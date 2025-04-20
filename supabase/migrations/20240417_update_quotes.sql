-- Add currency column to quotes table
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'USD'; 