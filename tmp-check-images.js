const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const rows = await p.property.findMany({
    select: { id: true, name: true, image: true, createdAt: true },
    take: 20,
    orderBy: { createdAt: 'desc' },
  });
  console.log(JSON.stringify(rows, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await p.$disconnect();
  });
