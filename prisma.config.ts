/** @type {import('@prisma/cli').PrismaConfig} */
const config = {
  datasources: {
    db: {
      provider: 'sqlite',
      url: 'file:./prisma/dev.db',
    },
  },
};

export default config;
