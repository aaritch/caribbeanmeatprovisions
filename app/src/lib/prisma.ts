// Prisma client singleton. Stubbed for scaffold (no @prisma/client installed yet).
// To enable: `npm install @prisma/client prisma -D`, then `npx prisma generate`,
// then replace this stub with the real singleton.

type PrismaStub = Record<string, never>;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaStub };

export const prisma: PrismaStub = globalForPrisma.prisma ?? ({} as PrismaStub);

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
