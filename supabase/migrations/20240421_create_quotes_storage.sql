-- Create the quotes storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('quotes', 'quotes', true);

-- Create storage policies for the quotes bucket
CREATE POLICY "Allow authenticated users to upload quotes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'quotes' AND
  auth.uid() = (storage.foldername(name))[1]::uuid
);

CREATE POLICY "Allow public access to quotes for 1 hour"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'quotes' AND
  (storage.foldername(name))[1]::uuid = auth.uid() AND
  created_at > NOW() - INTERVAL '1 hour'
);

CREATE POLICY "Allow users to delete their own quotes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'quotes' AND
  auth.uid() = (storage.foldername(name))[1]::uuid
); 