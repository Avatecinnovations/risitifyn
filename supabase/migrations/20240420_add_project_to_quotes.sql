-- Add project_id column to quotes table
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE SET NULL;

-- Create index for project_id
CREATE INDEX IF NOT EXISTS quotes_project_id_idx ON quotes(project_id);

-- Update RLS policies to allow project access
CREATE POLICY "Users can view quotes with project access"
    ON quotes FOR SELECT
    USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = quotes.project_id
            AND projects.user_id = auth.uid()
        )
    );

-- Update existing quotes to include project_id if they have a project
UPDATE quotes q
SET project_id = p.id
FROM projects p
WHERE q.client_id = p.client_id
AND q.project_id IS NULL; 