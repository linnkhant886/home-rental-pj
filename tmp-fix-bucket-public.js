const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.$queryRawUnsafe(
    "select id, name, public from storage.buckets where id = 'temp-home-away'"
  );
  console.log('before=', rows);

  await prisma.$executeRawUnsafe(
    "update storage.buckets set public = true where id = 'temp-home-away'"
  );

  const rowsAfter = await prisma.$queryRawUnsafe(
    "select id, name, public from storage.buckets where id = 'temp-home-away'"
  );
  console.log('after=', rowsAfter);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
