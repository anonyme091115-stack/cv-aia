-- Create cvs table for storing user CV data
CREATE TABLE IF NOT EXISTS public.cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Mon CV',
  template TEXT NOT NULL DEFAULT 'minimal',
  sections JSONB NOT NULL DEFAULT '{"profile":{"name":"","title":"","email":"","phone":"","location":"","linkedin":"","summary":""},"experiences":[],"education":[],"skills":[],"languages":[],"projects":[],"certifications":[]}'::jsonb,
  share_id TEXT UNIQUE,
  ats_score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON public.cvs(user_id);

-- Create index for share_id lookups
CREATE INDEX IF NOT EXISTS idx_cvs_share_id ON public.cvs(share_id) WHERE share_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own CVs
CREATE POLICY "Users can view own CVs" ON public.cvs 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own CVs
CREATE POLICY "Users can insert own CVs" ON public.cvs 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own CVs
CREATE POLICY "Users can update own CVs" ON public.cvs 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own CVs
CREATE POLICY "Users can delete own CVs" ON public.cvs 
  FOR DELETE USING (auth.uid() = user_id);

-- Policy: Anyone can view shared CVs (public pages)
CREATE POLICY "Anyone can view shared CVs" ON public.cvs 
  FOR SELECT USING (share_id IS NOT NULL);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_cvs_updated_at ON public.cvs;
CREATE TRIGGER update_cvs_updated_at
  BEFORE UPDATE ON public.cvs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
