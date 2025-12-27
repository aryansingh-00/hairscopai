-- Add UPDATE policy for scalp_scans table
CREATE POLICY "Users can update their own scans" 
ON public.scalp_scans 
FOR UPDATE 
USING (auth.uid() = user_id);