require("ts-node/register");

module.exports = [
  {
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "test",
    password: "test",
    database: "test",
    synchronize: false,
    entities: ["db/entities/**/*.ts"],
    migrations: ["db/migrations/**/*.ts"],
    cli: {
      entitiesDir: "db/entities",
      migrationsDir: "db/migrations",
    },
  },
];
