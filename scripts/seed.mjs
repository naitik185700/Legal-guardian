/**
 * Database Seeding Script for Guardian Legal Solutions
 * Seeds initial practice areas, verified lawyer profiles, and master admin credentials
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Guardian Legal Solutions database...');

  // Hash superadmin password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash('GuardianLegal@2026', salt);

  // Upsert Super Admin
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@guardianlegalsolutions.com' },
    update: {},
    create: {
      email: 'admin@guardianlegalsolutions.com',
      passwordHash,
      name: 'Senior Managing Partner',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('Admin user initialized:', admin.email);
  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
