-- ============================================================================
-- TEST USERS SETUP SCRIPT
-- Event Ticketing System - Database Seed Data
-- ============================================================================
-- 
-- This script creates test users for Postman API testing:
-- 1. Platform Admin user
-- 2. Tenant (test organization)
-- 3. TenantAdmin user (linked to tenant)
-- 4. Staff user (linked to tenant)
--
-- IMPORTANT: 
-- - Run this script on your PostgreSQL database
-- - Default password for all users: "Password@123"
-- - Bcrypt hash rounds: 10
-- - All passwords meet requirements: 8+ chars, uppercase, lowercase, number, special char
--
-- TROUBLESHOOTING:
-- If you get column name errors for the staff table, first check the actual column names:
--   SELECT column_name FROM information_schema.columns WHERE table_name = 'staff' ORDER BY ordinal_position;
-- Then update the INSERT statements below to match your actual column names.
--
-- ============================================================================

-- Clear existing test data (optional - uncomment if you want to reset)
-- DELETE FROM activity_logs WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%@test.com' OR email = 'admin@platform.com');
-- DELETE FROM staff WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%@test.com');
-- DELETE FROM tenant_users WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%@test.com');
-- DELETE FROM users WHERE email LIKE '%@test.com' OR email = 'admin@platform.com';
-- DELETE FROM tenants WHERE slug = 'test-tenant';

-- ============================================================================
-- 1. CREATE PLATFORM ADMIN USER
-- ============================================================================
-- Email: admin@platform.com
-- Password: Admin@123
-- Role: Platform Admin (isPlatformAdmin = true)

INSERT INTO users (id, email, password_hash, full_name, is_platform_admin, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'admin@platform.com',
    '$2b$10$YOUR_HASH_HERE', -- TODO: Replace with actual bcrypt hash for "Admin@123"
    'Platform Administrator',
    true,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    is_platform_admin = EXCLUDED.is_platform_admin,
    updated_at = NOW();

-- ============================================================================
-- 2. CREATE TEST TENANT
-- ============================================================================
-- Name: Test Event Company
-- Slug: test-tenant
-- Status: active

INSERT INTO tenants (id, name, slug, branding_settings, status, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'Test Event Company',
    'test-tenant',
    '{"logo": "https://example.com/logo.png", "primaryColor": "#FF5733", "secondaryColor": "#33FF57"}'::jsonb,
    'active',
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    branding_settings = EXCLUDED.branding_settings,
    status = EXCLUDED.status,
    updated_at = NOW();

-- ============================================================================
-- 3. CREATE TENANT ADMIN USER
-- ============================================================================
-- Email: tenantadmin@test.com
-- Password: Password@123
-- Role: TenantAdmin (linked to test-tenant)

-- First, create the user
INSERT INTO users (id, email, password_hash, full_name, is_platform_admin, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'tenantadmin@test.com',
    '$2b$10$YOUR_HASH_HERE', -- TODO: Replace with actual bcrypt hash for "Password@123"
    'Tenant Admin User',
    false,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- Then, link user to tenant as TenantAdmin
INSERT INTO tenant_users (id, tenant_id, user_id, role, status, invited_at, created_at)
SELECT 
    gen_random_uuid(),
    t.id,
    u.id,
    'TenantAdmin',
    'active',
    NOW(),
    NOW()
FROM tenants t, users u
WHERE t.slug = 'test-tenant' AND u.email = 'tenantadmin@test.com'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 4. CREATE STAFF USER
-- ============================================================================
-- Email: staff@test.com
-- Password: Password@123
-- Role: staff (linked to test-tenant)
-- Position: CHECKER

-- First, create the user
INSERT INTO users (id, email, password_hash, full_name, is_platform_admin, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'staff@test.com',
    '$2b$10$YOUR_HASH_HERE', -- TODO: Replace with actual bcrypt hash for "Password@123"
    'Staff Member',
    false,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- Then, link user to tenant as staff
INSERT INTO tenant_users (id, tenant_id, user_id, role, status, invited_at, created_at)
SELECT 
    gen_random_uuid(),
    t.id,
    u.id,
    'staff',
    'active',
    NOW(),
    NOW()
FROM tenants t, users u
WHERE t.slug = 'test-tenant' AND u.email = 'staff@test.com'
ON CONFLICT DO NOTHING;

-- Finally, create staff record
-- IMPORTANT: If you get column name errors, first run this query to check actual column names:
--   SELECT column_name FROM information_schema.columns WHERE table_name = 'staff' ORDER BY ordinal_position;
-- Then update the column names below to match your actual schema.
-- 
-- Common column name patterns:
-- - camelCase: "fullName", "phoneNumber" (use double quotes)
-- - snake_case: full_name, phone_number (no quotes needed)
--
-- If errors persist, use the API endpoint instead (see QUICK_SETUP_GUIDE.txt)
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

-- ============================================================================
-- 5. CREATE ADDITIONAL STAFF USER (SUPERVISOR)
-- ============================================================================
-- Email: supervisor@test.com
-- Password: Password@123
-- Role: staff (linked to test-tenant)
-- Position: SUPERVISOR

INSERT INTO users (id, email, password_hash, full_name, is_platform_admin, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'supervisor@test.com',
    '$2b$10$YOUR_HASH_HERE', -- TODO: Replace with actual bcrypt hash for "Password@123"
    'Supervisor Staff',
    false,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

INSERT INTO tenant_users (id, tenant_id, user_id, role, status, invited_at, created_at)
SELECT 
    gen_random_uuid(),
    t.id,
    u.id,
    'staff',
    'active',
    NOW(),
    NOW()
FROM tenants t, users u
WHERE t.slug = 'test-tenant' AND u.email = 'supervisor@test.com'
ON CONFLICT DO NOTHING;

INSERT INTO staff (id, tenant_id, user_id, "fullName", position, "phoneNumber", gender, is_active, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    t.id,
    u.id,
    'Supervisor Staff',
    'SUPERVISOR',
    '+1234567891',
    'FEMALE',
    true,
    NOW(),
    NOW()
FROM tenants t, users u
WHERE t.slug = 'test-tenant' AND u.email = 'supervisor@test.com'
ON CONFLICT (tenant_id, user_id) DO UPDATE SET
    "fullName" = EXCLUDED."fullName",
    position = EXCLUDED.position,
    "phoneNumber" = EXCLUDED."phoneNumber",
    gender = EXCLUDED.gender,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these queries to verify the test users were created:

-- Check Platform Admin
SELECT 
    u.id,
    u.email,
    u.full_name,
    u.is_platform_admin,
    'Platform Admin' as user_type
FROM users u
WHERE u.email = 'admin@platform.com';

-- Check TenantAdmin
SELECT 
    u.id,
    u.email,
    u.full_name,
    t.name as tenant_name,
    tu.role,
    tu.status
FROM users u
JOIN tenant_users tu ON u.id = tu.user_id
JOIN tenants t ON tu.tenant_id = t.id
WHERE u.email = 'tenantadmin@test.com';

-- Check Staff Users
SELECT 
    u.id,
    u.email,
    u.full_name,
    t.name as tenant_name,
    tu.role,
    tu.status,
    s.position,
    s.is_active
FROM users u
JOIN tenant_users tu ON u.id = tu.user_id
JOIN tenants t ON tu.tenant_id = t.id
LEFT JOIN staff s ON u.id = s.user_id AND t.id = s.tenant_id
WHERE u.email IN ('staff@test.com', 'supervisor@test.com');

-- ============================================================================
-- TEST CREDENTIALS SUMMARY
-- ============================================================================
-- 
-- PLATFORM ADMIN:
--   Email: admin@platform.com
--   Password: Admin@123
--   Access: All admin endpoints
--
-- TENANT ADMIN:
--   Email: tenantadmin@test.com
--   Password: Password@123
--   Access: All tenant-admin endpoints for "test-tenant"
--
-- STAFF (CHECKER):
--   Email: staff@test.com
--   Password: Password@123
--   Access: All staff endpoints for "test-tenant"
--   Position: CHECKER
--
-- STAFF (SUPERVISOR):
--   Email: supervisor@test.com
--   Password: Password@123
--   Access: All staff endpoints for "test-tenant"
--   Position: SUPERVISOR
--
-- ============================================================================
-- GENERATING PASSWORD HASHES
-- ============================================================================
-- 
-- BEFORE RUNNING THIS SCRIPT:
-- 
-- 1. Generate bcrypt password hashes using the provided script:
--    node Postman_testfiles/generate_password_hashes.js
--
-- 2. Copy the generated hashes and replace "YOUR_HASH_HERE" in this file
--
-- 3. OR use this Node.js code directly:
--    const bcrypt = require('bcrypt');
--    (async () => {
--      const hash1 = await bcrypt.hash('Admin@123', 10);
--      const hash2 = await bcrypt.hash('Password@123', 10);
--      console.log('Admin@123:', hash1);
--      console.log('Password@123:', hash2);
--    })();
--
-- 4. OR use the NestJS application to create users via API (see QUICK_SETUP_GUIDE.txt)
--
-- ============================================================================
-- NOTES
-- ============================================================================
-- 
-- 1. All passwords are hashed using bcrypt with 10 rounds
-- 2. Replace "YOUR_HASH_HERE" with actual bcrypt hashes before running
-- 3. All UUIDs are auto-generated using gen_random_uuid()
-- 4. The ON CONFLICT clauses ensure the script is idempotent (can be run
--    multiple times safely)
-- 5. Make sure bcrypt package is installed: npm install bcrypt
--
-- ============================================================================

