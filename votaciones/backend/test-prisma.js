const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

console.log(Object.keys(prisma));

async function main() {
  console.log("✅ Prisma conectado correctamente");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
