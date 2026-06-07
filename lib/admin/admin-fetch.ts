export async function readAdminJson<T>(response: Response): Promise<T> {
  return response.json() as Promise<T>;
}

export function adminFetch(input: RequestInfo | URL, init?: RequestInit) {
  return fetch(input, {
    credentials: "same-origin",
    ...init,
  });
}
