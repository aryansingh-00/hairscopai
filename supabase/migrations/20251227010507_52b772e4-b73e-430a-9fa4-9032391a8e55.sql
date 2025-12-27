-- Create storage bucket for scalp images
INSERT INTO storage.buckets (id, name, public)
VALUES ('scalp-images', 'scalp-images', false);

-- Policy: Users can upload their own images
CREATE POLICY "Users can upload their own scalp images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'scalp-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can view their own images
CREATE POLICY "Users can view their own scalp images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'scalp-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own images
CREATE POLICY "Users can delete their own scalp images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'scalp-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);