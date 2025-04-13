-- Enable Row Level Security for contact_messages table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert into contact_messages
DROP POLICY IF EXISTS "Allow public inserts" ON contact_messages;
CREATE POLICY "Allow public inserts"
ON contact_messages
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow authenticated users to select from contact_messages
DROP POLICY IF EXISTS "Allow authenticated selects" ON contact_messages;
CREATE POLICY "Allow authenticated selects"
ON contact_messages
FOR SELECT
TO authenticated
USING (true);
