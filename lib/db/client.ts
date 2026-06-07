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

export function getPool() {
  if (!globalForDb.pgPool) {
    globalForDb.pgPool = new Pool({
      connectionString: getDatabaseUrl(),
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
