import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const defaultPassword = await bcrypt.hash('SecurePassword123!', 10);
  
  const users = [
    // COORDINATOR - Can take multiple attendance
    {
      email: 'admin@falconsecurity.com',
      name: 'Admin Coordinator',
      password: await bcrypt.hash('FalconPassword123!', 10),
      role: 'COORDINATOR',
      active: true,
    },
    {
      email: 'coordinator@falconsecurity.com',
      name: 'Coordinator Account',
      password: defaultPassword,
      role: 'COORDINATOR',
      active: true,
    },
    // SECURITY_GUARD - Can only take self attendance
    {
      email: 'mr4340@robi.com',
      name: 'Shakibul',
      password: defaultPassword,
      role: 'SECURITY_GUARD',
      active: true,
    },
    {
      email: 'demo@falconsecurity.com',
      name: 'Demo Guard',
      password: defaultPassword,
      role: 'SECURITY_GUARD',
      active: true,
    },
    {
      email: 'guard1@falconsecurity.com',
      name: 'Guard One',
      password: defaultPassword,
      role: 'SECURITY_GUARD',
      active: true,
    },
    {
      email: 'guard2@falconsecurity.com',
      name: 'Guard Two',
      password: defaultPassword,
      role: 'SECURITY_GUARD',
      active: true,
    },
    // SECURITY_SUPERVISOR - Can take multiple attendance
    {
      email: 'supervisor@falconsecurity.com',
      name: 'Supervisor Account',
      password: defaultPassword,
      role: 'SECURITY_SUPERVISOR',
      active: true,
    },
    // SECURITY_IN_CHARGE - Can take multiple attendance
    {
      email: 'in_charge@falconsecurity.com',
      name: 'Security In Charge',
      password: defaultPassword,
      role: 'SECURITY_IN_CHARGE',
      active: true,
    },
    // CLIENT - Can take multiple attendance
    {
      email: 'client@falconsecurity.com',
      name: 'Client Account',
      password: defaultPassword,
      role: 'CLIENT',
      active: true,
    },
  ];

  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(`✅ User: ${created.email} (${created.role})`);
  }

  console.log('✅ Seed completed with all role accounts!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
