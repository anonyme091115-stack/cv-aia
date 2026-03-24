-- Remove authentication requirement from cvs table
-- This migration removes the userId column and makes the table public

-- Drop the foreign key constraint if it exists
ALTER TABLE IF EXISTS cvs
  DROP CONSTRAINT IF EXISTS cvs_user_id_fkey CASCADE;

-- Drop the user_id column if it exists
ALTER TABLE IF EXISTS cvs
  DROP COLUMN IF EXISTS user_id;

-- Ensure the table has the correct structure without auth
-- (Assuming the table already exists with these columns)
ALTER TABLE IF EXISTS cvs
  ADD COLUMN IF NOT EXISTS share_id TEXT UNIQUE;

-- Create index on share_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_cvs_share_id ON cvs(share_id);

-- Add updated_at column for tracking changes if not present
ALTER TABLE IF EXISTS cvs
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Disable RLS to make the table public
ALTER TABLE cvs DISABLE ROW LEVEL SECURITY;

-- Drop any existing RLS policies
DROP POLICY IF EXISTS "Users can view their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can insert their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can update their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can delete their own CVs" ON cvs;

-- Enable public access to all CVs (since no auth is required)
CREATE POLICY "Enable read access for all users"
  ON cvs FOR SELECT
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON cvs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
  ON cvs FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for all users"
  ON cvs FOR DELETE
  USING (true);
