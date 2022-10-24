module.exports = {
  url: process.env.DATABASE_URL,
  type: "postgres",
  synchronize: true,
  logging: true,
  entities: ["server/**/*.entity.ts"],
  migrations: ["server/migrations/**/*.ts"],
  cli: {
    migrationsDir: "server/migrations",
  },
};
