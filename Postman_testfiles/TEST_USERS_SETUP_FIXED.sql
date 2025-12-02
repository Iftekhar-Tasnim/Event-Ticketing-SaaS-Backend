-- ============================================================================
-- TEST USERS SETUP SCRIPT - FIXED VERSION
-- This version tries both camelCase and snake_case column names
-- ============================================================================

-- First, let's check what columns actually exist
-- Run this query to see the actual column names:
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'staff' ORDER BY ordinal_position;

-- ============================================================================
-- OPTION 1: If columns are camelCase (fullName, phoneNumber)
-- ============================================================================

-- Uncomment this section if your columns are camelCase:

/*
INSERT INTO staff (id, tenant_id, user_id, "fullName", position, "phoneNumber", gender, is_active, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    t.id,
    u.id,
    'Staff Member',
    'CHECKER',
    '+1234567890',
    'MALE',
    true,
    NOW(),
    NOW()
FROM tenants t, users u
WHERE t.slug = 'test-tenant' AND u.email = 'staff@test.com'
ON CONFLICT (tenant_id, user_id) DO UPDATE SET
    "fullName" = EXCLUDED."fullName",
    position = EXCLUDED.position,
    "phoneNumber" = EXCLUDED."phoneNumber",
    gender = EXCLUDED.gender,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();
*/

-- ============================================================================
-- OPTION 2: If columns are snake_case (full_name, phone_number)
-- ============================================================================

-- Uncomment this section if your columns are snake_case:

/*
INSERT INTO staff (id, tenant_id, user_id, full_name, position, phone_number, gender, is_active, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    t.id,
    u.id,
    'Staff Member',
    'CHECKER',
    '+1234567890',
    'MALE',
    true,
    NOW(),
    NOW()
FROM tenants t, users u
WHERE t.slug = 'test-tenant' AND u.email = 'staff@test.com'
ON CONFLICT (tenant_id, user_id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    position = EXCLUDED.position,
    phone_number = EXCLUDED.phone_number,
    gender = EXCLUDED.gender,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();
*/

-- ============================================================================
-- QUICK FIX: Use this query to determine column names first
-- ============================================================================

SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'staff' 
ORDER BY ordinal_position;

-- After running the above query, use the correct column names in the INSERT statements below:

