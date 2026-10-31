import { Pool, type ConnectionConfig, type QueryResultRow } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  pgPool?: Pool;
};

export function getDatabaseUrl() {
  const url = process.env.DATABASE_URL?.trim();

  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  return url;
}

function getDatabaseSchema(connectionString: string) {
  const schema = process.env.DATABASE_SCHEMA?.trim();

  if (schema) {
    if (!/^[a-z_][a-z0-9_]*$/i.test(schema)) {
      throw new Error("DATABASE_SCHEMA has invalid format");
    }

    return schema;
  }

  // Tables from 001_initial_schema.render.sql live in this schema.
  if (/render\.com/i.test(connectionString) || /neon\.tech/i.test(connectionString)) {
    return "petrovichdb";
  }

  return null;
}

function usesNeonPooler(connectionString: string) {
  return /neon\.tech/i.test(connectionString) && /-pooler\./i.test(connectionString);
}

function getPoolSslConfig(connectionString: string): ConnectionConfig["ssl"] {
  const override = process.env.DATABASE_SSL?.trim().toLowerCase();

  if (override === "false" || override === "0") {
    return undefined;
  }

  if (
    override === "true" ||
    override === "1" ||
    /render\.com/i.test(connectionString) ||
    /sslmode=require/i.test(connectionString)
  ) {
    return { rejectUnauthorized: false };
  }

  return undefined;
}

export function getPool() {
  if (!globalForDb.pgPool) {
    const connectionString = getDatabaseUrl();
    const schema = getDatabaseSchema(connectionString);
    const ssl = getPoolSslConfig(connectionString);

    globalForDb.pgPool = new Pool({
      connectionString,
      ...(ssl ? { ssl } : {}),
      // Neon PgBouncer rejects search_path in the startup packet.
      // Keep it as a Pool option only for direct Postgres (Render, local).
      ...(schema && !usesNeonPooler(connectionString)
        ? { options: `-c search_path=${schema}` }
        : {}),
    });
  }

  return globalForDb.pgPool;
}

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  return getPool().query<T>(text, params);
}
