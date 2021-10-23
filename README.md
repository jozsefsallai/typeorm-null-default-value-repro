# typeorm-null-default-value-repro

Steps to reproduce

```bash
# 1. Spin up the docker container for MariaDB in one tab
docker-compose up

# 2. Generate an initial migration in another tab:
yarn migration:generate CreateTestTable

# 3. Migrate:
yarn migrate

# 4. Create another migration:
yarn migration:generate AnotherMigration # this is what breaks

# 5. Migrate again:
yarn migrate

# 6. At this point, the migrations are broken. Try to rollback to see an error:
yarn migration:rollback
```

Example output

```
joe@jabberwocky ~/T/typeorm-null-default-value-repro> yarn migration:generate CreateTestTable
yarn run v1.22.11
$ npm run typeorm -- migration:generate -n CreateTestTable
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1635008254065-0.45352468707120264/node but npm is using /usr/local/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> typeorm-null-default-value-repro@1.0.0 typeorm /home/joe/Temp/typeorm-null-default-value-repro
> node ./node_modules/typeorm/cli.js --config ormconfig.cli.js "migration:generate" "-n" "CreateTestTable"

Migration /home/joe/Temp/typeorm-null-default-value-repro/db/migrations/1635008254966-CreateTestTable.ts has been generated successfully.
Done in 3.81s.
joe@jabberwocky ~/T/typeorm-null-default-value-repro [SIGINT]> yarn migrate
yarn run v1.22.11
$ npm run migration:run
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1635008294582-0.6042225926542242/node but npm is using /usr/local/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> typeorm-null-default-value-repro@1.0.0 migration:run /home/joe/Temp/typeorm-null-default-value-repro
> npm run typeorm -- migration:run

npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1635008294582-0.6042225926542242/node but npm is using /usr/local/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> typeorm-null-default-value-repro@1.0.0 typeorm /home/joe/Temp/typeorm-null-default-value-repro
> node ./node_modules/typeorm/cli.js --config ormconfig.cli.js "migration:run"

query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'migrations'
query: CREATE TABLE `migrations` (`id` int NOT NULL AUTO_INCREMENT, `timestamp` bigint NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: SELECT * FROM `test`.`migrations` `migrations` ORDER BY `id` DESC
0 migrations are already loaded in the database.
1 migrations were found in the source code.
1 migrations are new migrations that needs to be executed.
query: START TRANSACTION
query: CREATE TABLE `test_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: INSERT INTO `test`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1635008254966,"CreateTestTable1635008254966"]
Migration CreateTestTable1635008254966 has been executed successfully.
query: COMMIT
Done in 6.98s.
joe@jabberwocky ~/T/typeorm-null-default-value-repro> yarn migration:generate AnotherMigration
yarn run v1.22.11
$ npm run typeorm -- migration:generate -n AnotherMigration
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1635008304979-0.9425563557012548/node but npm is using /usr/local/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> typeorm-null-default-value-repro@1.0.0 typeorm /home/joe/Temp/typeorm-null-default-value-repro
> node ./node_modules/typeorm/cli.js --config ormconfig.cli.js "migration:generate" "-n" "AnotherMigration"

Migration /home/joe/Temp/typeorm-null-default-value-repro/db/migrations/1635008305869-AnotherMigration.ts has been generated successfully.
Done in 3.39s.
joe@jabberwocky ~/T/typeorm-null-default-value-repro> yarn migrate
yarn run v1.22.11
$ npm run migration:run
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1635008326170-0.5729409811071964/node but npm is using /usr/local/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> typeorm-null-default-value-repro@1.0.0 migration:run /home/joe/Temp/typeorm-null-default-value-repro
> npm run typeorm -- migration:run

npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1635008326170-0.5729409811071964/node but npm is using /usr/local/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> typeorm-null-default-value-repro@1.0.0 typeorm /home/joe/Temp/typeorm-null-default-value-repro
> node ./node_modules/typeorm/cli.js --config ormconfig.cli.js "migration:run"

query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'migrations'
query: SELECT * FROM `test`.`migrations` `migrations` ORDER BY `id` DESC
1 migrations are already loaded in the database.
2 migrations were found in the source code.
CreateTestTable1635008254966 is the last executed migration. It was executed on Sat Oct 23 2021 19:57:34 GMT+0300 (Eastern European Summer Time).
1 migrations are new migrations that needs to be executed.
query: START TRANSACTION
query: ALTER TABLE `test_entity` CHANGE `name` `name` varchar(255) NULL
query: ALTER TABLE `test_entity` CHANGE `deletedAt` `deletedAt` datetime(6) NULL
query: INSERT INTO `test`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1635008305869,"AnotherMigration1635008305869"]
Migration AnotherMigration1635008305869 has been executed successfully.
query: COMMIT
Done in 5.94s.
joe@jabberwocky ~/T/typeorm-null-default-value-repro> yarn migration:rollback
yarn run v1.22.11
$ npm run typeorm -- migration:revert
npm WARN lifecycle The node binary used for scripts is /tmp/yarn--1635008336261-0.2245828043247018/node but npm is using /usr/local/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> typeorm-null-default-value-repro@1.0.0 typeorm /home/joe/Temp/typeorm-null-default-value-repro
> node ./node_modules/typeorm/cli.js --config ormconfig.cli.js "migration:revert"

query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'migrations'
query: SELECT * FROM `test`.`migrations` `migrations` ORDER BY `id` DESC
2 migrations are already loaded in the database.
AnotherMigration1635008305869 is the last executed migration. It was executed on Sat Oct 23 2021 19:58:25 GMT+0300 (Eastern European Summer Time).
Now reverting it...
query: START TRANSACTION
query: ALTER TABLE `test_entity` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'
query failed: ALTER TABLE `test_entity` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'
error: Error: Invalid default value for 'deletedAt'
    at Packet.asError (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/packets/packet.js:728:17)
    at Query.execute (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/commands/command.js:29:26)
    at PoolConnection.handlePacket (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:456:32)
    at PacketParser.onPacket (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:85:12)
    at PacketParser.executeStart (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/packet_parser.js:75:16)
    at Socket.<anonymous> (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:92:25)
    at Socket.emit (events.js:400:28)
    at Socket.emit (domain.js:470:12)
    at addChunk (internal/streams/readable.js:290:12)
    at readableAddChunk (internal/streams/readable.js:265:9) {
  code: 'ER_INVALID_DEFAULT',
  errno: 1067,
  sqlState: '42000',
  sqlMessage: "Invalid default value for 'deletedAt'",
  sql: "ALTER TABLE `test_entity` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'"
}
query: ROLLBACK
Error during migration revert:
QueryFailedError: Invalid default value for 'deletedAt'
    at QueryFailedError.TypeORMError [as constructor] (/home/joe/Temp/typeorm-null-default-value-repro/src/error/TypeORMError.ts:7:9)
    at new QueryFailedError (/home/joe/Temp/typeorm-null-default-value-repro/src/error/QueryFailedError.ts:9:9)
    at Query.onResult (/home/joe/Temp/typeorm-null-default-value-repro/src/driver/mysql/MysqlQueryRunner.ts:195:37)
    at Query.execute (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/commands/command.js:36:14)
    at PoolConnection.handlePacket (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:456:32)
    at PacketParser.onPacket (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:85:12)
    at PacketParser.executeStart (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/packet_parser.js:75:16)
    at Socket.<anonymous> (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:92:25)
    at Socket.emit (events.js:400:28)
    at Socket.emit (domain.js:470:12) {
  query: "ALTER TABLE `test_entity` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'",
  parameters: undefined,
  driverError: Error: Invalid default value for 'deletedAt'
      at Packet.asError (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/packets/packet.js:728:17)
      at Query.execute (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/commands/command.js:29:26)
      at PoolConnection.handlePacket (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:456:32)
      at PacketParser.onPacket (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:85:12)
      at PacketParser.executeStart (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/packet_parser.js:75:16)
      at Socket.<anonymous> (/home/joe/Temp/typeorm-null-default-value-repro/node_modules/mysql2/lib/connection.js:92:25)
      at Socket.emit (events.js:400:28)
      at Socket.emit (domain.js:470:12)
      at addChunk (internal/streams/readable.js:290:12)
      at readableAddChunk (internal/streams/readable.js:265:9) {
    code: 'ER_INVALID_DEFAULT',
    errno: 1067,
    sqlState: '42000',
    sqlMessage: "Invalid default value for 'deletedAt'",
    sql: "ALTER TABLE `test_entity` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'"
  },
  code: 'ER_INVALID_DEFAULT',
  errno: 1067,
  sqlState: '42000',
  sqlMessage: "Invalid default value for 'deletedAt'",
  sql: "ALTER TABLE `test_entity` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'"
}
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! typeorm-null-default-value-repro@1.0.0 typeorm: `node ./node_modules/typeorm/cli.js --config ormconfig.cli.js "migration:revert"`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the typeorm-null-default-value-repro@1.0.0 typeorm script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/joe/.npm/_logs/2021-10-23T16_59_00_394Z-debug.log
error Command failed with exit code 1.
```
