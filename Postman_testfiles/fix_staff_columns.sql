-- ============================================================================
-- DIAGNOSTIC SCRIPT - Check Staff Table Column Names
-- ============================================================================
-- Run this first to see what columns actually exist in your staff table

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'staff' 
ORDER BY ordinal_position;

-- ============================================================================
-- Based on the results above, use one of the INSERT statements below:
-- ============================================================================

-- IF columns are: fullName, phoneNumber (camelCase) - Use this:
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

-- IF columns are: full_name, phone_number (snake_case) - Use this:
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
-- ALTERNATIVE: Let TypeORM create the staff record via API
-- ============================================================================
-- Instead of SQL, you can create staff via the API endpoint:
-- 
-- POST http://localhost:3000/tenant-admin/tenant-users
-- (as TenantAdmin)
-- {
--   "email": "staff@test.com",
--   "password": "Password@123",
--   "fullName": "Staff Member",
--   "status": "active"
-- }
--
-- This will automatically create:
-- 1. UserEntity
-- 2. TenantUserEntity (role='staff')
-- 3. StaffEntity (with correct column names)
--
-- ============================================================================

