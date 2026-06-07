import { Pool, type QueryResultRow } from "pg";

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

function getDatabaseSchema() {
  const schema = process.env.DATABASE_SCHEMA?.trim();

  if (!schema) {
    return null;
  }

  if (!/^[a-z_][a-z0-9_]*$/i.test(schema)) {
    throw new Error("DATABASE_SCHEMA has invalid format");
  }

  return schema;
}

export function getPool() {
  if (!globalForDb.pgPool) {
    const schema = getDatabaseSchema();

    globalForDb.pgPool = new Pool({
      connectionString: getDatabaseUrl(),
      ...(schema ? { options: `-c search_path=${schema}` } : {}),
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
