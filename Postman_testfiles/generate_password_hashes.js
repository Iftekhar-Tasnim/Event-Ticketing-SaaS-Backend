/**
 * Password Hash Generator
 * 
 * This script generates bcrypt hashes for test user passwords.
 * Run with: node generate_password_hashes.js
 * 
 * The generated hashes can be used in TEST_USERS_SETUP.sql
 */

const bcrypt = require('bcrypt');

async function generateHashes() {
  console.log('='.repeat(60));
  console.log('PASSWORD HASH GENERATOR');
  console.log('='.repeat(60));
  console.log('');

  const passwords = [
    { name: 'Platform Admin', password: 'Admin@123' },
    { name: 'TenantAdmin', password: 'Password@123' },
    { name: 'Staff', password: 'Password@123' },
    { name: 'Supervisor', password: 'Password@123' },
  ];

  console.log('Generating bcrypt hashes (10 rounds)...\n');

  for (const item of passwords) {
    const hash = await bcrypt.hash(item.password, 10);
    console.log(`${item.name}:`);
    console.log(`  Password: ${item.password}`);
    console.log(`  Hash:     ${hash}`);
    console.log('');
  }

  console.log('='.repeat(60));
  console.log('Copy the hashes above and paste them into TEST_USERS_SETUP.sql');
  console.log('='.repeat(60));
}

// Run the generator
generateHashes().catch(console.error);

