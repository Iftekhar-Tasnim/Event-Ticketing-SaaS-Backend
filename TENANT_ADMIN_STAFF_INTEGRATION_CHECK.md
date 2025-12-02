# Tenant-Admin & Staff Section Integration Check

## Executive Summary

**Status:** ⚠️ **ISSUES FOUND** - Property naming inconsistency needs fixing

Both sections are using the same entities from `tenant-entity.ts`, which is good. However, there's a **critical inconsistency** in property naming that will cause runtime errors.

---

## ✅ What's Working Correctly

### 1. Entity Sharing ✅
- Both `tenant-admin` and `staff` sections use entities from `src/tenant-admin/tenant-entity.ts`
- No duplicate entity definitions
- Consistent entity structure

### 2. Authentication & Authorization ✅
- **Tenant-Admin:** Uses `JwtAuthGuard` + `RolesGuard` with `@Roles('TenantAdmin')`
- **Staff:** Uses `JwtAuthGuard` + `StaffGuard` with `@CurrentUser()` decorator
- Both properly extract `tenantId` from JWT token

### 3. Data Flow ✅
- Tenant-Admin creates events, tickets, orders
- Staff reads events/tickets/orders (read-only access)
- Both filter by `tenantId` for multi-tenancy

### 4. Module Registration ✅
- Both modules properly registered in `app.module.ts`
- TypeORM entities properly registered in respective modules

---

## 🚨 Critical Issues

### Issue 1: Inconsistent Property Naming in `tenant-entity.ts`

**Problem:**
```typescript
// Event entity uses camelCase
@Entity('events')
export class Event {
  @Column('varchar', { length: 100, unique: true })
  tenantId: string;  // ❌ camelCase
}

// Order entity uses snake_case
@Entity('orders')
export class Order {
  @Column('uuid')
  tenant_id: string;  // ❌ snake_case
}
```

**Impact:**
- Staff service queries will fail when accessing `order.tenantId` (should be `tenant_id`)
- Inconsistent codebase - some entities use camelCase, others use snake_case
- TypeORM will map these correctly to database columns, but TypeScript property access is inconsistent

**Affected Code:**
- `src/stuff/staff.service.ts:595` - Uses `order.tenantId` (WRONG - should be `tenant_id`)
- `src/stuff/staff.service.ts:451` - Correctly uses `order: { tenant_id: tenantId }`
- `src/stuff/staff.service.ts:790` - Correctly uses `tenant_id: tenantId`
- `src/stuff/staff.service.ts:803` - Correctly uses `tenant_id: tenantId`

**Required Fix:**
- **Option A (Recommended):** Make Event entity consistent with Order - change `tenantId` to `tenant_id` in Event entity
- **Option B:** Change Order entity to use `tenantId` (camelCase) - but this requires database migration

---

### Issue 2: Staff Service Query Bug

**Location:** `src/stuff/staff.service.ts:595`

**Current Code:**
```typescript
.where('order.tenantId = :tenantId', { tenantId })
```

**Problem:** Order entity uses `tenant_id` (snake_case), not `tenantId` (camelCase)

**Fix Required:**
```typescript
.where('order.tenant_id = :tenantId', { tenantId })
```

---

## ⚠️ Minor Issues

### 1. Linter Warnings (Non-Critical)
- Formatting issues in `staff.dto.ts` (auto-fixable)
- Type safety warnings in `staff.service.ts` (using `any` types for destructuring)

### 2. Missing Relations
- Staff service removed `orderItems` relations (not in tenant-admin Order entity) ✅ **This is correct**
- Staff can still access order data through `tickets` relation

---

## Integration Points Verification

### ✅ Entity Usage
| Entity | Tenant-Admin | Staff | Status |
|--------|-------------|-------|--------|
| Event | ✅ Create/Read/Update/Delete | ✅ Read-only | ✅ Working |
| TicketType | ✅ Create/Read/Update/Delete | ✅ Read-only | ✅ Working |
| Order | ✅ Create/Read/Update/Delete | ✅ Read-only | ✅ Working |
| Ticket | ✅ Create/Read/Update/Delete | ✅ Check-in | ✅ Working |

### ✅ Data Consistency
- Both sections filter by `tenantId` from JWT
- Staff can only access data from their tenant
- Tenant-Admin can only access data from their tenant
- Multi-tenancy isolation is maintained

### ✅ API Endpoints
- **Tenant-Admin:** `/tenant-admin/*` - Full CRUD operations
- **Staff:** `/staff/*` - Read-only events/orders, check-in tickets
- No endpoint conflicts

---

## Recommended Fixes

### Priority 1: Fix Property Naming Inconsistency

**File:** `src/tenant-admin/tenant-entity.ts`

**Change:**
```typescript
// Line 18 - Change from:
tenantId: string;

// To:
tenant_id: string;
```

**Then update all references:**
- `src/tenant-admin/tenant-admin.service.ts:57` - Change `tenantId` to `tenant_id`
- `src/stuff/staff.service.ts:625` - Change `tenantId` to `tenant_id`
- `src/stuff/staff.service.ts:641` - Change `tenantId` to `tenant_id`
- `src/stuff/staff.service.ts:664` - Change `tenantId` to `tenant_id`
- `src/stuff/staff.service.ts:705` - Change `tenantId` to `tenant_id`

### Priority 2: Fix Staff Service Query

**File:** `src/stuff/staff.service.ts:595`

**Change:**
```typescript
// From:
.where('order.tenantId = :tenantId', { tenantId })

// To:
.where('order.tenant_id = :tenantId', { tenantId })
```

---

## Summary

**Overall Status:** ⚠️ **NEEDS FIXES**

**Critical Issues:** 2
- Property naming inconsistency in Event entity
- Staff service query using wrong property name

**Minor Issues:** Linter warnings (non-blocking)

**Integration:** ✅ **WORKING** - Both sections properly integrated, just need property name fixes

**Recommendation:** Fix the property naming inconsistency to ensure consistency across all entities and prevent runtime errors.

