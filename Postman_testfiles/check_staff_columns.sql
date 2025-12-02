-- Quick script to check actual column names in staff table
-- Run this first to see what columns actually exist

\d staff

-- Or use this query to get column names:
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'staff' 
ORDER BY ordinal_position;

