import { BASE_URL } from "@/app/_constants";

export const asArray = <T>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

export async function mealdb<T>(
  endpoint: string,
  params: Record<string, string> = {},
  init: RequestInit = {},
): Promise<T> {
  const url = new URL(endpoint, BASE_URL);
  for (const [key, value] of Object.entries(params))
    url.searchParams.set(key, value);

  const res = await fetch(url, { signal: AbortSignal.timeout(8_000), ...init });
  if (!res.ok) throw new Error(`TheMealDB ${endpoint} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
