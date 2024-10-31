import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import consola from "consola";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      id: 1,
      uuid: uuidv4(),
      name: "Dente Store",
      email: "storedente@gmail.com",
      password: await bcryptjs.hash("Amanah@2024", 12),
      role: "SUPER_ADMIN",
      email_verified: true,
      verified_purchase: true,
      is_active: true,
    },
  });
  consola.success(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
