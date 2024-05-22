import {migration} from "postgres-migrations"

const migrate = async function() {
  const dbConfig = {
    database: "database-name",
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
  }

  // Note: when passing a client, it is assumed that the database already exists
  const client = new pg.Client(dbConfig) // or a Pool, or a PoolClient
  await client.connect()
  try {
    await migrate({client}, "path/to/migration/files")
  } finally {
    await client.end()
  }
}