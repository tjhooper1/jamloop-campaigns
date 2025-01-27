import { PrismaClient } from "@prisma/client";
import pkg from 'bcryptjs';
const { hash } = pkg;

const prisma = new PrismaClient();

async function main() {
  try {    
    await prisma.campaign.deleteMany();
    await prisma.user.deleteMany();

    console.log("🗑️ Cleared existing data");

    // Create demo users
    const [password1, password2] = await Promise.all([
      hash("password123", 12),
      hash("password456", 12),
    ]);

    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        name: "Demo User 1",
        password: password1,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        name: "Demo User 2",
        password: password2,
      },
    });

    console.log("✅ Database seeded with demo users:");
    console.log({ user1: { email: user1.email, id: user1.id } });
    console.log({ user2: { email: user2.email, id: user2.id } });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
